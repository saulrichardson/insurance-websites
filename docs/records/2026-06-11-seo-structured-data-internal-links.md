# SEO Structured Data And Internal Links

- date: 2026-06-11

## Context

The user asked to carry out the first SEO optimization pass: technical SEO,
Chinese search intent, local SEO, structured data, and internal linking. The
existing sites already had `/zh` routes, sitemaps, local-domain behavior, and
basic schema, but metadata and internal links were still partly page-local.

## Record

Treat SEO as first-class source data, not scattered page decoration.

- Insurance route and product metadata belongs in
  `apps/tracy-zhang-insurance/src/lib/seo.ts`.
- Insurance JSON-LD helpers belong in
  `apps/tracy-zhang-insurance/src/lib/schema.ts`.
- English pages with real Chinese equivalents should publish explicit
  `en-US`, `zh-Hans`, and `x-default` alternates. Do not invent hreflang for a
  route that has no localized page.
- Product pages emit Service and Breadcrumb JSON-LD from the shared product
  guide surface.
- English story pages emit Article and Breadcrumb JSON-LD, and Chinese story
  pages emit Chinese WebPage, Breadcrumb, and Article JSON-LD through the
  central `/zh/[[...slug]]` route.
- Story entries own `relatedProductIds`; product relationships remain in the
  shared domain package. This keeps internal links tied to content facts rather
  than ad hoc page arrays.
- Local domain homepages remain the indexable local acquisition surfaces.
  Their `/` and `/zh` pages self-canonicalize to the local domain and local
  sitemaps stay limited to those two URLs. Deeper product/content pages remain
  canonical to the main insurance domain.
- The personal site schema describes Tracy as a Person with ProfilePage,
  WebSite, and both real office entities. It should not become a duplicate
  product catalog.

## Evidence

- `pnpm test` passed with SEO regression coverage for product metadata,
  localized alternates, non-localized utility routes, and local-domain schema
  isolation.
- `pnpm lint:all`, `pnpm i18n:check`, and `pnpm build:all` passed.
- Local production probes confirmed:
  - `/auto-insurance` has canonical metadata, reciprocal `zh-Hans` alternate,
    Service JSON-LD, Breadcrumb JSON-LD, and related coverage links.
  - `/stories/why-we-ask-for-vins` has Article/Breadcrumb JSON-LD and links to
    related coverage pages.
  - `/zh/stories/why-we-ask-for-vins` has Chinese canonical metadata,
    reciprocal alternates, Chinese Article/Breadcrumb JSON-LD, and links to
    Chinese product pages.
  - `/thanks` is noindex and has no invented `/zh/thanks` alternate.
  - San Marino and La Palma local homepages self-canonicalize, their sitemaps
    expose only `/` and `/zh`, and their rendered schema does not contain the
    other office address or phone.

## Future Guidance

When adding an indexable route, add its metadata to the central SEO model or
explain why it is intentionally route-local. When adding a story, assign
`relatedProductIds`. When adding a product, add product SEO content, ensure it
has Chinese content before publishing `/zh`, and verify sitemap/hreflang output.
Do not use runtime translation, doorway-page cloning, or hidden compatibility
redirects as SEO shortcuts.
