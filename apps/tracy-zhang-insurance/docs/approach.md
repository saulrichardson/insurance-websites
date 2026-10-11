# Tracy Zhang Insurance Approach

App: `apps/tracy-zhang-insurance`

This is the canonical insurance, local acquisition, lead capture, and campaign
website for Tracy Zhang Insurance.

## Stack

- frontend: Next.js App Router, React 19, TypeScript, Tailwind CSS
- runtime: Vercel serverless route handlers
- admin auth: server-side session auth in `/admin/leads` page/actions
- shared packages: domain data, lead capture, and UI primitives under
  `packages/`
- database: Postgres/Neon through `DATABASE_URL`
- notification: Resend through `RESEND_API_KEY`
- analytics: Vercel Analytics, Vercel Speed Insights, optional GA4 through
  `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- SEO: centralized route/product metadata in `src/lib/seo.ts`, JSON-LD helpers
  in `src/lib/schema.ts`, reciprocal English/Simplified Chinese alternates, and
  content-owned internal links between products and guidance
- hosting: Vercel
- DNS: Cloudflare-managed where zones exist
- package manager: `pnpm@10.23.0` from the repo root
- runtime target: Node.js 24.x
- deploy dependency policy: exact app dependency versions, with root `pnpm`
  settings, root Node engine, and root `pnpm-lock.yaml` copied into the staged
  Vercel package
- build command: `next build --webpack`

## Domains

- `tracyzhanginsurance.com`: canonical statewide insurance site
- `www.tracyzhanginsurance.com`: same public site
- `go.tracyzhanginsurance.com`: campaign landing/tracking surface
- `sanmarinoinsurance.com`: local San Marino acquisition surface
- `lapalmainsurance.com`: local La Palma acquisition surface

`tracysinsurnace.com` is retired and must not be configured or used.

Current Vercel deployment uses the existing project currently named
`san-marino-insurance`. That project has production aliases for
`sanmarinoinsurance.com`, `www.sanmarinoinsurance.com`,
`lapalmainsurance.com`, `www.lapalmainsurance.com`,
`tracyzhanginsurance.com`, `www.tracyzhanginsurance.com`, and
`go.tracyzhanginsurance.com`.

`tracyzhanginsurance.com`, `sanmarinoinsurance.com`, and
`lapalmainsurance.com` are Cloudflare-managed zones. Apex and `www` should
remain DNS-only `A` records to `76.76.21.21` unless the Vercel project is moved
to Vercel nameservers. The `go.tracyzhanginsurance.com` campaign host should be
a DNS-only CNAME to Vercel's assigned target for the alias.

Each of those three domains also has a root Google Search Console verification
TXT record in Cloudflare. Keep those records unless Search Console ownership is
intentionally moved to a different account or verification method.

## Key Routes

- `/`
- `/products`
- `/contact`
- `/locations`
- `/locations/san-marino`
- `/locations/la-palma`
- `/locations/cerritos`
- `/stories`
- `/stories/[slug]`
- `/auto-lead-intake`
- `/auto-lead-intake/terms`
- `/privacy`
- `/terms`
- `/sms-terms`
- `/contact-consent`
- `/api/leads` retired; returns `410 Gone` for public quote submissions
- `/api/visitor-events`
- `/api/auto-leads`
- `/admin/leads` session-protected lead inbox
- `/admin/contact-capture` session-protected visitor identity ledger
- `/admin/auto-leads` session-protected auto lead review

Product routes include auto, home, condo, renters, life, umbrella, business,
motorcycle, ATV, boat, FAIR Plan, and California property guidance.

Simplified Chinese public routes live under `/zh/` and are served by
`src/app/zh/[[...slug]]/page.tsx`. They cover the homepage, products, product
detail pages, contact, locations, about/team, legal/consent pages, and guidance
stories. The Chinese pages use `zh-Hans` metadata alternates, self-canonical
Chinese URLs, and the same direct contact paths with localized labels. New
English stories or public content should not silently appear under `/zh` in
English; add reviewed Chinese content before treating the localized route as
production-ready.
Chinese contact pages use the same direct call, text, email, and schedule paths
as English pages; they should not reintroduce the retired quote form.

The header language switcher should remain a normal localized link, not a
client-side translation widget. It preserves query strings and hash fragments
so visitors can switch language while staying in the same page context. The
visible label should show the current locale only.

Every current indexable English route should publish explicit `en-US`,
`zh-Hans`, and `x-default` alternates when a real Chinese equivalent exists.
Utility or conversion-completion routes that are not localized, such as
`/thanks`, should not invent hreflang alternates. Chinese routes should emit
Chinese WebPage/Breadcrumb schema centrally from the `/zh/[[...slug]]` route;
English product pages should emit Service and Breadcrumb schema through the
product decision guide; English stories should emit Article and Breadcrumb
schema from their story page.

LLM translation support is a repo-level drafting workflow, not a production
request path. Use `pnpm i18n:translate --id <id> ...` to store draft
translations under `content/translations/<locale>/`, then run
`pnpm i18n:check` before deployment. The deployed insurance app should keep
serving committed Chinese content without requiring `OPENAI_API_KEY`.

Guidance stories live in `src/content/stories.ts`. Story entries can include an
optional hero image and inline image sections. Store story-specific web assets
under `public/story-images/` with stable descriptive filenames so article pages,
story cards, Open Graph metadata, and sitemap-discoverable routes can share the
same source-of-truth content.

Story entries also own `relatedProductIds`. This is the source for story-to-
product internal links and Article `about` schema. Product-to-product links
come from the shared domain product graph, not per-page one-off arrays.

Public email and scheduling links are shared domain facts. Use
`publicContact` from `packages/domain` through the app site config and contact
action components; do not place independent `mailto:` or Calendly URLs in page
content. High-value surfaces should expose call, schedule, email, and quote
paths with localized labels where applicable.

Homepage guidance should not rely only on the header nav or a generic
button-style link. The canonical and local homepages should expose the latest
story through an editorial coverage-note object near the first screen, then use
the lower guidance section as an archive/related-reading surface.

Carrier market names live in `packages/domain/src/index.ts` as
`carrierMarkets`. The public site may lead with Allstate relationship proof, but
should describe other carriers as additional markets or specialty access when
appropriate rather than implying every carrier is available for every risk. The
header carrier presentation should avoid visible horizontal scrolling controls;
use grouped, wrapping names instead of an overflow rail.

## Homepage Rendering Model

`src/app/page.tsx` is host-aware through `getRequestMarket()`.

- Canonical hosts render the statewide homepage with the coverage atlas,
  broad product lanes, guidance, and direct contact flow.
- Local hosts render a local-office homepage with city headline, nearest
  office board, local proof points, service area, and market-specific product
  merchandising.
- Local hosts also render host-aware header, footer, structured data, contact,
  location, and quote-form office selection. Those surfaces should show only
  the active city office and should not mention the other office.
- Local hosts use market-specific imagery from `/public/city-images` with
  attribution stored in `packages/domain/src/index.ts`.
- Local place imagery should use the actual image and place name as the visual
  proof. Avoid explanatory overlay sentences such as why the landmark matters;
  attribution belongs in the footer, not inside the image.
- The canonical insurance domain publishes the full sitemap. Local domains
  publish only their local homepage in `sitemap.xml` and their homepages use
  self-canonical metadata, so Google can discover the city surfaces without
  duplicating the full product catalog across domains.

Do not make San Marino or future La Palma domains separate brands. Do make
their homepages feel materially different from the canonical statewide domain.
Because the root layout resolves the request host, the app routes render
dynamically on Vercel.

## Configuration

- `NEXT_PUBLIC_SITE_URL`: canonical URL, defaults to
  `https://tracyzhanginsurance.com`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: optional GA4 measurement ID
