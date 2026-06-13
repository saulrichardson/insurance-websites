# Insurance Websites

Monorepo for Tracy Zhang Insurance public websites, local acquisition surfaces,
shared insurance content, and consented lead capture.

This repository follows the `saulrichardson/agentic-engineering-template`
documentation model:

- one root `AGENTS.md`
- portfolio-level docs in `docs/`
- one app folder per public website role
- website-specific docs under `apps/<site>/docs/`
- shared domain and lead logic under `packages/`

## Apps

| App | Role | Production Domains |
| --- | --- | --- |
| `apps/tracy-zhang-insurance` | Canonical insurance, local acquisition, campaign, lead capture, and admin app | `tracyzhanginsurance.com`, `sanmarinoinsurance.com`, `lapalmainsurance.com` |
| `apps/tracy-zhang` | Personal advisor trust, office, language, and direct-contact site | `tracyzhang.com`, `www.tracyzhang.com` |

## Marketing Model

Tracy Zhang Insurance is the primary insurance identity. The canonical app owns
product pages, guidance articles, quote paths, consented lead capture, office
details, local SEO, and campaign attribution.

Tracy Zhang is the personal trust layer. It introduces Tracy, shows office and
language context, and routes insurance-shopping traffic to
`tracyzhanginsurance.com`.

San Marino and La Palma domains are tailored local acquisition surfaces. They
should not fork product facts, compliance copy, or lead capture.

The misspelled `tracysinsurnace.com` domain is retired and must not be used.

## Local Development

Install workspace dependencies from the repo root:

```bash
node --version # must be Node 24.x
pnpm install
```

Run a site:

```bash
pnpm dev:tracy-zhang-insurance
pnpm dev:tracy-zhang
```

Open `http://localhost:3000`.

## Lead Backend

The canonical insurance app uses Postgres and Resend:

```bash
DATABASE_URL=
RESEND_API_KEY=
LEADS_TO_EMAIL=
LEADS_FROM_EMAIL=
ADMIN_USER=
ADMIN_PASS=
```

Run the lead migration after `DATABASE_URL` is configured:

```bash
pnpm --filter @insurance-websites/tracy-zhang-insurance db:migrate:leads
```

## Verification

Run checks from the repo root:

```bash
pnpm hygiene:check
pnpm lint
pnpm build
pnpm test
pnpm i18n:check
```

Use browser/screenshot checks after visible frontend changes.

## Translation Workflow

Chinese public pages are committed, crawlable `/zh` routes. Do not translate
public pages at request time.

Use the translation CLI to draft and store reusable LLM translations:

```bash
pnpm i18n:translate --id examples/get-a-quote --text "Get a quote"
pnpm i18n:translate --id insurance/story/example --input source.json --force
```

The script reads `OPENAI_API_KEY` at runtime, writes stored artifacts under
`content/translations/<locale>/`, and records source hashes so stale
translations can be detected. `pnpm i18n:check` validates stored artifacts
without calling the API.

## Documentation Model

Read these before substantial work:

1. `AGENTS.md`
2. `docs/product-intent.md`
3. `docs/approach.md`
4. the relevant app docs under `apps/<site>/docs/`
5. nearby code, config, deployment files, schemas, and tests

There should be exactly one `AGENTS.md` in this repository.

## Deployment Model

Vercel hosts the apps. Cloudflare manages DNS where zones exist.

This repo uses `pnpm@10.23.0`. Do not add app-local lockfiles or run app-local
installs; dependency resolution belongs to the root `pnpm-lock.yaml`. App and
package `node_modules` entries created by the root pnpm install are workspace
linker artifacts, not independent installs; leave them alone or recreate them
with `pnpm install --frozen-lockfile` from the repo root.

Run `pnpm hygiene:check` before deployment-oriented cleanup. It fails on real
workspace drift such as app-local lockfiles, npm `file:` dependencies, pulled
`.vercel/.env*` files, or stale local Vercel Node metadata, while allowing
pnpm-created workspace `node_modules` linker entries.

Production deployments should run on Node 24.x and install with the committed
root lockfile. Use frozen installs for deployment packages; if the lockfile is
missing or stale, fix the source and lockfile rather than letting Vercel resolve
new dependency versions during deploy.

The personal site deploys from the monorepo context through the Vercel project
`insurance-websites`. Use Vercel's remote Production build for this app so
Production env is the only source of public canonical metadata; do not ship a
local prebuilt production bundle from a workspace that contains `.env.local`.

The insurance app deploys through the staged root-level Vercel package created
by `scripts/stage-tracy-zhang-insurance-vercel.mjs`. The staged package must
include the root `pnpm-lock.yaml`, root `pnpm` settings, root Node engine, the
insurance app, and the shared packages it imports. The staging script derives a
staged lockfile offline so the app-at-root deploy package can still install
with `pnpm install --frozen-lockfile`.
