# San Marino Insurance Agency Website

Next.js + Tailwind site for the Allstate agent office in San Marino, CA.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

To verify the production build locally:

```bash
npm run build
npm run start
```

## Where To Update Content

- Site/agent info: `src/lib/site.ts`
- Home page layout: `src/app/page.tsx`
- Header/nav: `src/components/site-header.tsx`
- Global theme colors + fonts: `src/app/globals.css`

## Quote Requests (Request a Quote)

The **Request a quote** form on `/insurance` submits to `POST /api/quote`.

- Form UI: `src/components/quote-request-form.tsx`
- API handler: `src/app/api/quote/route.ts`

### Delivery options (configure in Vercel)

The API can deliver leads in two ways (you can enable either or both):

1) **Webhook** (Zapier/Make/CRM)
- `QUOTE_WEBHOOK_URL` = `https://...` (your automation endpoint)

2) **Email via Resend** (recommended)
- `RESEND_API_KEY` = `re_...`
- `QUOTE_TO_EMAIL` = destination inbox (where the office receives leads)
- `QUOTE_FROM_EMAIL` = verified sender (must be verified in Resend)
- Optional:
  - `QUOTE_REPLY_TO_EMAIL` = fallback Reply-To if customer email is missing
  - `QUOTE_EMAIL_SUBJECT_PREFIX` = subject prefix (default: `Quote request`)

If no delivery is configured (or delivery fails), the server will still keep a fallback record in Vercel logs.

## Vercel Deployment (Recommended: Git Integration)

This repo is ready to deploy as a standard Next.js project on Vercel.

1. Push this repo to GitHub (private is fine).
2. In Vercel: **Add New → Project → Import Git Repository**.
3. Keep the default Next.js build settings.
4. Set environment variables (Project → Settings → Environment Variables):
   - `NEXT_PUBLIC_SITE_URL` = `https://sanmarinoinsurance.com` (set for **Production** and **Preview**)
5. Deploy.

## Cloudflare Domain Setup (Manual DNS)

You said you want manual Cloudflare configuration (no auto-integration). Great — do this after the first Vercel deploy:

1. In Vercel project: **Settings → Domains → Add**
   - `sanmarinoinsurance.com`
   - `www.sanmarinoinsurance.com`
2. Vercel will show the exact DNS records required (A/CNAME/TXT depending on your setup).
3. In Cloudflare: **DNS** tab → add the records exactly as Vercel shows.
   - During verification, set those records to **DNS only** (grey cloud), then you can enable proxy later if desired.
4. Back in Vercel Domains, wait until it shows **Valid Configuration**.

## Scaling To Multiple Websites

If you plan to run multiple agency sites, you have three solid options:

1. **One repo per site (simplest + isolated)**
   - Each repo → one Vercel project → one domain.
   - Best when sites are mostly independent.
2. **Monorepo (shared code, separate sites)**
   - `apps/site-a`, `apps/site-b`, shared `packages/ui`.
   - One Vercel project per app directory.
   - Best when you want consistent UI + shared components across many sites.
3. **Multi-tenant single app (one deploy, many domains)**
   - One Vercel project serves many domains; content changes by hostname.
   - Best when you want central management (CMS/database), but it’s the most complex.
