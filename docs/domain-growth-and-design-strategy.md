# Insurance Domain Growth and Design Strategy

October 18, 2026

Use the domain portfolio to help people find a relevant local agency, trust the
team and reach the right office. Each destination should answer a different
customer need while sharing accurate business facts and reliable contact
workflows. The primary commercial outcome is a qualified insurance conversation;
page views and contact clicks explain how people reach it.

An interactive first-screen concept study is saved at
[`design-studies/domain-directions.html`](design-studies/domain-directions.html).
It compares four proposed compositions. It is not a deployed redesign; contact
treatments in the study are illustrative, and imagery is attributed in its
footer. The repository copy loads existing public images and Google Fonts.

The owner wants modern, bespoke presentation informed by strong existing
websites, different designs for different places, specialized local content and
public call, text and email actions. No consumer intake forms. Treat Apple's
presentation quality and Meta's commercial focus as creative references, not
claims that copying their appearance or buying ads produces results.

## Domain roles

| Domain | Role | Recommended treatment |
| --- | --- | --- |
| tracysinsurance.com | Approved primary agency address for Tracy's Insurance | Implement the coordinated brand and canonical-host release. Until that release, preserve the working redirect. Use campaign paths and UTMs. |
| tracyzhanginsurance.com | Current live canonical destination; future redirect | Move the shared product, guidance and regional library to the approved new host, then preserve old deep paths and query parameters with permanent redirects. |
| sanmarinoinsurance.com | Real San Marino office | A complete local destination with original office proof, local guidance and direct office contact. Maintain self-canonical local entry pages and link to the shared product library where useful. |
| lapalmainsurance.com | Real La Palma office | A distinct local composition with La Palma office proof, practical household and small-business journeys, and its own phone number. |
| alhambra-insurance.com | Alhambra community and campaign address | First develop a genuinely useful Alhambra page in the main site, then point the domain to it. Describe service from the San Marino office; there is no verified Alhambra office. A standalone indexed local surface comes later only if original content and real service value justify it. |
| tracyzhang.com | Tracy's personal reputation and introduction | Lead with portrait, role, team, languages and a clear explanation of how she helps. Route detailed coverage questions into the main insurance library. |
| go.tracyzhanginsurance.com | Campaign links | Use specific pages for the promise in the post, email or partner referral. Keep one domain/path/UTM register. The host currently serves the main app; campaign-specific routes are proposed work. |
| tracysinsurnace.com | Retired spelling mistake | Keep out of new marketing and visible navigation. No new traffic strategy is assigned to it. |

The live Cloudflare account also contains caliadu.ai, innocenceproject.ai,
purple-tech.org, saul-richardson.io and saulrichardson.io. Their purposes are
separate from insurance acquisition; do not fold them into an insurance link
network. The current account inventory does not prove it includes every domain
owned at other registrars.

