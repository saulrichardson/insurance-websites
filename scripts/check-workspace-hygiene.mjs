#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const ignoredDirectoryNames = new Set([
  ".git",
  ".next",
  ".turbo",
  "coverage",
  ".neon",
  "node_modules",
  "out",
  "output",
  ".playwright-cli",
  ".playwright-mcp",
  ".secrets",
]);
const forbiddenLockfiles = new Set([
  "package-lock.json",
  "npm-shrinkwrap.json",
  "yarn.lock",
  "bun.lock",
  "bun.lockb",
]);
const packageDependencyFields = [
  "dependencies",
  "devDependencies",
  "optionalDependencies",
  "peerDependencies",
];

const failures = [];
const warnings = [];

if (!existsSync(join(repoRoot, "pnpm-workspace.yaml"))) {
  failures.push("pnpm-workspace.yaml is required at the repo root.");
}

walk(repoRoot, (absolutePath, entry) => {
  const path = toRepoPath(absolutePath);

  if (forbiddenLockfiles.has(entry.name)) {
    failures.push(`${path}: app-local or non-pnpm lockfiles are not allowed.`);
    return;
  }

  if (entry.name === "package.json") {
    inspectPackageJson(absolutePath, path);
    return;
  }

  if (entry.name.startsWith(".env") && path.includes("/.vercel/")) {
    failures.push(`${path}: pulled Vercel env files must not live in the workspace.`);
    return;
  }

  if (entry.name === ".env.local" && !path.includes("/.vercel/")) {
    warnings.push(`${path}: local env file present; keep only recoverable local-only values here.`);
  }

  if (entry.name === "project.json" && path.endsWith(".vercel/project.json")) {
    inspectVercelProjectJson(absolutePath, path);
  }
});

if (failures.length > 0) {
  console.error("Workspace hygiene check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  if (warnings.length > 0) {
    console.error("");
    console.error("Warnings:");
    for (const warning of warnings) console.error(`- ${warning}`);
  }
  process.exit(1);
}

console.log("Workspace hygiene check passed.");
if (warnings.length > 0) {
  console.log("");
  console.log("Warnings:");
  for (const warning of warnings) console.log(`- ${warning}`);
}

function walk(directory, visit) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (ignoredDirectoryNames.has(entry.name)) continue;
      visit(absolutePath, entry);
      walk(absolutePath, visit);
      continue;
    }

    if (entry.isFile()) visit(absolutePath, entry);
  }
}

function inspectPackageJson(absolutePath, path) {
  const manifest = readJsonFile(absolutePath, path);
  if (!manifest) return;

  if (path === "package.json") {
    if (manifest.packageManager !== "pnpm@10.23.0") {
      failures.push(`${path}: packageManager must be pnpm@10.23.0.`);
    }
    if (manifest.engines?.node !== ">=24 <25") {
      failures.push(`${path}: engines.node must be >=24 <25.`);
    }
  }

  for (const field of packageDependencyFields) {
    const dependencies = manifest[field];
    if (!dependencies || typeof dependencies !== "object" || Array.isArray(dependencies)) {
      continue;
    }

    for (const [name, version] of Object.entries(dependencies)) {
      if (typeof version === "string" && version.startsWith("file:")) {
        failures.push(`${path}: ${field}.${name} uses ${version}; use workspace:* for internal packages.`);
      }
    }
  }
}

function inspectVercelProjectJson(absolutePath, path) {
  const project = readJsonFile(absolutePath, path);
  if (!project) return;

  const nodeVersion = project.settings?.nodeVersion;
  if (nodeVersion && nodeVersion !== "24.x") {
    failures.push(`${path}: local Vercel metadata reports Node ${nodeVersion}; expected 24.x.`);
  }
}

function readJsonFile(absolutePath, path) {
  try {
    return JSON.parse(readFileSync(absolutePath, "utf8"));
  } catch (error) {
    failures.push(`${path}: invalid JSON (${error.message}).`);
    return undefined;
  }
}

function toRepoPath(absolutePath) {
  return relative(repoRoot, absolutePath).replaceAll("\\", "/");
}