- `DATABASE_URL`: Postgres connection string
- `RESEND_API_KEY`: Resend email API key
- `LEADS_TO_EMAIL`: comma-separated notification recipients
- `LEADS_FROM_EMAIL`: verified Resend sender
- `LEADS_EMAIL_SUBJECT_PREFIX`: optional notification subject prefix
- `AUTO_LEADS_TO_EMAIL`: optional comma-separated recipients for
  auto lead notifications; falls back to `LEADS_TO_EMAIL`
- `AUTO_LEADS_EMAIL_SUBJECT_PREFIX`: optional auto lead notification subject
  prefix
- `IDENTITY_RESOLUTION_ENDPOINT`: optional server-side webhook used to resolve
  unknown website visitors into contact candidates
- `IDENTITY_RESOLUTION_PROVIDER`: optional label for the identity provider;
  defaults to `generic_webhook` when an endpoint is configured
- `IDENTITY_RESOLUTION_API_KEY`: optional bearer token sent to the identity
  provider webhook
- `IDENTITY_RESOLUTION_MIN_ACCEPTED_CONFIDENCE`: optional match-confidence
  threshold, defaulting to `0.1`
- `ADMIN_USER`: admin basic-auth username
- `ADMIN_PASS`: admin basic-auth password

Production currently has `DATABASE_URL`, `ADMIN_USER`, `ADMIN_PASS`,
`NEXT_PUBLIC_GA_MEASUREMENT_ID`, `LEADS_TO_EMAIL`, `LEADS_FROM_EMAIL`, and
`RESEND_API_KEY` configured. Lead email notification is live through Resend
using `Tracy Zhang Insurance <leads@tracyzhanginsurance.com>`.

