# Agency Design Across English and Chinese Pages

- date: 2026-10-18

## Owner direction

Extend the approved Tracy’s Insurance homepage design throughout the website,
including Chinese pages, and verify mobile presentation. Public contact remains
call, text and email with no consumer intake forms.

## Implementation

The shared public frame now uses the approved text-only wordmark, warm ivory,
cinnabar red, dark brown typography and restrained gold details. Headers,
footers, language switches, page heroes and closing contact sections share one
set of components and style rules. Product guidance and article content retain
their useful structure while the typography, spacing, surfaces and controls
match the main homepage. Cards use a quieter editorial treatment.

The canonical Chinese homepage uses the same composition as the English
homepage, with stored Chinese copy and language-specific headline spacing.
Product and article translations remain on their existing routes. Image
captions and alt text have Chinese copy rather than English fallback.
Language switches retain query parameters and hash fragments.

Every public page has a mobile call, text and email bar with the active office's
telephone number. The local domains retain only their own office's contacts,
including Chinese routes. Public scheduling links and appointment-form links
were removed. The unlisted referral workflow, admin controls, stored leads and
API behavior are outside this design change.

The narrow-phone audit found image intrinsic sizing causing horizontal
scrolling on the English and Chinese guidance indexes. Story images now fit
the available width, and grid children can shrink within their columns.

## Verification

Insurance-app lint, production build and TypeScript checks passed, as did all
31 existing tests and workspace hygiene. All 59 SEO contracts passed locally,
including both local domains and the unchanged personal advisor site.

The sitemap-wide browser audit passed all 66 public routes at 320 pixels with
no horizontal overflow, consumer form controls, duplicate frames or JavaScript
page errors. A further 48 viewport checks covered 16 representative English and
Chinese routes at 390, 768 and 1440 pixels. Chinese menus, Escape behavior,
menu closing after navigation and language switching passed. Language switching
retained the current query parameters and hash. Eight local-domain checks
confirmed the correct phone number and absence of the other office's contact
on English/Chinese home and contact pages.

Full-page desktop and mobile screenshots were reviewed for the Chinese
homepage, English and Chinese auto pages, contact page and guidance index.
Evidence is retained locally in output/playwright/. The reusable sitemap audit
is scripts/qa/audit-public-design.js.

This is a full staged pnpm Next.js source deployment, preserving the existing
routes and application services. The preceding production deployment is
`dpl_DnEpwZtiSZAPCj5X3drcH1KiRGTT` for rollback. Live results follow below.

The implementation uses the beach photograph consistently for Orange County
regional imagery, with source and license information. Public region labels
use Los Angeles without County, while Orange County retains its full name.

## Live release

The final full application deployment is `dpl_BfMyJnxUNEaEf3J7KN2w9tJ9CkEf`,
READY and aliased to https://tracysinsurance.com/. After publication, all 66
sitemap routes passed the same 320 pixel browser audit with zero failures and
zero JavaScript page errors. All 59 production SEO checks passed. Eight live
checks of the San Marino and La Palma domains confirmed HTTP 200 and the
correct office telephone and SMS destinations on English/Chinese home and
contact pages.
