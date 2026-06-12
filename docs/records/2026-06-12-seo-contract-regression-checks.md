# SEO Contract Regression Checks

- date: 2026-06-12

## Context

The user wanted item 6 carried out in a way that protects SEO when future layout
changes happen. The risk is that a visual redesign can still look correct while
silently removing metadata, structured data, sitemap membership, localized
alternates, internal links, or noindex boundaries.

## Record

Treat SEO discoverability as an executable rendered-page contract.

- The root command is `pnpm seo:check`.
- The implementation is `scripts/seo/check-contracts.mjs`.
- Production is the default target.
- `pnpm seo:check:local` runs the same checks against local production servers,
  using host headers so the insurance app can be checked as
  `tracyzhanginsurance.com`, `sanmarinoinsurance.com`, and
  `lapalmainsurance.com` while still requesting `localhost`.
- The checker derives product and story expectations from source data instead
  of maintaining a separate manual page inventory.
- The checker validates semantic SEO behavior, not layout:
  - robots and sitemap URLs
  - canonical URLs
  - reciprocal `en-US`, `zh-Hans`, and `x-default` alternates
  - product and story sitemap membership
  - noindex boundaries for utility/intake routes
  - JSON-LD types for product, story, Chinese, local, and advisor pages
  - crawlable product-to-product and story-to-product links
  - local-domain office isolation
  - advisor-site profile schema and Chinese route discovery

The checker also caught a real implementation gap: Chinese homepage routes
emitted WebPage/business schema but did not emit BreadcrumbList schema. The
source was fixed so the Chinese structured-data wrapper emits breadcrumbs for
the `/zh` root as well as deeper Chinese pages.

## Evidence

- `node --check scripts/seo/check-contracts.mjs` passed.
- `pnpm test` passed.
- The first production run of `pnpm seo:check -- --target production` failed on
  missing Chinese homepage `BreadcrumbList` schema, proving the checker can
  catch a real route-level drift that visual layout checks would miss.

## Future Guidance

Run `pnpm seo:check` after route, layout, metadata, localization, schema,
sitemap, story, product, or domain changes and after production deployment.
When it fails, first decide whether the rendered page violated the intended SEO
contract. Do not weaken a contract merely because a redesigned page still looks
good visually.
