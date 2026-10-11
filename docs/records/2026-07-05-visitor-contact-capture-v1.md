# Visitor Contact Capture V1

- date: 2026-07-05

## Context

The outreach goal for `tracyzhanginsurance.com` is not a generic contact form,
quote form, or full clickstream analytics product. The user later clarified
that the useful unit of value is real contact capture: public visits should
produce reachable people when a known campaign token or configured identity
provider can resolve them, without presenting a quote-request form.

## Record

The v1 model should preserve these boundaries:

- Capture first-party visitor/session identifiers, landing path, submitted path,
  referral/campaign data, locale, market/office, route/product context, and
  basic browser context.
- Do not make the public quote form the outreach capture mechanism. It is
  retired from the public UI and `/api/leads` returns `410 Gone`.
- Contactability for future outbound should come from a separate
  identity-resolution path rather than the old quote form.
- Known-contact campaign links should carry a token query parameter such as
  `ct`. Store only the token hash in Postgres; send the raw token to visitors
  in outbound URLs.
- Unknown visitors should create identity-resolution requests. When a provider
  webhook is configured, the server should call it with visit/source context
  and store returned contact candidates as contacts, identities, addresses,
  sources, and match records.
- `/admin/contact-capture` is the operator surface for seeing whether the
  capture layer is producing real contacts and where matches came from.
- Store consent records separately from leads so future outbound workflows can
  check the allowed channel and purpose before contacting someone.
- Avoid treating v1 as every-click analytics, SMS campaigning, or a full CRM.

## Evidence

The insurance app now has additive tables in
`apps/tracy-zhang-insurance/sql/leads.sql` for contacts, identities, consents,
visitor sessions, visitor events, contact sources, contact events,
known-contact tokens, identity-resolution requests, identity matches, and
contact addresses. Passive public page visits post to `/api/visitor-events`,
which now records the visit and attempts identity resolution. Historical
lead/admin infrastructure remains for existing records, but the public quote
form is retired and new `/api/leads` submissions are rejected.

## Future Guidance

Future outbound work should not revive the quote form by default. Build
enrichment, segmentation, automation, and message sending as separate
capabilities on top of the contact-capture ledger, with clear consent checks,
suppression rules, audit events, and unsubscribe handling.
