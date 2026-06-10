#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const defaultTargetLocale = "zh-Hans";
const defaultSourceLocale = "en-US";
const defaultOutputRoot = "content/translations";
const defaultModel = process.env.OPENAI_TRANSLATION_MODEL || "gpt-5.5";

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printUsage();
    return;
  }

  const id = requireOption(args, "id");
  const targetLocale = args.target || defaultTargetLocale;
  const sourceLocale = args.source || defaultSourceLocale;
  const status = args.status || "draft";
  const model = args.model || defaultModel;
  const outputRoot = resolve(repoRoot, args.out || defaultOutputRoot);
  const input = await readSourceInput(args);
  const sourceChunks = flattenTranslatableText(input.value);

  if (sourceChunks.length === 0) {
    throw new Error("No translatable string values were found in the input.");
  }

  const sourceHash = hashSource({
    sourceLocale,
    targetLocale,
    kind: input.kind,
    value: input.value,
  });
  const outputPath = getOutputPath(outputRoot, targetLocale, id);

  if (existsSync(outputPath) && !args.force) {
    const existing = JSON.parse(readFileSync(outputPath, "utf8"));
    if (existing.sourceHash === sourceHash) {
      console.log(`Translation is already current: ${relative(repoRoot, outputPath)}`);
      return;
    }

    throw new Error(
      `Refusing to overwrite stale translation without --force: ${relative(repoRoot, outputPath)}`,
    );
  }

  if (args["dry-run"]) {
    console.log(JSON.stringify({
      id,
      sourceLocale,
      targetLocale,
      sourceHash,
      chunks: sourceChunks.length,
      outputPath: relative(repoRoot, outputPath),
      model,
      status,
    }, null, 2));
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is required to draft translations.");
  }

  const llmResult = await translateChunks({
    apiKey,
    model,
    sourceLocale,
    targetLocale,
    sourceChunks,
    glossary: args.glossary ? readGlossary(args.glossary) : defaultGlossary(),
  });

  const translatedValue = reconstructTranslatedValue(input.value, llmResult.chunks);
  const now = new Date().toISOString();
  const artifact = {
    schemaVersion: 1,
    id,
    status,
    sourceLocale,
    targetLocale,
    sourceHash,
    source: {
      kind: input.kind,
      file: input.file ? relative(repoRoot, input.file) : undefined,
      value: input.value,
    },
    sourceChunks,
    translatedChunks: llmResult.chunks,
    translation: translatedValue,
    notes: llmResult.notes,
    llm: {
      provider: "openai",
      model,
      responseId: llmResult.responseId,
    },
    createdAt: now,
    updatedAt: now,
  };

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(artifact, null, 2)}\n`);
  console.log(`Wrote ${relative(repoRoot, outputPath)}`);
}

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--help" || token === "-h") {
      args.help = true;
      continue;
    }
    if (!token.startsWith("--")) {
      throw new Error(`Unexpected argument: ${token}`);
    }

    const key = token.slice(2);
    if (["force", "dry-run", "json"].includes(key)) {
      args[key] = true;
      continue;
    }

    const value = argv[index + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for --${key}`);
    }
    args[key] = value;
    index += 1;
  }
  return args;
}

function requireOption(args, key) {
  const value = args[key];
  if (!value) throw new Error(`--${key} is required. Use --help for usage.`);
  return value;
}

async function readSourceInput(args) {
  if (args.text && args.input) {
    throw new Error("Use either --text or --input, not both.");
  }

  if (args.text) {
    return { kind: "text", value: args.text };
  }

  if (args.input) {
    const file = resolve(repoRoot, args.input);
    const raw = readFileSync(file, "utf8");
    const isJson = args.json || extname(file).toLowerCase() === ".json";
    return {
      kind: isJson ? "json" : "text",
      file,
      value: isJson ? JSON.parse(raw) : raw,
    };
  }

  if (!process.stdin.isTTY) {
    const raw = await readStdin();
    return {
      kind: args.json ? "json" : "text",
      value: args.json ? JSON.parse(raw) : raw,
    };
  }

  throw new Error("Provide --text, --input, or stdin input.");
}

function readStdin() {
  return new Promise((resolvePromise, rejectPromise) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => resolvePromise(data));
    process.stdin.on("error", rejectPromise);
  });
}

function flattenTranslatableText(value, path = []) {
  if (typeof value === "string") {
    return value.trim().length > 0
      ? [{ path: toJsonPointer(path), text: value }]
      : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => flattenTranslatableText(item, [...path, index]));
  }

  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) =>
      flattenTranslatableText(item, [...path, key]),
    );
  }

  return [];
}

function toJsonPointer(path) {
  if (path.length === 0) return "/";
  return `/${path.map((part) => String(part).replaceAll("~", "~0").replaceAll("/", "~1")).join("/")}`;
}

function fromJsonPointer(pointer) {
  if (pointer === "/") return [];
  if (!pointer.startsWith("/")) throw new Error(`Invalid JSON pointer: ${pointer}`);
  return pointer.slice(1).split("/").map((part) => part.replaceAll("~1", "/").replaceAll("~0", "~"));
}

function reconstructTranslatedValue(sourceValue, translatedChunks) {
  if (typeof sourceValue === "string") {
    const root = translatedChunks.find((chunk) => chunk.path === "/");
    if (!root) throw new Error("Missing root translation chunk.");
    return root.text;
  }

  const clone = structuredClone(sourceValue);
  for (const chunk of translatedChunks) {
    setJsonPointer(clone, chunk.path, chunk.text);
  }
  return clone;
}

