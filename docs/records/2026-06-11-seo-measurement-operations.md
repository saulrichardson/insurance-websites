# SEO Measurement And Search Operations

- date: 2026-06-11

## Context

After the first SEO implementation pass, the portfolio has first-class
technical SEO, Simplified Chinese routes, local-domain canonicals, structured
data, and internal links. The next SEO item should not be another cloning or
translation layer. It should be the operating loop that tells the team which
pages are actually being discovered, which searches are producing impressions,
and which content or local signals should be improved next.

## Record

Treat item 6 as SEO measurement and search operations.

The goal is to answer these questions with production evidence:

- Are Google and other search systems fetching the canonical, local, and
  Chinese sitemaps successfully?
- Are the English and Simplified Chinese URLs indexed as separate, reciprocal
  localized pages?
- Which queries produce impressions for the brand, local offices, insurance
  products, Chinese-language searches, and guidance stories?
- Which pages receive impressions but weak click-through?
- Which pages receive traffic but weak lead-form, phone, or contact intent?
- Which Chinese, local, or product topics are missing enough search demand to
  justify new reviewed content?

The current foundation already supports this loop:

- Vercel Analytics and Speed Insights are enabled.
- GA4 is configured where `NEXT_PUBLIC_GA_MEASUREMENT_ID` is present.
- Google Search Console domain properties exist for
  `tracyzhanginsurance.com`, `sanmarinoinsurance.com`, and
  `lapalmainsurance.com`.
- Host-aware `robots.txt` and `sitemap.xml` output is live for the insurance
  domains.
- The canonical insurance sitemap includes product, guidance, and `/zh/`
  alternates.
- Local-domain sitemaps stay limited to the local acquisition URLs to avoid
  duplicating the canonical product catalog.
- The production SEO model keeps metadata and structured data centralized, so
  operational work can focus on search evidence instead of rediscovering page
  contracts.

## High-Level Work To Do

1. Recheck Search Console sitemap status.

   The earlier `Couldn't fetch` sitemap table state should be rechecked after
   Google's processing lag. If direct Googlebot-style requests still return
   HTTP 200 XML and Search Console later succeeds, no code change is needed.
   If it persists, inspect crawl errors, DNS, redirects, and rendered sitemap
   content before changing the app.

2. Request indexing for the highest-value URLs.

   Prioritize the canonical homepage, `/zh/`, core product pages, `/products`,
   `/stories`, the strongest guidance stories, and each local-domain homepage
   plus `/zh/`. Use URL Inspection/Search Console workflows rather than adding
   artificial redirects or duplicate pages.

3. Build a query-intent review habit.

   Review Search Console performance by page and query. Bucket queries by:
   brand, city/local office, product, Chinese-language product need, guidance
   question, and conversion intent. Use that evidence to decide which titles,
   descriptions, internal links, or new content deserve attention.

4. Track Chinese discoverability as its own surface.

   Look for Simplified Chinese query patterns such as California insurance,
   auto insurance, home/property insurance, local office searches, and Tracy's
   name in Chinese. Improve stored Chinese copy and page coverage only from
   reviewed content; do not runtime-translate public pages or publish English
   fallbacks under `/zh/`.

5. Strengthen local search outside the app.

   Confirm Google Business Profile and other local directory profiles for the
   real offices, keep name/address/phone data consistent, add bilingual
   descriptions where supported, and link each profile to the appropriate
   canonical or local page. This is not a code task unless the website's office
   facts are wrong.

6. Connect traffic to lead intent.

   Review GA4/Vercel events by domain, locale, product, campaign, and route.
   The useful outcomes are quote-form starts, lead submissions, lead errors,
   phone/contact clicks if instrumented, and admin-visible leads with source
   attribution. Add more tracking only when a decision depends on it.

7. Let measurement drive content expansion.

   Add new English or Chinese pages only when they fit product intent and there
   is evidence of search demand, campaign need, or a real customer question.
   Use the translation workflow to generate stored drafts for review, then
   commit reviewed content and run `pnpm i18n:check`.

8. Add non-Google search surfaces deliberately.

   Bing Webmaster Tools can mirror the Google sitemap setup if search
   reporting shows value or the team wants broader crawler visibility. Baidu or
   China-focused search work should be treated as a separate market decision,
   not a default requirement for Chinese-speaking California shoppers.

## Future Guidance

Do not solve measurement gaps by creating cloned websites, doorway pages,
runtime translation, hidden redirects, or broad keyword stuffing. The forward
path is evidence-driven: inspect Search Console and analytics, identify the
search or conversion gap, then improve first-class content, metadata,
structured data, internal links, local profiles, or tracking where the evidence
points.
