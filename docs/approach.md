# Project Approach

Project: `insurance-websites`

This repository is a source-focused monorepo for Tracy Zhang Insurance public
websites, local acquisition surfaces, shared insurance data, and lead capture.

Use this file for the repo-level operating model. Use each app's
`docs/approach.md` for website-specific stack details, routes, env vars, and
deployment notes.

## Project At A Glance

- domain: insurance agency websites and campaign lead capture
- main users: agency customers, agency operators, developers, coding agents
- current apps: `apps/tracy-zhang-insurance`, `apps/tracy-zhang`
- shared packages: `packages/domain`, `packages/lead-capture`, `packages/ui`
- current production hosting: Vercel
- DNS: Cloudflare-managed where zones exist

## Stack

- frontend: Next.js App Router, React 19, TypeScript, Tailwind CSS
- runtime target: Node.js 24.x for local verification and Vercel production
- package manager: `pnpm@10.23.0` with one root `pnpm-lock.yaml`
- production builds: `next build --webpack` for both apps
- canonical insurance runtime: Vercel route handlers for lead capture/admin
- database: Postgres/Neon through `DATABASE_URL`
- email notification: Resend
- analytics: Vercel Analytics/Speed Insights and optional GA4 via
  `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- structured data: JSON-LD in app layouts and article pages
- SEO model: route/product metadata helpers, reciprocal hreflang alternates,
  local-domain self-canonical homepages, and content-owned internal links
- verification: app-specific lint/build plus tests and browser checks for UI
  changes

## Architecture

- `apps/tracy-zhang-insurance`: canonical insurance app with host-aware
  statewide/local surfaces, product pages, guidance, lead backend, and admin.
- `apps/tracy-zhang`: advisor profile and trust site.
- `packages/domain`: shared brand, office, product, domain, and market data.
- `packages/lead-capture`: shared lead validation and consent model.
- `packages/ui`: shared UI primitives.
- `docs/`: portfolio-level product intent, approach, and records.
- `apps/<site>/docs/`: site-specific intent, approach, and records.
- Simplified Chinese discoverability uses `/zh/` URL paths inside the existing
  apps, with `zh-Hans` sitemap alternates and self-canonical Chinese URLs. Do
  not create cloned Chinese apps or domains for this purpose.
- Language switching is a route-aware UI control that links between real
  localized URLs while preserving query strings and hash fragments. The visible
  control shows the current locale only, so English pages do not display
  Chinese UI text merely as a switch target.
- Public insurance metadata is source-owned through `apps/tracy-zhang-insurance/src/lib/seo.ts`.
  Product pages should not carry ad hoc title, description, canonical, or
  hreflang blocks when the route belongs to the current indexed surface.
- Product and guidance internal links are content-owned. Product relationships
  come from `packages/domain`; story-to-product relationships live with story
  content so crawlers and visitors can move between advice and service pages.
- SEO measurement is an operating loop, not another runtime feature. Use Search
  Console, GA4, Vercel Analytics, sitemap status, and production smoke checks to
  decide which Chinese, local, product, or guidance surfaces need improvement.
  See `docs/records/2026-06-11-seo-measurement-operations.md`.

## Visual Operating Model

- `tracyzhanginsurance.com` should feel like the statewide insurance command
  center: broad product coverage, decision paths, guidance, quote intake, and
  campaign readiness.
- `sanmarinoinsurance.com` and future local domains should feel like local
  office acquisition surfaces: city-specific headline, office proof, service
  area, and locally weighted product merchandising.
- `tracyzhang.com` should feel like a personal advisor dossier: Tracy's name,
  portrait, direct line, languages, review context, offices, and intent routing.
  It should not drift into a second full product catalog.

## Operating Model

```text
website intent
  -> root docs and app-local product docs
  -> shared domain/lead packages when facts or rules repeat
  -> routes, components, content models, forms, and telemetry
  -> app-specific lint/build/browser checks
  -> Vercel project and domain smoke checks
  -> docs/records updated when product direction changes
