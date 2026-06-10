# Auto Lead Intake Persistence Slice

- date: 2026-06-09

## Context

The user provided a business and technical specification for approved lead
sources to submit auto insurance leads. The specification removed policy
issuance, renewal, and bonus tracking and focused the workflow on factual lead
intake, prospect consent, internal review, lead quality controls, and fee
eligibility.

## Record

Auto lead intake is a separate workflow from the public customer quote form. It
should preserve the distinction between factual lead submission and licensed
insurance activity.

The first production slice is:

- `/auto-lead-intake`: unlisted, noindex public intake page for approved lead
  sources
- `/api/auto-leads`: public intake API implementation
- `auto_leads` and `auto_lead_events`: first-class Postgres tables separate
  from ordinary quote leads
- `/admin/auto-leads`: protected internal review surface with status
  changes, notes, and fee-ladder calculation on accepted qualified leads

The first implementation used contractor-prefixed route and persistence names.
The 2026-06-10 cleanup removed those public/admin/API compatibility paths and
renamed persistence to the current auto lead model through the lead migration.

Auto lead submissions start as `submitted` and `pending_review`. They are not
qualified or fee-eligible until internal review marks them
`accepted_qualified_lead`.

## Evidence

The user specification requires one car per lead, prospect consent, required
confirmations, acceptance/rejection/revocation, audit logs,
and the inverse lifetime fee ladder. The generic `leads` table and `/api/leads`
route are customer quote-form infrastructure and do not carry those concepts.

## Future Guidance

Do not hide auto lead intake inside ordinary lead `message` fields. Continue
to keep auto lead intake first-class as the workflow gains submitter accounts,
uploadable consent proof, dashboards, exports, and producer assignment.

Do not add quoting, carrier comparison, coverage recommendations, application
completion, binding, or policy issuance behavior to the public intake surface.
Those activities belong to licensed and authorized insurance professionals.
