#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const defaultTranslationRoot = "content/translations";

main();

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printUsage();
    return;
  }

  const root = resolve(repoRoot, args.root || defaultTranslationRoot);
  if (!existsSync(root)) {
    console.log(`No translation store found at ${relative(repoRoot, root)}.`);
    return;
  }

  const files = listJsonFiles(root);
  const failures = [];

  for (const file of files) {
    try {
      validateArtifact(file);
    } catch (error) {
      failures.push(`${relative(repoRoot, file)}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (failures.length > 0) {
    console.error(`Translation check failed with ${failures.length} issue(s):`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log(`Translation check passed for ${files.length} artifact(s).`);
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
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for --${key}`);
    }
    args[key] = value;
    index += 1;
  }
  return args;
}

function listJsonFiles(root) {
  const entries = readdirSync(root, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const path = join(root, entry.name);
    if (entry.isDirectory()) return listJsonFiles(path);
    return entry.isFile() && entry.name.endsWith(".json") ? [path] : [];
  });
}

function validateArtifact(file) {
  const artifact = JSON.parse(readFileSync(file, "utf8"));

  requireField(artifact, "schemaVersion", "number");
  requireField(artifact, "id", "string");
  requireField(artifact, "status", "string");
  requireField(artifact, "sourceLocale", "string");
  requireField(artifact, "targetLocale", "string");
  requireField(artifact, "sourceHash", "string");
  requireField(artifact, "source", "object");
  requireField(artifact, "sourceChunks", "object");
  requireField(artifact, "translatedChunks", "object");
  requireField(artifact, "translation", undefined);

  if (artifact.schemaVersion !== 1) {
    throw new Error(`Unsupported schemaVersion ${artifact.schemaVersion}`);
  }
  if (!["draft", "reviewed"].includes(artifact.status)) {
    throw new Error("status must be draft or reviewed");
  }
  if (!Array.isArray(artifact.sourceChunks) || artifact.sourceChunks.length === 0) {
    throw new Error("sourceChunks must be a non-empty array");
  }
  if (!Array.isArray(artifact.translatedChunks) || artifact.translatedChunks.length === 0) {
    throw new Error("translatedChunks must be a non-empty array");
  }

  const expectedHash = hashSource({
    sourceLocale: artifact.sourceLocale,
    targetLocale: artifact.targetLocale,
    kind: artifact.source.kind,
    value: artifact.source.value,
  });
  if (artifact.sourceHash !== expectedHash) {
    throw new Error("sourceHash does not match source payload");
  }

  const expectedPaths = new Set(artifact.sourceChunks.map((chunk) => chunk.path));
  const receivedPaths = new Set(artifact.translatedChunks.map((chunk) => chunk.path));

  for (const path of expectedPaths) {
    if (!receivedPaths.has(path)) throw new Error(`Missing translated chunk for ${path}`);
  }

  for (const chunk of artifact.translatedChunks) {
    if (!expectedPaths.has(chunk.path)) throw new Error(`Unexpected translated chunk ${chunk.path}`);
    if (typeof chunk.text !== "string" || chunk.text.trim().length === 0) {
      throw new Error(`Empty translated text for ${chunk.path}`);
    }
  }
}

function requireField(object, key, type) {
  if (!(key in object)) throw new Error(`Missing ${key}`);
  if (type && typeof object[key] !== type) {
    throw new Error(`${key} must be ${type}`);
  }
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

function printUsage() {
  console.log(`Usage:
  pnpm i18n:check
  pnpm i18n:check -- --root content/translations
`);
}