The Resend sending domain `tracyzhanginsurance.com` is verified with DNS records
in Cloudflare:

- `resend._domainkey.tracyzhanginsurance.com` TXT for DKIM
- `send.tracyzhanginsurance.com` MX to `feedback-smtp.us-east-1.amazonses.com`
- `send.tracyzhanginsurance.com` TXT for SPF

## Search Icon

The public search/browser icon should be served from stable public asset URLs,
not Next's app-folder `favicon.ico` convention. Keep `/icon.png`,
`/apple-touch-icon.png`, and `/favicon.ico` in `public/`, and keep the root
metadata declaring them. This prevents deploy-hashed favicon links and makes
the search favicon easier for Google to crawl and retain.

The current insurance icon is a tightly cropped raster mark generated from the
approved local source image
`/LOCAL_OWNER/Downloads/Gemini_Generated_Image_6ddrxz6ddrxz6ddr.png`.
The canonical cropped source is kept at `/tz-logo-cropped.png`; the web icon
served to crawlers is `/icon.png`.

## Verification

From the repo root:

```bash
pnpm install --frozen-lockfile
pnpm lint:tracy-zhang-insurance
pnpm build:tracy-zhang-insurance
pnpm test
```

After DNS/deployment changes, smoke-check each attached domain and verify the
direct contact paths. Do not submit test quote leads through `/api/leads`; the
public quote submission endpoint is retired.

Lead-flow observability:

- `/api/visitor-events` captures first-party public visit/source context and
  invokes the identity-resolution layer after the visit is stored.
- Known-contact campaign URLs use a `ct`, `cid`, `contact_token`,
  `identity_token`, or `trk` query parameter. The browser persists the newest
  token in first-party storage, sends it with visitor events, and the server
  matches it against `known_contact_tokens` by SHA-256 hash.
- Unknown visitors create `identity_resolution_requests`. If
  `IDENTITY_RESOLUTION_ENDPOINT` is configured, the route posts visit context to
  that webhook and stores returned person/household/company matches in
  `identity_matches`, `contacts`, `contact_identities`, `contact_addresses`,
  `contact_sources`, and `contact_events`. If no endpoint is configured, the
  request is stored as `skipped` with provider `not_configured`.
- Use
  `pnpm --filter @insurance-websites/tracy-zhang-insurance identity:create-token -- --name "Jane Example" --email jane@example.com --label july-campaign --base-url https://tracyzhanginsurance.com/`
  to create a hashed known-contact token and print a campaign URL containing
  the raw token exactly once.
- `/admin/contact-capture` shows provider status, recent resolution attempts,
  and resolved contact matches for operator review.
- `/api/leads` remains in the codebase for historical/admin compatibility but
  returns `410 Gone` and must not send Resend notifications while retired.
- Historical lead/admin tables remain available for previous records. Do not
  wholesale delete them without an explicit migration and archival plan.

Auto lead intake:

- `/auto-lead-intake` is an unlisted, noindex intake surface for approved lead
  sources. It is not a consumer quote form and is not in the sitemap.
- `/api/auto-leads` is the public API implementation for the intake form.
- The database tables are `auto_leads` and `auto_lead_events`. The lead
  migration renames the earlier table and column names in place when they
  exist, then the runtime uses only the current names.
- `/admin/auto-leads` is the internal review surface. Accepted lead status can
  calculate fee eligibility from accepted non-revoked lead count. Submitted,
  rejected, duplicate, invalid, revoked, or not-interested leads do not count
  toward the ladder.
- The public intake page should use external language: auto lead, submitter,
  prospect, vehicle, consent, and review. Avoid visible terms such as
  contractor, agency, module, Qualified Lead Fee, or internal payment logic on
  the intake surface, and do not use those legacy terms for current source
  files, routes, API names, or persistence names.
