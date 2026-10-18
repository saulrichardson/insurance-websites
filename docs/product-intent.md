# Product Intent

This file communicates what the insurance website portfolio is trying to become.

Use app-local `docs/product-intent.md` files for site-specific positioning,
workflows, and open product questions.

## North Star

Build and maintain a coherent Tracy's Insurance web portfolio that can
support public trust, local SEO, campaign traffic, consented lead capture, and
future email/SMS operations without fragmenting into scattered brands. The
canonical insurance app should also support visitor contact capture for
campaign and outreach traffic without depending on a public quote-request form.

The repo should make it easy to:

- keep the canonical insurance identity explicit
- tailor local market surfaces without duplicating product facts
- preserve advisor trust on `tracyzhang.com`
- verify each website independently
- preserve domain, lead capture, deployment, and operational context near the
  code that uses it
- share domain data, product taxonomy, lead capture, consent copy, and UI
  primitives through packages
- make the public sites discoverable and usable for Chinese-speaking California
  insurance shoppers who may not search or browse primarily in English

## Current Online Presence Direction

The owner approved **Tracy's Insurance** as the main agency brand and
`tracysinsurance.com` as its canonical address on October 18, 2026.
Keep `tracyzhang.com` for Tracy's personal advisor identity. Workspace email now
uses the new domain and primary/alias delivery has been tested. Both websites
now publish the new agency brand, public hello mailbox and canonical links.
The old agency domain permanently redirects to the new host. See the
[website migration record](records/2026-10-18-website-brand-domain-migration.md)
and the
[email and ownership verification record](records/2026-10-18-email-delivery-and-service-ownership.md).

The owner clarified on October 18, 2026 that public acquisition should use
call, text, and email, with no consumer intake forms. Make these direct actions
prominent on both apps and preserve the correct office phone on local domains.
Existing appointment links remain secondary contact options. The unlisted
referral intake and historical lead records are separate existing workflows;
this direction does not authorize removing them or changing their data.

The long-term audience includes Asian communities across Southern California,
including Irvine and San Diego. Develop useful regional content and community
relationships through the shared insurance app. Publish language-service claims
only where the office can support them. Prioritize accurate office information,
search discovery, reputation, useful content, and measurable direct inquiries.
The older engagement examples below are background, not instructions to add
public quote forms or infer consent from a website visit.

The owner also wants modern, bespoke designs inspired by strong existing
websites, with genuinely different compositions for different places. Reuse
the current applications and shared behavior while varying imagery, layouts
and relevant local content. Treat public discoverability and the ability to
measure qualified conversations as connected goals. The proposed delivery
plan is in `domain-growth-and-design-strategy.md`.

## Intended Product Shape

This is a monorepo for customer-facing insurance websites and shared operating
logic.

The completed unit of value is a working website app with documented product
intent, clear routing, lead-capture behavior, local verification commands, and
deployment notes.

## Who It Serves

- insurance customers who need coverage information, office details, quote
  requests, and contact paths
- agency operators who need campaign-ready lead capture and admin review
- developers and coding agents who need to update sites without relying on chat
  history
- future marketing systems that need consistent attribution and consent records

## Current Apps

- `apps/tracy-zhang-insurance`: canonical insurance, local acquisition,
  campaign, lead capture, and admin app for `tracysinsurance.com`,
  `sanmarinoinsurance.com`, and `lapalmainsurance.com`.
- `apps/tracy-zhang`: Tracy Zhang advisor profile, office, and contact site for
  `tracyzhang.com`.

## Shared Packages

- `packages/domain`: brand, offices, products, market profiles, domains, and
  retired-domain rules.
- `packages/lead-capture`: lead validation, consent copy, and notification text.
- `packages/ui`: shared UI primitives used across apps.

## Product Qualities

- Clear app boundaries
- One customer-facing insurance identity
- City-specific merchandising without cloned websites or same-looking homepages
- Distinct visual roles: statewide insurance command center, local office
  acquisition surface, and Tracy advisor dossier
- First-class Simplified Chinese discovery paths that preserve those same site
  roles instead of cloning brands or codebases
- Real lead persistence before campaign traffic
- Visitor/session attribution and identity-resolution records for campaign
  traffic that can produce outbound-ready contacts when a known token or
  configured provider identifies the visitor
- Consent and compliance copy treated as source-of-truth artifacts
- Minimal hidden local assumptions
- Independent verification per app

## Near-Term Engagement Direction

The immediate growth objective is not to build an autonomous agentic insurance
system or a full CRM. The near-term priority is to get the minimum production
building blocks in place so one-off campaigns and lead distribution can run
cleanly, be measured, and be improved without manual chaos.

The production minimum is:

- Resend audience/campaign readiness for email-first outreach
- real mailbox routing for replies and producer follow-up
- simple import path for policy/account exports and third-party lead files
- enough consent, unsubscribe, and source attribution to know who may be
  contacted and why
- campaign and UTM capture across public websites
- known-contact token links and a provider hook that can resolve campaign
  visitors into contact records when available
- admin visibility into imported leads, assignments, follow-up status, and
  outcomes

Business rules should stay configurable until production data and campaign
requirements make them concrete. Do not hardcode segment definitions, producer
assignment rules, provider assumptions, or cross-sell logic into the app before
the actual data shape and operating policy are known.

AI should be used first as a campaign production and operations assistant:
drafting campaign variants, summarizing lead context, suggesting follow-up
segments, preparing reply drafts, and helping operators string together
campaigns. Autonomous inbound/outbound AI conversations are a later capability,
not the next implementation target.

The first likely campaign workflows are examples to support, not fixed rules to
hardcode:

- existing-customer cross-sell, especially customers with home/property coverage
  but no auto line visible in the imported book of business
- third-party lead intake, basic deduplication, consent/source review, and
  assignment to internal producers

Avoid building generalized engagement infrastructure until a campaign or lead
distribution workflow needs it in production.

## Open Questions

- Which CRM, if any, should receive synced leads after the internal admin inbox
  proves the flow?
- Which export or system will provide policy/account-line data for
  home-without-auto segmentation?
- Which third-party lead providers will be imported first, and what consent
  evidence do their payloads provide?
- When should Twilio A2P 10DLC registration move from readiness to live SMS
  sending?
- Which additional local acquisition domains are worth buying only after local
  content depth exists?
