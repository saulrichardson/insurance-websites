# Repo Reorganization

- date: 2026-06-06

## Context

The insurance website code was consolidated under `/Users/saulrichardson/projects/insurance-websites`.

The previous active repo lived at `/Users/saulrichardson/projects/allstate/website` and already used the `saulrichardson/insurance-websites` git remote. A separate Tracy Zhang marketing website lived at `/Users/saulrichardson/projects/allstate/gtm/online/web`.

## Record

The current organization is:

- `apps/tracy-zhang`: active Tracy Zhang / Allstate site associated with `tracyzhang.com`.
- `apps/tracy-zhang-gtm`: alternate Tracy Zhang GTM marketing site.

The repo uses the agentic engineering template's documentation model with one root `AGENTS.md`, root portfolio docs, and app-local product docs. Future website-specific product intent should be tracked under `apps/<site>/docs/`, not with nested agent files.

## Evidence

- Root scripts in `package.json` now target `apps/tracy-zhang` by default.
- `apps/tracy-zhang/README.md` documents `tracyzhang.com` and `www.tracyzhang.com` domain setup.
- `apps/tracy-zhang-gtm/src/config/site.ts` identifies the alternate site as `Tracy Cuiying Zhang` / `Allstate Insurance Agent`.

## Future Guidance

Keep app boundaries explicit. Add new websites under `apps/<site-slug>`, give each app its own `docs/product-intent.md` and `docs/approach.md`, and only introduce shared packages when duplication becomes a real maintenance problem.
