# Local Domain Office Isolation And Imagery

- date: 2026-06-09

## Context

The city-specific insurance domains were still carrying portfolio-wide office
language in shared chrome and core pages. The user clarified that a city domain
should not mention the other office and should feel more city-specific through
local imagery.

## Record

Local acquisition domains should present as one city-specific front door for
Tracy Zhang Insurance, not as a directory of all offices.

For `sanmarinoinsurance.com` and `lapalmainsurance.com`:

- header subline and phone should resolve to the active market office
- navigation should use `Location`, not `Offices`
- footer office details and hours should show only the active office
- contact and location pages should show only the active office
- `/locations` should show only the active market when rendered on a local host
- direct mismatched location routes such as
  `sanmarinoinsurance.com/locations/la-palma` should redirect to the active
  local `/location` page
- shared page hero and CTA components should resolve their default phone path
  from the active host office when a page does not pass an explicit office
- local quote forms should store the active office as a hidden value rather
  than asking the visitor to choose between offices
- structured data should use the active office and should not include
  department entries for the other office
- local home/location pages should use city-specific imagery with attribution

The local domains remain Tracy Zhang Insurance surfaces. Product facts,
lead capture, consent copy, analytics, admin, and backend behavior remain
shared.

## Evidence

Local imagery added:

- San Marino: The Huntington Chinese Garden image from Wikimedia Commons,
  credited to Hickorypine under CC BY-SA 4.0.
- La Palma: La Palma Civic Center image from Wikimedia Commons, credited to
  Mike Greene under CC BY-SA 2.0.

Verification against the production-mode local build with host headers:

- `www.sanmarinoinsurance.com` on `/`, `/contact`, `/location`, and
  `/locations` contained no La Palma office details, Moody Street address, or
  La Palma phone.
- `www.lapalmainsurance.com` on `/`, `/contact`, `/location`, and `/locations`
  contained no San Marino office details, Huntington Drive address, or San
  Marino phone.
- Local host checks for `/about`, `/products`, `/auto-insurance`,
  `/home-insurance`, `/business-insurance`, and `/stories` contained no
  opposite-office names, addresses, or phone numbers after shared hero/CTA
  defaults were made host-aware.
- Direct local-host checks confirmed mismatched city routes redirect to
  `/location`, while matching city routes and canonical-domain city routes
  still render normally.
- Local contact quote forms rendered zero visible `officePreference` selects
  and persisted a hidden office value:
  `san-marino-ca` for San Marino and `la-palma-ca` for La Palma.
- `pnpm lint:tracy-zhang-insurance`, `pnpm test`, and
  `pnpm build:tracy-zhang-insurance` passed.

## Future Guidance

When adding another city domain, add a market profile, local image asset and
attribution, active office mapping, and host-aware copy checks. Do not let
shared navigation, footer, contact, or schema reintroduce the other office onto
local domains.
