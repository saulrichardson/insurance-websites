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
- `/api/leads`
- `/api/auto-leads`
- `/admin/leads` session-protected lead inbox
- `/admin/auto-leads` session-protected auto lead review

Product routes include auto, home, condo, renters, life, umbrella, business,
motorcycle, ATV, boat, FAIR Plan, and California property guidance.

Simplified Chinese public routes live under `/zh/` and are served by
`src/app/zh/[[...slug]]/page.tsx`. They cover the homepage, products, product
detail pages, contact, locations, about/team, legal/consent pages, and guidance
stories. The Chinese pages use `zh-Hans` metadata alternates, self-canonical
Chinese URLs, and the same lead backend/forms with localized labels. New
English stories or public content should not silently appear under `/zh` in
English; add reviewed Chinese content before treating the localized route as
production-ready.

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
  broad product lanes, guidance, and quote request flow.
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
`/Users/saulrichardson/Downloads/Gemini_Generated_Image_6ddrxz6ddrxz6ddr.png`.
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

After DNS/deployment changes, smoke-check each attached domain and submit one
test lead with a test inbox before launching campaigns.

Lead-flow observability:

- `/api/leads` emits structured JSON logs for receipt, validation failures,
  storage, Resend notification success/failure, and event-recording failures.
  Logs should include request/trace id, duration, source domain/path, campaign
  fields, product interest, and status without logging lead message content.
- The quote form tracks `form_start`, `lead_submit_attempt`, `generate_lead`,
  and `lead_error` through Vercel Analytics and GA4 when configured.
- Resend delivery ids are stored in lead event metadata when available. Keep
  `lead_events.metadata` as queryable JSON objects, not JSON strings.

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
