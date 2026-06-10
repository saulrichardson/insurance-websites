# Tracy Zhang Approach

App: `apps/tracy-zhang`

This is Tracy Zhang's advisor profile, office, and contact website for
`tracyzhang.com`.

## Stack

- frontend: Next.js App Router, React 19, TypeScript, Tailwind CSS
- UI dependencies: `lucide-react`
- analytics: Vercel Analytics, Vercel Speed Insights, optional GA4 through
  `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- structured data: `Person` and office `InsuranceAgency` JSON-LD
- hosting: Vercel
- domains: `tracyzhang.com`, `www.tracyzhang.com`
- package manager: `pnpm@10.23.0` from the repo root
- runtime target: Node.js 24.x
- dependency policy: exact package versions resolved by the root
  `pnpm-lock.yaml`
- build command: `next build --webpack`

## Marketing Frame

The site should sell the value of starting with Tracy, not explain the mechanics
of the web properties.

- First viewport: Tracy Zhang, local advisor serving California.
- Core promise: clear insurance guidance before a policy decision.
- Proof: local offices, direct phone line, languages, Allstate review context.
- Paths: household coverage, life changes, property questions, business
  deadlines, higher liability exposure.
- Primary CTA: get insurance help through Tracy Zhang Insurance.
- Secondary CTA: call Tracy directly.

Avoid visible copy that describes the website architecture, internal referral
mechanics, or Tracy as a backstage operator instead of a customer-facing
advisor.

## Visual Model

The homepage uses a personal advisor dossier pattern:

- large Tracy-name signal
- compact portrait/contact panel instead of a hero product collage
- direct phone path and review/language proof in the first screen
- customer moments that route into Tracy Zhang Insurance rather than local
  product-card duplication

Preserve this separation when improving copy or layout.

## Important Directories

- `src/app/page.tsx`: advisor homepage, coverage moments, office proof
- `src/components/site-header.tsx`: top navigation and insurance-help CTA
- `src/components/site-footer.tsx`: office, phone, product, and profile links
- `src/components/site-telemetry.tsx`: Vercel/GA4 telemetry
- `src/lib/site.ts`: Tracy, office, image, review, and contact data
- `src/lib/schema.ts`: structured data
- `docs/`: product intent and operating notes for this app

## Key Public Routes

- `/`: advisor profile homepage
- `/zh`: Simplified Chinese advisor profile homepage
- `/#approach`: working style and decision context
- `/#coverage-help`: common coverage moments
- `/#offices`: offices and direct phone paths

Product-depth needs route through explicit homepage, header, and footer links
to Tracy Zhang Insurance. The app does not carry old product, quote, career, or
location routes and does not preserve app-level redirects for them.

## Configuration

- `NEXT_PUBLIC_SITE_URL`: canonical site URL
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: optional GA4 measurement ID

The personal site has no quote, career, database, or file-upload backend. Product
depth, lead capture, compliance copy, and quote intake are owned by
`apps/tracy-zhang-insurance`.

Production Vercel env for this app should only contain frontend/runtime values
the current source uses. The expected production env keys are
`NEXT_PUBLIC_SITE_URL=https://www.tracyzhang.com` and
`NEXT_PUBLIC_GA_MEASUREMENT_ID`; legacy database, admin, S3, quote, and careers
env vars do not belong on this project. The apex host redirects to `www`, so the
personal site's metadata, robots, and sitemap should also canonicalize to
`https://www.tracyzhang.com`.

## Search Icon

The public search/browser icon should be served from stable public asset URLs,
not Next's app-folder `favicon.ico` convention. Keep `/icon.png`,
`/apple-touch-icon.png`, and `/favicon.ico` in `public/`, and keep the root
metadata declaring them. This prevents deploy-hashed favicon links and makes
the search favicon easier for Google to crawl and retain.

The personal site uses the same approved Tracy Zhang Insurance crest as the
portfolio-wide brand mark in browser icons and compact header/footer marks.
Do not replace Tracy's portrait with the crest; the portrait remains personal
proof, while the crest is the identity mark.

## Verification

From the repo root:

```bash
pnpm lint:tracy-zhang
pnpm build:tracy-zhang
```

For visual or interaction changes, run a local server and capture desktop/mobile
screenshots.

Search discoverability for the Chinese advisor surface should verify
`https://www.tracyzhang.com/zh`, the sitemap `zh-Hans` alternate, and links
from the Chinese page into `https://tracyzhanginsurance.com/zh/...`.

The header language switcher should remain a normal localized link between `/`
and `/zh`, preserving query strings and hash fragments. Its visible label shows
the current locale only. Do not replace it with client-side runtime translation;
use the repo-level translation CLI for stored drafts when advisor copy changes.

## Deployment

Deploy through the existing Vercel project `insurance-websites` from the repo
root. The Vercel project has root directory `apps/tracy-zhang`, so running from
inside the app creates a doubled app path.

```bash
pnpm install --frozen-lockfile
vercel deploy --prod --yes --archive=tgz --force --scope saulrichardsons-projects
```

Do not use a local prebuilt production deploy for this app. The personal site's
canonical URL is a public metadata contract, and production builds should read
that value from Vercel Production env, not from a developer workspace
`.env.local`.

The production domain aliases are:

- `https://tracyzhang.com`
- `https://www.tracyzhang.com`
