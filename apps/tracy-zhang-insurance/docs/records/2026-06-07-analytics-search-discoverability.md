# Analytics And Search Discoverability Audit

- date: 2026-06-07

## Context

The portfolio needed confirmation that Vercel analytics, Google Analytics, and
Google discoverability basics were actually live on the production domains, not
just present in code.

## Changes

- Added production `NEXT_PUBLIC_GA_MEASUREMENT_ID` to the Vercel project
  currently named `san-marino-insurance`.
- Added host-aware homepage metadata so local domains are self-canonical:
  `sanmarinoinsurance.com` and `lapalmainsurance.com`.
- Made `robots.txt` and `sitemap.xml` host-aware for the insurance app.
- Kept the full product/content sitemap on `tracyzhanginsurance.com`.
- Kept local domain sitemaps limited to their local homepage to avoid
  duplicating the canonical product catalog across city domains.

## Verification

Browser network checks showed GA4 `page_view` collection plus Vercel Analytics
and Speed Insights scripts on:

- `https://tracyzhanginsurance.com`
- `https://sanmarinoinsurance.com`
- `https://lapalmainsurance.com`
- `https://tracyzhang.com`

Live metadata checks showed:

- `https://tracyzhanginsurance.com` canonicalizes to
  `https://tracyzhanginsurance.com`
- `https://sanmarinoinsurance.com` canonicalizes to
  `https://sanmarinoinsurance.com`
- `https://lapalmainsurance.com` canonicalizes to
  `https://lapalmainsurance.com`
- `https://tracyzhang.com` canonicalizes to `https://www.tracyzhang.com`

Live sitemap checks showed:

- `https://tracyzhanginsurance.com/sitemap.xml` lists the full canonical
  product/content sitemap.
- `https://sanmarinoinsurance.com/sitemap.xml` lists the San Marino homepage.
- `https://lapalmainsurance.com/sitemap.xml` lists the La Palma homepage.

Google Search Console setup completed on 2026-06-07:

- `tracyzhanginsurance.com` was added and verified as a Domain property.
- `sanmarinoinsurance.com` was added and verified as a Domain property.
- `lapalmainsurance.com` was added and verified as a Domain property.
- Each insurance domain has one root Cloudflare TXT record for its
  Google-provided verification token.
- Sitemaps were submitted for all three Domain properties.

Follow-up caveat:

- Search Console immediately showed `Couldn't fetch` for the submitted sitemap
  rows, even though direct Googlebot-style checks returned HTTP 200
  `application/xml` and each `robots.txt` pointed to the matching host's
  sitemap. Recheck Search Console after Google's processing lag before treating
  this as an application or DNS failure.