```

## Engagement Foundation

The next marketing layer should be built as a production-minimum campaign and
lead distribution setup, not as an autonomous AI agent system or full CRM.

Use Resend for email campaigns and the existing Postgres lead database for
website lead capture/admin review. Add custom database tables and APIs only
when they are needed to run the first production workflows. Human mailboxes
should live in a mailbox provider such as Google Workspace, Microsoft 365,
Fastmail, or Zoho rather than in Resend.

Near-term production work should prioritize:

- verified campaign sender and reply-to mailbox
- Resend audience/contact setup for email-first campaigns
- CSV import path for policy/account exports and third-party lead files
- basic suppression/consent/source fields so outreach is not blind
- UTM conventions for each campaign link
- simple assignment and follow-up visibility for internal producers

Keep business logic outside code until it is defined by real production data,
provider contracts, campaign requirements, or operator policy. Import tools
should accept mappings/config. Campaign segmentation should start in Resend or
CSV filters. Producer assignment should start as an explicit input/output file
or simple configurable rule, not a baked-in router.

AI may assist with campaign planning, message drafting, segmentation ideas,
lead summaries, and operator-approved follow-up drafts. It should not be treated
as an autonomous inbound/outbound insurance agent for the first production
campaigns.

Twilio SMS, MMS, RCS, and voice should remain a readiness track until consent
copy, opt-out handling, A2P 10DLC registration, delivery callbacks, inbound
webhooks, and quiet-hours behavior are implemented and verified. Start with
transactional or service-oriented SMS before marketing SMS.

The first two likely engagement workflows are examples the tooling should make
possible without hardcoding:

1. Home-without-auto cross-sell: import or sync policy/account lines, identify
   active home/property customers without a visible auto line, suppress
   unsubscribed or do-not-contact contacts, send or draft a measured email-first
   campaign, and create producer tasks from replies, clicks, and form
   submissions.
2. Third-party lead distribution: import provider leads, keep enough source and
   consent evidence to know how they can be contacted, dedupe obvious repeats,
   and assign eligible leads to producers through the simplest useful output.

### Engagement API Readiness

Current production-ready building blocks:

- `DATABASE_URL`: Postgres persistence for website leads, consent copy version,
  source attribution, and lead events
- `RESEND_API_KEY`: Resend sending for internal lead notifications
- `LEADS_FROM_EMAIL` and `LEADS_TO_EMAIL`: production lead notification routing
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`, Vercel Analytics, and Speed Insights:
  website analytics
- `/api/leads`: public website lead capture endpoint
- `/admin/leads`: protected internal lead review surface

Minimum next configuration:

- `RESEND_AUDIENCE_ID`: Resend audience used for synced marketing contacts
- `CAMPAIGN_FROM_EMAIL`: verified sender for broadcast/campaign messages
- `CAMPAIGN_REPLY_TO_EMAIL`: real mailbox for campaign replies

Minimum next internal tools:

- one policy/account CSV import script or admin upload
- one third-party lead CSV import script or admin upload
- Resend contact sync for the imported audience, or manual Resend CSV upload if
  that gets the first campaign live faster
- simple producer assignment output: admin table, CSV export, or task list
- campaign UTM helper and documented naming convention

Defer until needed:

- Twilio SMS/MMS/RCS sending
- Resend inbound/webhook processing
- provider webhooks
- custom campaign builder UI
- AI endpoints
- generalized conversation history

## Constraints And Invariants

- The repo has one root `AGENTS.md`.
- Website-specific product intent belongs under `apps/<site>/docs/`.
- Tracy Zhang Insurance is the canonical insurance brand.
- Tracy Zhang personal site is the advisor profile and direct-contact surface.
- San Marino and La Palma domains are local acquisition surfaces, not separate
  brands.
- The misspelled `tracysinsurnace.com` domain is retired and must not be used.
- Dependency installation is root-only through pnpm. Do not add app-local
  `package-lock.json`, `node_modules`, or npm `file:` workspace dependencies.
- Production dependency resolution must use exact package versions and the
  committed root `pnpm-lock.yaml`; deployment packages should install with
  `pnpm install --frozen-lockfile`.
- Do not commit secrets, local env files, `.vercel`, `.next`, `out`,
  `node_modules`, or local screenshots unless intentionally documenting a
  visual reference.
