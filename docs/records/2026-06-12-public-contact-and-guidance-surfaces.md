# Public Contact And Guidance Surfaces

- date: 2026-06-12

## Context

The portfolio needed direct email and Calendly paths across the public websites,
and Tracy Zhang needed a visible blog/guidance presence. The provided public
contact facts were `tzhang@allstate.com` and
`https://calendly.com/tracyzhangallstate/new-meeting`. The first supplied blog
post was a California FAIR Plan article.

## Record

Public direct-contact facts are shared business facts, not page-local content.
They now live in `packages/domain` as `publicContact` and are consumed by both
public apps.

Product-depth insurance articles should be canonical on
`tracyzhanginsurance.com/stories`. The advisor site at `tracyzhang.com` may
feature and route to those articles, but should not duplicate full article
bodies unless the personal site's product role intentionally changes.

## Evidence

- `packages/domain/src/index.ts` exports `publicContact`.
- `apps/tracy-zhang-insurance/src/content/stories.ts` contains
  `why-you-should-consider-the-ca-fair-plan`.
- `apps/tracy-zhang-insurance/src/i18n/zh.ts` contains reviewed Simplified
  Chinese content for the new story route.
- `apps/tracy-zhang/src/app/page.tsx` and `apps/tracy-zhang/src/app/zh/page.tsx`
  feature the canonical FAIR Plan story instead of duplicating it.
- `scripts/seo/check-contracts.mjs` checks the shared public email and Calendly
  URL on key rendered English and Chinese surfaces.

## Future Guidance

Add future public contact methods to `packages/domain` first, then expose them
through reusable contact components. Add future product-depth articles to the
insurance app's story content and add reviewed Chinese content before treating
the `/zh/stories/...` route as production-ready.
