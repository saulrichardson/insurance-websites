# Package Manager: pnpm

- date: 2026-06-06

## Context

The repo became a real monorepo with two Next apps and shared packages.
Npm created fragile app-local dependency state during Vercel app-folder builds:
app-local `node_modules`, app-local lockfile history, `file:../../packages/*`
workspace references, and audit output tied to stale app install paths.

## Record

Use `pnpm@10.23.0` as the package manager for this repository.

- Keep one root `pnpm-lock.yaml`.
- Keep workspace membership in `pnpm-workspace.yaml`.
- Use `workspace:*` for internal packages.
- Run installs from the repo root with `pnpm install`.
- Use root scripts such as `pnpm build`, `pnpm lint`, and app-specific scripts
  such as `pnpm build:tracy-zhang-insurance`.
- Do not add app-local `package-lock.json` files.
- Do not add npm `file:` dependencies for internal packages.
- Do not treat every app/package `node_modules` entry as app-local dependency
  drift. pnpm creates workspace linker artifacts under workspace packages from
  the root install, and local verification commands may need them. If they are
  missing or suspect, recreate them with `pnpm install --frozen-lockfile` from
  the repo root rather than deleting them as cleanup.
- Use `pnpm hygiene:check` before deployment-oriented cleanup. It verifies
  real dependency and environment drift without treating pnpm workspace linker
  directories as a problem.

The root `preinstall` script rejects non-pnpm installs so accidental
`npm install` fails with an explicit message instead of rewriting the workspace.

## Evidence

- `package.json` declares `packageManager: pnpm@10.23.0`.
- `pnpm-workspace.yaml` lists `apps/*` and `packages/*`.
- Internal app dependencies use `workspace:*`.
- `scripts/ensure-pnpm.mjs` enforces pnpm during installs.

## Future Guidance

If Vercel build behavior changes, revisit the deployment command shape, but do
not switch back to app-local npm installs. The deploy path should preserve root
workspace resolution and a single lockfile.
