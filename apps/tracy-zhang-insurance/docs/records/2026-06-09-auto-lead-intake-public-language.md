# Auto Lead Intake Public Language

- date: 2026-06-09

## Context

The first auto lead intake implementation exposed too much internal contract
language and placed compliance/payment context too prominently. The user
corrected the product framing: the page should be a good intake form first, not
an internal-facing contractor workflow document.

## Record

The public intake surface is `/auto-lead-intake`. It should use external,
task-focused language: auto lead, submitter, prospect, vehicle, consent, and
review.

Visible submitter setup should be name and email only. Do not add a visible
submitter ID or source-details section to the public form. Source and campaign
context should be captured implicitly from URL/query parameters, UTM fields,
referrer, and request metadata.

Do not add a broad address/contact-timing dropdown to the public form. Garaging
ZIP is the precise vehicle-location field for this version. Prospect address,
preferred contact time, consent proof notes, and public source URL fields
should stay out of the surface unless a concrete production workflow proves
they are needed.

Require VIN on the public intake form. Year, make, and model can be collected
as review context, but they should not be accepted as a substitute. The driver
field should ask for the primary driver's full legal name.

Use one public agreement checkbox instead of five separate final confirmation
checkboxes. The checkbox should link to `/auto-lead-intake/terms`, where the
exact accuracy, consent, present-interest, no-quote/no-advice, review, and
factual-intake boundary language lives.

Do not add phone/help links to the intake shell for general reassurance. The
page should stay precise: brand mark, short purpose, the form, and final
confirmations. The prospect phone field remains part of the lead because it is
needed for follow-up.

Avoid visible public-page terms such as contractor, Agency, Qualified Lead Fee,
module, or payment ladder. Compliance boundaries still matter, but they belong
near the final confirmations or behind secondary disclosure, not in the first
screen.

The source model should now use the current auto lead language throughout:
`auto_leads`, `auto_lead_events`, `/api/auto-leads`, `/admin/auto-leads`,
`AutoLeadForm`, and submitter fields. The 2026-06-10 cleanup added a migration
path that renames the earlier persistence identifiers when they exist.

## Evidence

- `apps/tracy-zhang-insurance/src/app/auto-lead-intake/page.tsx`
- `apps/tracy-zhang-insurance/src/components/AutoLeadForm.tsx`
- `apps/tracy-zhang-insurance/src/app/api/auto-leads/route.ts`
- `apps/tracy-zhang-insurance/docs/product-intent.md`
- `apps/tracy-zhang-insurance/docs/approach.md`

## Future Guidance

Preserve the intake form's hierarchy: brand legitimacy, short purpose, required
facts, optional details, final confirmations, then submission. Do not bring
internal fee, contract, or review-process language forward unless the page is
explicitly redesigned for an authenticated admin/operator audience.
