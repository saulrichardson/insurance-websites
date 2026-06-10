# Simplified Chinese Discoverability

- date: 2026-06-10

## Context

The portfolio needs to be discoverable and usable for Chinese-speaking
California insurance shoppers who may not browse or search primarily in
English. The user explicitly rejected a vague recommendation and asked to
proceed across all websites.

## Record

Use first-class Simplified Chinese paths inside the existing websites, not
cloned websites, cloned apps, or separate Chinese domains.

- `tracyzhanginsurance.com/zh/` is the Chinese insurance entry point.
- Chinese insurance product, contact, location, legal/consent, and guidance
  routes live under `apps/tracy-zhang-insurance/src/app/zh/[[...slug]]/page.tsx`.
- `www.tracyzhang.com/zh` is the Chinese advisor profile entry point and routes
  product-depth needs to `tracyzhanginsurance.com/zh/...`.
- Local domains should expose `/zh/` local homepages while preserving the
  existing local-domain rule: they are acquisition surfaces, not duplicated
  full product catalogs.
- Sitemap alternates are the portfolio-level hreflang source of truth. English
  and Chinese equivalents should include `en-US`, `zh-Hans`, and `x-default`.
- Chinese URLs should self-canonicalize. Do not canonicalize Chinese pages back
  to English.
- Public `/zh/` pages should use reviewed Simplified Chinese content. New
  English content should not be treated as localized just because a route
  exists; missing Chinese story content should fail build/render validation
  rather than falling back to English on a Chinese URL.
- English/Chinese switching should be a route-aware control that links to the
  equivalent localized URL and preserves query strings and hash fragments. The
  visible control should show the active locale only; English pages should not
  display Chinese text just because Chinese is the switch target.
- LLM translation can be used as a drafting and storage tool. The repo-level
  translation CLI writes source-hashed artifacts under
  `content/translations/<locale>/`; production page rendering should not call
  the LLM API or require `OPENAI_API_KEY`.

## Evidence

- Local production builds generated the insurance `/zh/[[...slug]]` route and
  the personal `/zh` route.
- Local sitemap probes found 64 `zh-Hans` alternates in the insurance sitemap
  and 2 `zh-Hans` alternates in the personal sitemap.
- Local HTML probes confirmed Chinese content, Chinese self-canonicals, and
  reciprocal English/Chinese alternates for `/zh/`, `/zh/auto-insurance`,
  `/zh/contact`, `/zh/stories/why-we-ask-for-vins`, and `/zh` on the personal
  site.
- Browser screenshots were captured for desktop and mobile Chinese homepages.

## Future Guidance

Keep Chinese content localized, not mechanically cloned. The first pass targets
Simplified Chinese with URL prefix `/zh/` and hreflang `zh-Hans`. Add
Traditional Chinese only if there is a real audience or campaign need, using a
separate path such as `/zh-hant/` and proper `zh-Hant` alternates.

Future automation should draft translations for review or enforce coverage
checks; it should not runtime-translate public insurance pages on demand.
