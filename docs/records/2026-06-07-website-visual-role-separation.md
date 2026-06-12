# Website Visual Role Separation

- date: 2026-06-07

## Context

The user observed that Tracy Zhang and San Marino looked too similar and asked
for a makeover where each website is tailored to its exact job. The earlier
implementation had the correct domain architecture but too much shared homepage
composition and visual language.

## Record

The portfolio should preserve three distinct website feelings:

- `tracyzhanginsurance.com`: statewide insurance command center for broad
  product depth, guidance, campaign traffic, quote intake, and lead capture.
- `sanmarinoinsurance.com` and future local domains: local office acquisition
  surfaces with city-led first screens, address/office proof, service area, and
  local product emphasis.
- `tracyzhang.com`: personal advisor dossier for Tracy by name, with portrait,
  office phone path, languages, review context, offices, and routing into the
  insurance site for product-depth work.

These surfaces may share domain data, product facts, analytics, compliance
copy, and lead capture, but they should not converge back to the same homepage
template.

## Evidence

- `apps/tracy-zhang-insurance/src/app/page.tsx` now branches by
  `market.domainRole`, rendering a statewide homepage for canonical hosts and a
  local-office homepage for local domains.
- `apps/tracy-zhang/src/app/page.tsx` now uses a compact advisor dossier
  instead of a broad product grid.
- `apps/tracy-zhang` no longer carries the older duplicate product pages,
  quote API, career API, S3 helpers, Postgres helper, carrier assets, or career
  SQL. The 2026-06-10 cleanup also removed the app-level redirects for those
  old public URLs so the personal app source now matches its advisor-profile
  role directly.
- `apps/tracy-zhang-insurance/src/app/page.tsx` uses a quieter statewide
  coverage ledger in the hero and avoids visible architecture language in
  customer-facing copy.
- Visual checks were captured for canonical insurance desktop/mobile, San
  Marino local desktop/mobile, and Tracy desktop/mobile.
- Lint, production builds, and shared tests passed after the redesign.

## Future Guidance

When adding La Palma, Cerritos, campaign pages, or new local domains, change the
market lens and local proof without forking product truth or lead capture. When
improving Tracy's personal site, add trust and advisor-specific proof rather
than another product catalog.
