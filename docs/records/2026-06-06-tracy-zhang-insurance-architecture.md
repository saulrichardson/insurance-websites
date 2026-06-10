# Tracy Zhang Insurance Architecture

- date: 2026-06-06

## Context

The user bought `tracyzhanginsurance.com` and clarified that the portfolio
should not use the misspelled `tracysinsurnace.com` domain. The user also
clarified that city sites should be tailored to their markets without becoming
separate brands or generic copies.

## Record

The durable architecture is:

- `tracyzhanginsurance.com`: canonical insurance and campaign identity.
- `tracyzhang.com`: personal advisor trust site.
- `sanmarinoinsurance.com`: San Marino local acquisition surface.
- `lapalmainsurance.com`: La Palma local acquisition surface.
- `tracysinsurnace.com`: retired; do not use in public code, DNS, redirects,
  ads, email, SMS, or campaign links.

The canonical app is `apps/tracy-zhang-insurance`. It owns product depth, local
market merchandising, lead capture, consent, admin review, and campaign
readiness.

On 2026-06-06, the canonical app was deployed through the existing Vercel
project currently named `san-marino-insurance`. The public aliases are
`sanmarinoinsurance.com`, `www.sanmarinoinsurance.com`,
`lapalmainsurance.com`, `www.lapalmainsurance.com`,
`tracyzhanginsurance.com`, and `www.tracyzhanginsurance.com`.
`tracyzhanginsurance.com` and local insurance domains remain on Cloudflare
nameservers with DNS-only `A` records to Vercel `76.76.21.21`.

Both apps use `next build --webpack` for production builds. This is intentional:
the Vercel CLI/local-builder path currently sets an app-root tracing value that
conflicts with Turbopack monorepo package resolution for the canonical app.

## Evidence

- Shared domain data lives in `packages/domain`.
- Shared lead validation and consent copy live in `packages/lead-capture`.
- The canonical app has host-aware homepage behavior and local pages for San
  Marino, La Palma, and Cerritos.
- The lead backend stores requests and consent records in Postgres and attempts
  Resend notifications.
- Neon lead schema migration and a disposable API/database smoke check passed
  on 2026-06-06.
- Production Vercel env has `DATABASE_URL`, `ADMIN_USER`, and `ADMIN_PASS` for
  the canonical app. Resend lead-notification env vars are still pending.

## Future Guidance

Preserve one customer-facing brand: Tracy Zhang Insurance. Tailor local pages by
market intent, product grouping, local proof, and office context. Do not fork
compliance copy, product facts, or lead capture per city.
