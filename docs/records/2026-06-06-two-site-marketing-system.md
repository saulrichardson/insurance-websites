# Two-Site Marketing System

- date: 2026-06-06

## Context

The insurance portfolio was initially at risk of collapsing into either a
business-insurance-only site or a duplicate Tracy/agency website. The user
clarified that San Marino Insurance sells many types of insurance and that
Tracy Zhang should be more personal, with insurance-shopping traffic routed
elsewhere in the frontend.

## Record

The durable product split is:

- `apps/san-marino-insurance`: canonical agency marketing, content, product,
  guidance, quote-routing, local SEO, and conversion-tracking site.
- `apps/tracy-zhang`: personal advisor profile for Tracy Zhang: biography,
  offices, languages, reputation, direct phone paths, and intent-based routing
  to San Marino Insurance.

San Marino should not be narrowed back to only commercial/business insurance.
Tracy should not become a duplicate product catalog.

## Evidence

- San Marino homepage now opens with broad positioning across home, car, family,
  business, personal, property, life, and specialty coverage.
- San Marino product routes exist for auto, home, condo, renters, life,
  business, motorcycle, ATV, boat, and FAIR Plan.
- San Marino has public guidance stories and product-decision guidance.
- Tracy homepage routes visitors by intent to San Marino products, business
  insurance, and California property guidance.
- Telemetry now tracks quote, phone, SMS, product, guidance, and cross-site
  events.

## Future Guidance

This record is historical. The later `2026-06-06-tracy-zhang-insurance-architecture.md`
record supersedes the San Marino-as-canonical app model. Preserve the broader
split instead: Tracy Zhang remains the advisor profile site, while Tracy Zhang
Insurance owns product depth, local acquisition surfaces, quote intake, consent,
and campaign readiness.
