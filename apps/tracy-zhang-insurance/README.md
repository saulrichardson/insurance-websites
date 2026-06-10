# Tracy Zhang Insurance Website

Canonical insurance and campaign website for `tracyzhanginsurance.com`.

- Framework: Next.js App Router + TypeScript
- Styling: Tailwind CSS
- Runtime: Vercel serverless routes for lead capture and admin review
- Shared packages: `@insurance-websites/domain`, `@insurance-websites/lead-capture`, `@insurance-websites/ui`
- Domains: `tracyzhanginsurance.com`, `sanmarinoinsurance.com`, `lapalmainsurance.com`
- DNS: Cloudflare-managed where zones exist

## Local Development

From the repo root:

```bash
pnpm install
pnpm dev:tracy-zhang-insurance
```

Open `http://localhost:3000`.

## Build

```bash
pnpm build:tracy-zhang-insurance
```

## Lead Backend

This app uses a real server-side lead pipeline:

- `POST /api/leads`
- Neon/Postgres through `DATABASE_URL`
- Resend notifications through `RESEND_API_KEY`, `LEADS_TO_EMAIL`, and `LEADS_FROM_EMAIL`
- Session-protected `/admin/leads`

Run the lead schema migration after `DATABASE_URL` is configured:

```bash
pnpm --filter @insurance-websites/tracy-zhang-insurance db:migrate:leads
```

## Product Notes

- Product intent and operating notes live in `docs/`.
- Shared agency, office, product, market, and retired-domain data live in `packages/domain`.
- Shared lead validation, consent copy, and notification text live in `packages/lead-capture`.
- The misspelled `tracysinsurnace.com` domain is retired and must not be used.
- City domains are local acquisition surfaces, not separate brands.
