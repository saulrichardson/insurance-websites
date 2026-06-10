# Tracy Zhang Website

Advisor profile and contact site for `tracyzhang.com`.

This app presents Tracy Zhang as a local insurance advisor serving California.
It keeps Tracy's direct contact
details, offices, languages, public review context, and coverage-decision paths
easy to find.

## Local Development

From the repo root:

```bash
pnpm install
pnpm dev:tracy-zhang
```

Open `http://localhost:3000`.

## Build

```bash
pnpm build:tracy-zhang
pnpm start:tracy-zhang
```

## Product Notes

- Product intent lives in `docs/product-intent.md`.
- Homepage and coverage paths: `src/app/page.tsx`.
- Header/nav: `src/components/site-header.tsx`.
- Footer: `src/components/site-footer.tsx`.
- Telemetry: `src/components/site-telemetry.tsx` and `src/components/marketing-events.tsx`.
- Site/agent data: `src/lib/site.ts`.
- Structured data: `src/lib/schema.ts`.

This app should stay advisor-first. Product depth, quotes, certificates,
campaigns, and business-specific marketing live in
`apps/tracy-zhang-insurance`.
