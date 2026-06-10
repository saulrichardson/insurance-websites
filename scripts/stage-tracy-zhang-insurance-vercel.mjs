#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const targetRoot = resolve(process.argv[2] ?? "/tmp/tracy-zhang-insurance-vercel");
const appRoot = join(repoRoot, "apps/tracy-zhang-insurance");
const packageRoots = ["domain", "lead-capture", "ui"];
const excludedNames = new Set([".next", ".vercel", "node_modules", "out"]);
const requiredRootFiles = ["pnpm-lock.yaml"];

rmSync(targetRoot, { recursive: true, force: true });
mkdirSync(join(targetRoot, "packages"), { recursive: true });

copyDirectory(appRoot, targetRoot);
copyRootDeploymentSettings();
copyRequiredRootFiles();

for (const packageName of packageRoots) {
  copyDirectory(
    join(repoRoot, "packages", packageName),
    join(targetRoot, "packages", packageName),
  );
}

writeFileSync(targetRoot + "/pnpm-workspace.yaml", "packages:\n  - packages/*\n");
writeStagedLockfile();

const projectConfig = join(appRoot, ".vercel/project.json");
if (existsSync(projectConfig)) {
  mkdirSync(join(targetRoot, ".vercel"), { recursive: true });
  cpSync(projectConfig, join(targetRoot, ".vercel/project.json"));
}

writeFileSync(targetRoot + "/.vercelignore", ".next\nnode_modules\n.vercel/output\n");

console.log(`Staged Tracy Zhang Insurance Vercel deploy root at ${targetRoot}`);
console.log("");
console.log("Next commands:");
console.log(`  cd ${targetRoot}`);
console.log("  pnpm install --frozen-lockfile");
console.log("  pnpm build");
console.log("  vercel deploy --prod --yes --archive=tgz --force --scope saulrichardsons-projects");

function copyDirectory(source, destination) {
  cpSync(source, destination, {
    dereference: false,
    errorOnExist: false,
    filter: shouldCopy,
    force: true,
    recursive: true,
  });
}

function shouldCopy(sourcePath) {
  const name = basename(sourcePath);
  if (excludedNames.has(name)) return false;
  if (name.startsWith(".env") && name !== ".env.example") return false;
  return true;
}

function copyRootDeploymentSettings() {
  const rootPackage = JSON.parse(readFileSync(join(repoRoot, "package.json"), "utf8"));
  const targetPackagePath = join(targetRoot, "package.json");
  const targetPackage = JSON.parse(readFileSync(targetPackagePath, "utf8"));

  if (rootPackage.pnpm) {
    targetPackage.pnpm = rootPackage.pnpm;
  }
  if (rootPackage.engines) {
    targetPackage.engines = rootPackage.engines;
  }

  writeFileSync(targetPackagePath, JSON.stringify(targetPackage, null, 2) + "\n");
}

function copyRequiredRootFiles() {
  for (const filename of requiredRootFiles) {
    const source = join(repoRoot, filename);
    if (!existsSync(source)) {
      throw new Error(`${filename} is required for a reproducible Vercel deploy package.`);
    }
    cpSync(source, join(targetRoot, filename));
  }
}

function writeStagedLockfile() {
  execFileSync("pnpm", ["install", "--lockfile-only", "--offline"], {
    cwd: targetRoot,
    stdio: "inherit",
  });
}