- The public submitter setup should ask only for submitter name and email. Do
  not expose a submitter ID field or source-details drawer. The API derives the
  internal submitter key from the email, and campaign/source attribution should
  come from URL/query parameters, UTM fields, referrer, and request metadata.
- Do not add a public address/contact-timing drawer to the intake form.
  Garaging ZIP is the precise location field for the vehicle; prospect address,
  preferred contact time, and public source URL fields should stay out of the
  first version unless a concrete production workflow requires them.
- VIN is required for public auto lead submissions. Year, make, and model can
  help review, but they are not a substitute for VIN. The primary driver field
  should ask for the full legal name.
- Use one public agreement checkbox on the intake form. Keep the exact
  submitter certifications and factual-intake boundary on
  `/auto-lead-intake/terms`, which should remain noindex.
- The first version captures source/campaign context from URL and request
  metadata without asking the submitter for source or proof details. It does
  not upload files or create submitter accounts yet.

Search discoverability checks after SEO or domain changes:

```bash
pnpm seo:check
curl -A 'Googlebot/2.1 (+http://www.google.com/bot.html)' -sSI https://tracyzhanginsurance.com/sitemap.xml
curl -A 'Googlebot/2.1 (+http://www.google.com/bot.html)' -sSI https://sanmarinoinsurance.com/sitemap.xml
curl -A 'Googlebot/2.1 (+http://www.google.com/bot.html)' -sSI https://lapalmainsurance.com/sitemap.xml
curl -sS https://tracyzhanginsurance.com/robots.txt
curl -sS https://sanmarinoinsurance.com/robots.txt
curl -sS https://lapalmainsurance.com/robots.txt
```

For Chinese discoverability, also verify:

```bash
curl -sS https://tracyzhanginsurance.com/zh/
curl -sS https://tracyzhanginsurance.com/zh/auto-insurance
curl -sS https://tracyzhanginsurance.com/sitemap.xml | grep 'hreflang="zh-Hans"'
curl -sS https://sanmarinoinsurance.com/zh/
curl -sS https://lapalmainsurance.com/zh/
```

As of 2026-06-07, all three sitemaps are submitted in Search Console. The
immediate Search Console table status showed `Couldn't fetch` for the submitted
sitemaps while direct requests returned HTTP 200 `application/xml`, so treat
that as a Google processing state unless it persists after a later recheck.

The next SEO layer is operational measurement, not more page cloning. At a high
level, the team should recheck Search Console sitemap/indexing status, request
indexing for the highest-value canonical/local/Chinese URLs, review queries by
brand, city, product, guidance topic, and Chinese-language intent, then improve
stored content, metadata, internal links, local profile data, or conversion
tracking where production evidence shows a gap. Keep Baidu or other
China-focused search work as a separate market decision; for Chinese-speaking
California shoppers, first prove the current Google/local-search surfaces are
indexed and converting.

The executable SEO contract lives at `scripts/seo/check-contracts.mjs`. It
derives product and story expectations from source data, then validates rendered
HTML/sitemaps for canonicals, reciprocal `zh-Hans` alternates, JSON-LD types,
related product links, noindex utility pages, and local-domain office isolation.
Keep future layout changes compatible with that contract instead of weakening
the checker to match a broken page.

## Deployment

Deploy through the existing Vercel project currently named
`san-marino-insurance` from a staged root-level deploy directory:

```bash
node scripts/stage-tracy-zhang-insurance-vercel.mjs
cd /tmp/tracy-zhang-insurance-vercel
pnpm install --frozen-lockfile
pnpm build
vercel deploy --prod --yes --archive=tgz --force --scope saulrichardsons-projects
```

The staging script copies only the app and required shared packages, excludes
local env/build output, writes the root `pnpm` settings and Node engine into the
deploy package, copies the root `pnpm-lock.yaml`, then derives a staged lockfile
offline for the app-at-root package shape. Keep this path deterministic; do not
let production installs float framework patch versions beyond the versions
verified locally.

After production deploys, confirm aliases with:

```bash
vercel alias list --scope saulrichardsons-projects
```

Do not use the nested-app `vercel build --prebuilt` flow for this app right
now. It has failed on Vercel's pnpm workspace tracing/output packaging path.
The public app also intentionally avoids Next middleware/proxy; the admin gate
belongs in server-side page/action code.
