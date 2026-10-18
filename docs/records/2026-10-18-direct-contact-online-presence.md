# Direct Contact Online Presence

Date: October 18, 2026

## Owner direction

Audit and improve existing websites and online profiles. Public customer
acquisition uses call, text, and email. No consumer intake forms. Expand the
long-term community strategy across Southern California, including Irvine
and San Diego, while keeping office and language claims factual.

## Initial audit

The public crawl retrieved 89 URLs across the canonical insurance site, San
Marino and La Palma sites, personal advisor site, and campaign host. All
returned HTTP 200. Thirteen unique rendered image URLs also succeeded.
The existing production SEO checker passed 59 cases. The crawl found 14 stale
form-copy occurrences and five links to absent business fragments.

The personal site had inconsistent La Palma weekday/weekend hours and omitted
Spanish from its language list. The current official Allstate profiles confirm
the shared office information. Both Google Maps listings have matching office
addresses and phone numbers and link to the respective Allstate profile.
Review counts differ by platform and must keep their source attribution.

The careers page and La Palma Allstate page link to corporate Allstate social
accounts. They do not establish agency social account ownership. Leave unknown
social fields empty until a real account is verified. A third-party Bizarchive
listing displays a different La Palma phone number, (844) 212-9032; investigate
whether it is a legacy tracking line before requesting a correction.

## Implementation

- Public page banners, closing contact sections, and both homepages emphasize
  tracked phone, text, and email actions. Local actions retain the active office.
- Chinese product/home/contact copy no longer directs visitors to a nonexistent
  form. Contact-preference copy and metadata describe direct communication.
- Footer business links use the real business-insurance page.
- The personal language list uses shared office data; La Palma hours align with
  the current official profile and main insurance site.
- Insurance structured data references the correct office’s official Allstate
  and Google Maps profiles; unknown social identities remain unasserted.
- Rendered SEO checks reject public forms, stale form copy, broken business
  fragments, and missing direct-contact schemes. The existing unlisted referral
  workflow remains separate and noindex.

## Account work remaining

No authenticated Google Business Profile manager, Search Console performance,
Apple Business Connect, Bing Places, Yelp, or agency social management session
was available through this task’s connected tools. Public listing inspection
is not an account-management audit. Verify owners, actual social handles,
indexing/performance, photos, categories, duplicate listings, and response
coverage from those accounts. Prepare changes from verified facts before
publishing them; do not create duplicate profiles or assume corporate accounts
belong to the agency.

## Verification and release

Run both app linters/builds, the 31-test suite, workspace hygiene, local rendered
SEO checks, desktop/mobile browser inspection, and production SEO/crawl checks
after release. Publish through each app’s documented Vercel project and retain
the previous deployment IDs for rollback. No database migration or change to
customer messaging is required for this release.

## Published result

Both releases were published on October 18, 2026 after staged verification.
Application source is a4b4c94fd9f62e9dae967f53a3566f9d77ca7073. Personal deployment:
`dpl_A8bjELRYSgMQhMJ82asS5iAV7K5h`. Insurance deployment:
`dpl_FzbvT63Xc9QPQrMUmyzy3CrRgusu`. All 89 final public URLs returned 200;
the repeat crawl found zero of the stale-copy/missing-fragment issues. All 59
production SEO cases passed. Final browser checks confirmed the correct office
phone/text/email actions, zero discovery forms and no horizontal overflow in
five mobile/desktop cases. No customer communication was sent.

The changes are in PR 5, stacked on preservation PR 4. Main remains older;
future releases must include the preserved source and these fixes. Previous
rollback deployments are `dpl_7eGGgTjDje3ztCRBUtNDMFoZxucp` for the personal app
and `dpl_8HxpVqqnSVf4PHbtz1ZbRYWHyRGJ` for the insurance app.
