import type { NextConfig } from "next";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = findWorkspaceRoot(appRoot);

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  transpilePackages: [
    "@insurance-websites/domain",
    "@insurance-websites/lead-capture",
    "@insurance-websites/ui",
  ],
  turbopack: {
    root: workspaceRoot,
  },
};

export default nextConfig;

function findWorkspaceRoot(start: string) {
  let current = start;

  while (true) {
    if (existsSync(join(current, "pnpm-workspace.yaml"))) return current;

    const parent = dirname(current);
    if (parent === current) return start;
    current = parent;
  }
}