function setJsonPointer(target, pointer, value) {
  const parts = fromJsonPointer(pointer);
  if (parts.length === 0) return value;

  let cursor = target;
  for (const part of parts.slice(0, -1)) {
    cursor = cursor[Array.isArray(cursor) ? Number(part) : part];
  }
  const last = parts.at(-1);
  cursor[Array.isArray(cursor) ? Number(last) : last] = value;
  return target;
}

function hashSource(payload) {
  return `sha256:${createHash("sha256").update(stableStringify(payload)).digest("hex")}`;
}

function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) =>
      `${JSON.stringify(key)}:${stableStringify(value[key])}`,
    ).join(",")}}`;
  }
  return JSON.stringify(value);
}

async function translateChunks({
  apiKey,
  model,
  sourceLocale,
  targetLocale,
  sourceChunks,
  glossary,
}) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content:
            "Translate public insurance website copy into Simplified Chinese. Preserve meaning, legal caution, numbers, URLs, placeholders, brand names, markdown, HTML tags, and JSON paths. Use clear, professional Chinese for California insurance shoppers. Do not add coverage promises, discounts, guarantees, or advice that is absent from the source.",
        },
        {
          role: "user",
          content: JSON.stringify({
            sourceLocale,
            targetLocale,
            glossary,
            chunks: sourceChunks,
          }),
        },
      ],
      reasoning: { effort: "low" },
      text: {
        verbosity: "low",
        format: {
          type: "json_schema",
          name: "translation_result",
          strict: true,
          schema: translationSchema(),
        },
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenAI translation request failed (${response.status}): ${body}`);
  }

  const data = await response.json();
  const text = extractOutputText(data);
  const parsed = JSON.parse(text);
  validateTranslationResult(parsed, targetLocale, sourceChunks);

  return {
    responseId: data.id,
    chunks: parsed.chunks,
    notes: parsed.notes,
  };
}

function translationSchema() {
  return {
    type: "object",
    properties: {
      targetLocale: { type: "string" },
      chunks: {
        type: "array",
        items: {
          type: "object",
          properties: {
            path: { type: "string" },
            text: { type: "string" },
          },
          required: ["path", "text"],
          additionalProperties: false,
        },
      },
      notes: {
        type: "array",
        items: { type: "string" },
      },
    },
    required: ["targetLocale", "chunks", "notes"],
    additionalProperties: false,
  };
}

function extractOutputText(data) {
  if (typeof data.output_text === "string") return data.output_text;

  const parts = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && typeof content.text === "string") {
        parts.push(content.text);
      }
    }
  }

  if (parts.length === 0) {
    throw new Error("OpenAI response did not include output text.");
  }

  return parts.join("");
}

function validateTranslationResult(result, targetLocale, sourceChunks) {
  if (result.targetLocale !== targetLocale) {
    throw new Error(`Expected targetLocale ${targetLocale}, received ${result.targetLocale}`);
  }

  const expected = new Set(sourceChunks.map((chunk) => chunk.path));
  const received = new Set(result.chunks.map((chunk) => chunk.path));

  for (const path of expected) {
    if (!received.has(path)) throw new Error(`Missing translated chunk for ${path}`);
  }

  for (const path of received) {
    if (!expected.has(path)) throw new Error(`Unexpected translated chunk for ${path}`);
  }

  for (const chunk of result.chunks) {
    if (typeof chunk.text !== "string" || chunk.text.trim().length === 0) {
      throw new Error(`Empty translated text for ${chunk.path}`);
    }
  }
}

function getOutputPath(outputRoot, targetLocale, id) {
  const parts = id.split("/").filter(Boolean).map((part) =>
    part.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-"),
  );
  if (parts.length === 0) throw new Error("--id must contain at least one path segment.");
  return join(outputRoot, targetLocale, ...parts.slice(0, -1), `${parts.at(-1)}.json`);
}

function readGlossary(path) {
  return JSON.parse(readFileSync(resolve(repoRoot, path), "utf8"));
}

function defaultGlossary() {
  return [
    { source: "quote", target: "报价" },
    { source: "coverage", target: "保障" },
    { source: "policy", target: "保单" },
    { source: "deductible", target: "免赔额" },
    { source: "liability", target: "责任险" },
    { source: "home insurance", target: "房屋保险" },
    { source: "auto insurance", target: "车险" },
    { source: "business insurance", target: "商业保险" },
    { source: "umbrella insurance", target: "伞险" },
    { source: "FAIR Plan", target: "FAIR Plan" },
    { source: "Tracy Zhang Insurance", target: "Tracy Zhang Insurance" },
    { source: "Allstate", target: "Allstate" },
  ];
}

function printUsage() {
  console.log(`Usage:
  pnpm i18n:translate --id <id> --text "Get a quote"
  pnpm i18n:translate --id insurance/story/example --input source.json --force
  pnpm i18n:translate --id stdin/example < source.txt

Options:
  --id <id>             Stable translation id, used as the output path
  --text <text>         Plain text to translate
  --input <path>        Text or JSON file to translate
  --json                Treat stdin or --input as JSON
  --target <locale>     Target locale, default ${defaultTargetLocale}
  --source <locale>     Source locale, default ${defaultSourceLocale}
  --model <model>       OpenAI model, default OPENAI_TRANSLATION_MODEL or ${defaultModel}
  --out <dir>           Output root, default ${defaultOutputRoot}
  --glossary <path>     Optional JSON glossary
  --status <status>     Artifact status, default draft
  --force               Overwrite an existing stale artifact
  --dry-run             Validate input and print planned output without calling the API
`);
}
