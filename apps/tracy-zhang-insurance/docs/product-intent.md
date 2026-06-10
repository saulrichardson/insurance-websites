# Tracy Zhang Insurance Product Intent

This app is the canonical insurance and campaign website for
`tracyzhanginsurance.com`.

## North Star

Create a polished, campaign-ready insurance website that helps Californians
move from an unclear coverage need to a concrete next step with Tracy Zhang
Insurance.

The app should support:

- statewide insurance positioning for `tracyzhanginsurance.com`
- tailored local acquisition surfaces for San Marino and La Palma domains
- product and guidance depth across personal, property, family, business, and
  specialty insurance
- consented lead capture with persistence, notification, attribution, and admin
  review
- policy, privacy, and SMS terms needed before email/SMS campaigns
- Simplified Chinese discovery and conversion paths for Chinese-speaking
  California shoppers across the canonical, local, and campaign surfaces

## Product Role

This is not a San Marino-only site and not a generic agency template. It is the
primary insurance identity for Tracy Zhang Insurance.

City domains should tailor the first screen, product emphasis, local proof, and
SEO framing. They should not fork product facts, lead capture, compliance copy,
or analytics behavior.

City domains should also avoid mentioning the other office in persistent
customer-facing surfaces. Header, footer, contact, location, structured data,
and local quote forms should resolve to the active city office only.

Chinese-language pages should preserve the same boundaries. They should make
Tracy Zhang Insurance discoverable to Chinese-speaking visitors through `/zh/`
paths, not through cloned websites or separate brands.

## Visual Role

The canonical domain and local domains intentionally share business logic but
should not look like simple copies.

- `tracyzhanginsurance.com`: statewide coverage command center with broad
  insurance categories, decision-path language, guidance, and quote intake.
- `sanmarinoinsurance.com`: local office surface leading with San Marino,
  Huntington Drive office proof, city imagery, service area, and local product
  weighting.
- `lapalmainsurance.com`: planned local office surface leading with La Palma,
  city imagery, nearby Cerritos/Orange County relevance, and household/small-
  business product weighting.

Keep product facts, consent copy, analytics, and lead capture shared. Vary the
homepage composition, first-viewport proof, product ordering, and local context.

## Core Workflows

### Start Insurance Help

```text
visitor lands on tracyzhanginsurance.com or a local domain
  -> sees market-appropriate coverage merchandising
  -> chooses a product, local page, guide, phone path, or lead form
  -> submits consented lead details
  -> request is saved, notification is attempted, and admin can review
```

### Local Acquisition

```text
visitor lands on sanmarinoinsurance.com or lapalmainsurance.com
  -> sees local office and market-specific product grouping
  -> remains under Tracy Zhang Insurance brand identity
  -> uses the same lead backend and product routes
```

### Campaign Traffic

```text
email/SMS/ad visitor opens a branded campaign URL
  -> campaign and UTM source are captured
  -> consent language is visible before submission
  -> admin can see source, status, and notification history
```

### Auto Lead Intake

```text
approved lead source opens /auto-lead-intake
  -> submits factual information for one vehicle-level auto lead
  -> confirms prospect consent and the no-quote/no-advice boundary
  -> lead is saved as submitted with audit metadata
  -> internal review accepts, rejects, revokes, or marks follow-up status
```

The auto lead intake workflow is not a consumer quote form and should not read
like an internal contract. The public page must be a clean, focused intake
surface that asks for submitter name/email, one vehicle, one prospect, consent
facts, and final confirmations. Do not expose submitter ID or source-details
fields in the public form. Do not add a broad address/contact-timing section;
require VIN as the vehicle identifier, use garaging ZIP as the precise
vehicle-location field, and ask for the primary driver's full legal name. The
public form should use one agreement checkbox that links to
`/auto-lead-intake/terms` for the precise submitter certifications and
factual-intake boundary.

The workflow must preserve the line between factual lead intake and licensed
insurance activity. The intake page should not quote, recommend coverage,
compare carriers, complete applications, bind coverage, or imply coverage is
available.

## Product Boundaries

- Do not use `tracysinsurnace.com` in customer-facing code, DNS, redirects,
  campaigns, or copy.
- Do not make `tracyzhang.com` a product catalog; it remains the advisor trust
  site.
- Do not duplicate separate product facts across local domains.
- Do not send SMS campaigns until A2P 10DLC and consent requirements are ready.
- Do not treat submitted auto leads as eligible until internal review accepts
  the lead under the then-current intake and quality procedures.