Owning more domains is not a ranking strategy by itself. Google identifies
substantially similar city/domain pages funneling visitors elsewhere as a
doorway-abuse pattern. Make the two office destinations useful in their own
right, keep shared in-depth articles canonical and expand regional pages where
there is something substantive to say. [Google's search spam policies](https://developers.google.com/search/docs/essentials/spam-policies).

## Brand and design system

The owner wants to keep both the Tracy Zhang identity and the insurance brand,
with one clearly primary. The recommended hierarchy is **Tracy's Insurance** as
the main customer-facing agency brand and **Tracy Zhang & Team** as the people
behind it. The personal site introduces Tracy and leads into the agency's
services. Office destinations present Tracy's Insurance in San Marino or
La Palma, with their own local art direction and facts.

Use the agency identity consistently on future marketing, profiles and email
presentation, with Tracy's name supporting trust and personal recognition.
Retain the existing verified business identity and carrier relationship where
appropriate. This strategic hierarchy does not itself change a legal name,
carrier-managed listing, public mailbox or current website branding.

The preferred future main agency address is `tracysinsurance.com`.
`tracyzhang.com` remains the personal advisor address. The existing
`tracyzhanginsurance.com` site is still the live canonical destination today.
Once the brand presentation is ready, plan the canonical-domain migration with
path-preserving permanent redirects, metadata, sitemap, search and tracking
updates. Keep its established addresses working. Until then, the short-domain
redirect remains useful and operational.

### Clean pivot and business accounts

The owner explicitly accepts a hard pivot and says there is no valuable
content or account history in the Tracy Zhang Insurance identity to preserve.
Do not make a long parallel-brand period or historical-data migration a
requirement. Keep `tracyzhang.com` for Tracy's personal identity; make
Tracy's Insurance the agency identity across the new website, email and
business-account presentation.

The existing Google Workspace subscription now uses `tracysinsurance.com` as
its primary domain. The existing operator user was renamed to
`saul@tracysinsurance.com`, retaining the same mailbox and subscription. This
provides the new sign-in identity without creating a second paid organization.
Google documents eligibility and steps for
[changing the primary domain](https://knowledge.workspace.google.com/admin/domains/change-your-primary-domain-for-google-workspace).

Start with named accounts for the people actually operating the business.
`saul@tracysinsurance.com` is the active operator/admin address.
`hello@tracysinsurance.com` and `careers@tracysinsurance.com` are saved aliases
into that mailbox. They do not have separate sign-ins or paid seats.
`tracy@tracysinsurance.com` remains a proposed named account if Tracy needs one;
it has not been created. Confirm the need and license cost before adding seats.

Google verification, Gmail activation, SPF, DKIM and DMARC configuration are
complete. All three addresses received owner-controlled tests and sent replies
with passing SPF, DKIM and DMARC at the external recipient. Workspace's
organization name, alias sender names and signatures have been saved. The
first primary inbound test was classified as spam and corrected; this test
does not guarantee universal inbox placement. Existing Analytics, Search
Console, hosting and DNS access remains under the external Gmail owner.
User-level recovery inspection awaits Google's requested Admin sign-in. The
carrier-issued `tzhang@allstate.com` is a separate account and is not part of retiring the
custom-domain Workspace identity. The
[Workspace migration record](records/2026-10-18-workspace-brand-pivot.md)
tracks the completed settings and remaining checks.

Old custom-domain branding and public email can be retired once the new
identity works. Historical data import is optional, not a release dependency.
Temporary aliases and web redirects may be used where useful; they are not
requirements to keep the old brand active. No Workspace user, subscription or
domain registration has been deleted as part of this strategy update.

Build on the two current Next.js applications and shared packages. Reuse the
contact components, office facts, translations, routing and SEO contracts.
Develop reusable typography, spacing, accessibility and contact behavior while
giving each destination a different page composition, imagery and content order.
The differentiator is a real local office and team, presented with the care of
a premium consumer brand.

### Design directions

| Surface | Foundation and memorable element | Composition and palette | First-screen draft |
| --- | --- | --- | --- |
| Main insurance site | Minimalist and refined; a decisive typographic opening | Warm white, ink and restrained blue; strong type; customer situations followed by concise explanations and real proof | Insurance decisions. A local team to talk them through. |
| San Marino | Editorial; a large local photograph beside a precise service statement | Warm ivory, deep green, understated brass; serif display and clean body; office details appear as part of the story | A local team for the things you have built. |
| La Palma | Swiss and practical; a clear typographic service index | White, deep navy and fresh green; split composition; everyday changes and business requests precede broader product depth | A new car. A changed renewal. Let's talk. |
| Tracy personal site | Editorial portrait; a substantial authentic image of Tracy and team | Warm neutral surfaces, oversized name, compact biography; direct contact remains visible | Meet Tracy. Know who you are calling. |
| Alhambra community page | Editorial field guide; original neighborhood and business context | Focused articles and practical local questions; clear San Marino service attribution | Insurance help for Alhambra households and businesses. |

These are content and design hypotheses, not claims about neighborhood demand.
Do not infer income, family structure, insurance needs or language from someone's
ethnicity or address. Use search evidence, actual customer questions and the
office's supported services to choose emphasis.

### Reference method

Start each page with a reference sheet: three real pages, desktop and mobile
captures, the specific pattern worth borrowing and an adapted composition.

- [Apple](https://www.apple.com/iphone/): use clear hierarchy, focused sections
  and deliberate visual emphasis. Adapt those principles around people and
  service rather than copying product imagery or lengthy launch-page motion.
- [Linear](https://linear.app/): study typography, navigation and interface
  restraint. Translate the precision into a warmer agency context.
- [Stripe](https://stripe.com/): study how complex offerings become navigable
  customer paths with relevant evidence. Keep the insurance explanation
  readable and specific.

Reuse existing project components first. Where a purchased template or
component saves work, select one licensed for the actual implementation and
adapt its structure into the current stack. A template purchase is a separate
expense; no library or theme was bought for this strategy. Preserve source and
license notes. Reference sites provide inspiration, not reusable proprietary
assets or source code.

Use a limited display/body type system with a compatible Chinese typeface.
Choose exact fonts in the design study after checking language coverage and
licensing. Establish shared spacing, contrast, focus states and contact controls.
Vary layout and art direction instead of building unrelated technical systems.
Motion should explain a transition or hierarchy, respect reduced motion and
never hide the phone number while loading.

## Trust and contact experience

Within the first screen, visitors should understand the service area, who will
help, whether their language is supported and how to reach the office. Put one
dominant Call action beside secondary Text and Email actions. Keep a compact
mobile contact bar clear of page content and accessibility controls.

Use real team portraits, office exterior/interior photographs, recognizable
entrance and parking information, and verified hours. Distinguish community
photography from agency premises. Existing city imagery can support the
concepts with its required attribution; original office photography should
carry the final trust story.

Place relevant, permissioned customer feedback near the question it helps
answer. Preserve the source and date of any rating and avoid combining counts
from different platforms. Do not invent testimonials, response times or savings
promises. Present reviews and useful explanations as evidence, not decorative
star widgets.

Explain the first conversation plainly: tell us what changed or what help you
need; the team identifies what information is needed and the next step. Do not
promise availability, eligibility, a carrier placement or a quote before the
case is reviewed. Existing customers should have an obvious service route so
their calls do not get mistaken for new acquisition.

The destination must show the appropriate office number: San Marino
(626) 300-8338; La Palma (562) 402-4375. Shared website email currently remains
`tzhang@allstate.com`. `hello@tracysinsurance.com` is now configured and tested;
update the shared public contact value during the coordinated brand release.
Keep the separate carrier mailbox intact.

## Local content and discovery

Begin with serviceable topics and concrete questions, not a page per keyword.

| Market | Initial content hypotheses | Evidence required before publishing |
| --- | --- | --- |
| San Marino and nearby SGV | Home and auto reviews; changes at renewal; umbrella discussions; finding the office; explaining what to bring to a coverage conversation | Actual office questions, supported services, current search queries and original office photographs |
| La Palma and nearby Cerritos | Adding a driver or vehicle; condo and renters questions; household renewal changes; small-business certificates and documents | Office service capability and case questions; correct La Palma contact routing |
| Alhambra | Local household and small-business questions; how nearby San Marino service works; English and reviewed Chinese guidance | Original community examples or partnerships, useful local detail and clear office attribution |
| Irvine | Family, condo, business and language-service topics selected from observed demand | Ability to serve the inquiry, query/campaign evidence and genuinely useful regional content; no invented local office |
| San Diego | A smaller test of relevant regional questions with remote-service expectations stated clearly | Service capability, measurable inquiry quality and a responsible response process |

These priorities build outward from the existing offices; they are not verified
city-by-city demand or conversion rankings. Publish a small set of strong pages
first and expand what produces useful conversations.

English and Simplified Chinese already have a technical foundation. Improve
their actual usefulness, native readability and question coverage. Plan
Traditional Chinese or additional languages around real staffing and editorial
review. Spoken-language service and translated website coverage are different
claims. Asian communities across Southern California are not one language or
one customer segment.

For each substantial topic, prepare a reviewed website explanation, a short
social version and a direct contact path to the relevant office. Add real local
relationships and partner referrals where they exist. Use descriptive titles,
author/reviewer identity, current information, canonical URLs, language
alternates and appropriate structured data.

Maintain the two real Google Business Profiles and verify the other important
directories. Accurate profiles, photos, reviews and local references complement
the website. Distance remains part of local search; an Irvine page alone will
not make a San Marino office physically nearby. [Google's local ranking guidance](https://support.google.com/business/answer/7091?hl=en).

## Visibility and measurement

Treat observability as both public discoverability and the ability to understand
what happens after discovery. The operating view should answer six questions:

| Stage | Measure | Decision it supports |
| --- | --- | --- |
| Found | Search impressions, useful non-brand queries, intended pages indexed and profile discovery | Which local topics and language surfaces deserve work? |
| Visited | Landing page, hostname, source/medium, campaign and language | Did the visitor reach the page matching the promise? |
| Contact intent | Unique sessions with phone_click, sms_click or email_click; intent rate by landing page | Is the page creating an understandable next step? |
| Reached | Answered and missed calls, conversations started and response time | Are we losing interest after the website does its job? |
| Qualified | New insurance inquiries that the agency can appropriately work; service calls tracked separately | Which sources create useful acquisition work? |
| Business outcome | Quotes, bound business and cost per outcome where attributable | Where should time and money go next? |

GA4 already has the three contact key events registered, 14-month event
retention, a main Search Console link and cross-domain configuration for the
four existing content domains. Live contact-event receipt and cross-domain
journeys still need verification. The new short domain redirects before page
measurement; no duplicate tracking site is required for it.

Audit event parameters before adding more tags. Use consistent office, market,
language, service interest and CTA-placement dimensions where a decision needs
them. Register needed custom dimensions. Do not send customer email addresses,
phone numbers, policy identifiers or known-contact tokens to GA. Retain the
customer-level follow-up relationship in the agency's appropriate internal
system instead.

Website clicks cannot establish that a call connected, and copied phone numbers
or direct dial calls can bypass click events. Begin with aggregate phone-system
results and a simple source/outcome log. If call attribution becomes a real
decision gap, evaluate call tracking and number insertion while preserving
consistent office identity. Buying a tracking service or recording calls is
not part of this plan's first release.

Use UTMs on deliberate social, email, partner and QR links; do not add them to
ordinary internal navigation. Document naming and avoid redundant campaign
names for the same initiative. Keep test activity distinguishable from prospects.
Small current volumes favor clear sequential improvements and direct call
feedback over declaring A/B winners from a few clicks.

## Delivery sequence

1. Prepare a reference board and three clearly different first-screen studies:
   San Marino, La Palma and Tracy. Capture desktop and mobile compositions.
   Label draft copy and distinguish concept imagery from final photographs.
2. Complete the office/brand asset kit: current portraits, office photographs,
   entrance/parking details, hours, language availability, brand usage and
   attributable customer proof. Verify the phone/text/email destinations.
3. Build and release San Marino first using existing source and shared behavior.
   Review the entire journey from a search or campaign link to a real office
   interaction. This proves the shared design and measurement foundation.
4. Release La Palma with its own composition and content, then refine Tracy's
   profile. Publish the first Alhambra guide and point its existing domain at
   that destination once useful content is ready.
5. Expand topic and language depth and test Irvine, then San Diego against
   service capability and actual inquiry quality. Choose the next geography
   from evidence rather than buying more domains by default.

A working target is one week for design studies and assets, the following two
weeks for a first local release and measurement validation, and the subsequent
month for the second office and the initial community content. This depends on
access, real photography and review capacity; it is a proposed sequence, not a
committed launch schedule or traffic forecast.

Before each public release, verify accurate office identity, contact actions,
no consumer forms, language/canonical behavior, responsive layout, keyboard
use, readable contrast and load behavior. Use current Core Web Vitals guidance
and representative mobile testing to set performance acceptance criteria.
Keep deployment rollback and previous source available. Record changes so a
future agent can inspect the customer journey and operating evidence without
reconstructing the conversation.

Review performance weekly and choose one improvement tied to a known gap.
Agent workflows can collect evidence, prepare content and recommend changes;
humans supply case knowledge, verify business claims and control business
actions as required by the workflow. A polished website is the front door to
that operating system, not a substitute for answering and following up.
