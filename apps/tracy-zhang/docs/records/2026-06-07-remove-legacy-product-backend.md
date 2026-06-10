# Remove Legacy Product And Backend Code

- date: 2026-06-07

## Context

The personal Tracy Zhang site had been repositioned as an advisor profile and
contact surface, but the source tree still contained older product pages,
coverage pages, quote APIs, career APIs, S3 upload helpers, Postgres helpers,
carrier assets, and career SQL.

## Decision

Remove the legacy implementation from `apps/tracy-zhang`. As of the 2026-06-10
cleanup, do not keep redirects for old product, quote, career, location, or
coverage URLs in `next.config.ts`; the app should expose only its current
advisor-profile surface and explicit links into the insurance app.

## Rationale

The canonical insurance site owns product depth, quote intake, compliance
language, campaign traffic, and lead capture. The personal site should stay
small and advisor-led: Tracy by name, direct line, office proof, languages,
review context, and routing into the canonical insurance experience.

## Future Guidance

If a future workflow needs quote intake, certificates, lead storage, career
applications, S3 uploads, or Postgres-backed admin screens, build it in
`apps/tracy-zhang-insurance` or a shared package first. Do not reintroduce a
second product/backend surface under `apps/tracy-zhang` unless the product role
changes explicitly.