- Chinese pages are localized surfaces under the same product model, not
  separate brands. Keep translated pages connected to their English equivalents
  through sitemap alternates and keep local-domain Chinese homepages scoped to
  local acquisition. New English pages do not become production-ready Chinese
  pages automatically; add reviewed Simplified Chinese content for public `/zh`
  coverage rather than relying on runtime translation or English fallbacks.
- LLM translation is allowed as a source-generation workflow. Use
  `pnpm i18n:translate --id <id> ...` to draft and store translations under
  `content/translations/<locale>/`, then run `pnpm i18n:check` to validate
  stored artifacts. Production page rendering must not require `OPENAI_API_KEY`.

## Verification And Delivery

Expected local checks:

```bash
pnpm lint:tracy-zhang-insurance
pnpm build:tracy-zhang-insurance
pnpm lint:tracy-zhang
pnpm build:tracy-zhang
pnpm test
```

Expected manual checks:

- homepage and mobile screenshots after layout changes
- key product pages after content-model changes
- lead form success and failure states
- admin auth and lead inbox behavior
- sitemap/robots checks after route or content changes
- live smoke checks after deployment

Deployment preference:

- For website changes, do not stop at local implementation or preview unless the
  user explicitly asks for local-only or preview-only work.
- After implementation and verification, deploy through the documented Vercel
  path and smoke-check the deployed result.
- Use preview deployments when a change is exploratory or needs review first.
  Use production deployments for approved public website updates and content
  changes.

Current production deployment notes:

- `apps/tracy-zhang-insurance` deploys to the Vercel project currently named
  `san-marino-insurance` and is aliased to `sanmarinoinsurance.com`,
  `www.sanmarinoinsurance.com`, `lapalmainsurance.com`,
  `www.lapalmainsurance.com`, `tracyzhanginsurance.com`, and
  `www.tracyzhanginsurance.com`. The campaign host
  `go.tracyzhanginsurance.com` belongs on the same project.
- `apps/tracy-zhang` deploys to the Vercel project `insurance-websites` and is
  aliased to `tracyzhang.com` and `www.tracyzhang.com`.
- `tracyzhang.com` redirects to `www.tracyzhang.com`; production
  `NEXT_PUBLIC_SITE_URL` for the personal site must be
  `https://www.tracyzhang.com` so metadata, robots, and sitemap output match
  the public canonical host.
- Deploy the personal site through Vercel's remote Production build path from
  the monorepo root. Do not use local prebuilt production output for this app:
  root `.env.local` is local-only and must not become a source of production
  metadata.
- `tracyzhanginsurance.com` and local insurance domains are managed in
  Cloudflare where zones exist. Apex and `www` are DNS-only `A` records
  pointing to Vercel `76.76.21.21`.
- The canonical Vercel project has production `DATABASE_URL`, `ADMIN_USER`,
  `ADMIN_PASS`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `LEADS_TO_EMAIL`,
  `LEADS_FROM_EMAIL`, and `RESEND_API_KEY` configured. Production lead storage
  and internal email notification are live.
- The canonical insurance domain publishes the full product/content sitemap.
  Local insurance domains publish host-specific robots/sitemaps and self-
  canonical local homepages; deeper product/content URLs remain canonical under
  `tracyzhanginsurance.com`.
- Google Search Console domain properties are verified for
  `tracyzhanginsurance.com`, `sanmarinoinsurance.com`, and
  `lapalmainsurance.com` through Cloudflare DNS TXT records. Keep those root
  TXT records in place so ownership remains durable.
- Sitemaps for `tracyzhanginsurance.com`, `sanmarinoinsurance.com`, and
  `lapalmainsurance.com` were submitted to Google Search Console on
  2026-06-07. Google initially reported `Couldn't fetch` in the sitemap table
  even though direct Googlebot-style requests returned HTTP 200 XML; recheck
  Search Console after processing lag before making code or DNS changes.
- The next SEO operating layer is measurement and search operations: recheck
  sitemap processing, inspect queries by page and locale, use URL inspection
  for high-value pages, keep local profile data consistent, and let production
  search/lead evidence guide future content expansion rather than creating
  cloned or runtime-translated pages.
- The canonical insurance app should be deployed through a staged root-level
  pnpm source deploy with an offline-derived staged lockfile and frozen install,
  not the nested-app prebuilt path. See
  `docs/records/2026-06-06-vercel-deployment-path.md`.
