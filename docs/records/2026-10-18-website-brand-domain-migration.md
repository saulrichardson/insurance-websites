# Tracy’s Insurance Website and Domain Migration

- date: 2026-10-18
- implementation commit: `d356c4b`

## Result

The owner approved finishing the public website migration. The live agency
brand is now **Tracy’s Insurance**, and the canonical site is
`https://tracysinsurance.com`. Both apps use the previously delivery-tested
`hello@tracysinsurance.com` public mailbox. The personal advisor identity and
`https://www.tracyzhang.com` canonical host are retained.

Shared domain data, English/Chinese copy, metadata, structured data, canonical
and hreflang URLs, sitemap/robots output and advisor cross-site links were
updated together. Existing layouts, crest, office facts and local-domain
boundaries remain. The old Chinese advisor reference to an inquiry form now
describes email or appointment contact. Public consumer forms remain retired;
the unlisted referral intake and historical records remain intact. Consent
copy/form version identifiers were advanced for the renamed agency copy.

## Routing and deployment

| Host | Live behavior |
| --- | --- |
| tracysinsurance.com | Direct HTTPS 200, statewide canonical site |
| www.tracysinsurance.com | 308 to the new apex |
| tracyzhanginsurance.com and www | 308 to the new apex |
| go.tracyzhanginsurance.com | 308 to the new apex |
| sanmarinoinsurance.com and www | Existing San Marino surface, local homepage canonical |
| lapalmainsurance.com and www | Existing La Palma surface, local homepage canonical |
| tracyzhang.com | Existing redirect to www.tracyzhang.com |

Redirects preserve paths, queries and HTTP methods. They are Vercel project
domain settings, not application middleware. The new-to-old temporary redirect
was removed before old-to-new redirects were enabled. Main production
`NEXT_PUBLIC_SITE_URL` is explicitly `https://tracysinsurance.com`.

The main app used the documented staged pnpm source build; the advisor app used
the repository-root remote build. Both were built without assigning production
domains, checked remotely, then promoted:

- Main: `san-marino-insurance-i1np2fysg-saulrichardsons-projects.vercel.app`,
  deployment `dpl_HbobE1KiLKEM2pV5Ri8QxsBY53Md`.
- Advisor: `insurance-websites-icfyol358-saulrichardsons-projects.vercel.app`,
  deployment `dpl_4iVR9eTxDSo17xt9LbMRNTdg6Ydr`.

Cloudflare website and Workspace mail routing were retained. A new, separate
Google Search Console TXT verification record was added. The existing Resend
notification sender remains on its verified old domain; Google Workspace DKIM
does not establish Resend authorization for a new sending domain.

## Search and measurement

The owner's existing external Google identity verified the new domain property.
Google accepted `https://tracysinsurance.com/sitemap.xml`. The old main-domain
Change of Address passed ownership, homepage redirect and sample-page redirect
validation. The confirmed status is “This site is currently moving” to the new
domain, starting October 18, 2026. Submission is not a claim that indexing or
ranking migration is already finished.

GA4 property `525430827` and stream `13643957583` were retained, with measurement
ID `G-T3GNK3HQLS`. The property and stream display names are now Tracy’s Insurance
Websites; the stream URL is the new apex. The saved cross-domain condition is
`(^|\.)(tracysinsurance|tracyzhanginsurance|tracyzhang|sanmarinoinsurance|lapalmainsurance)\.com$`.
The old Search Console reporting association was replaced with the new domain
property on the same stream; Google confirmed the link was created. No
Analytics property, stream or historical data was deleted.

## Verification

- Both app production builds and linters passed; workspace hygiene passed.
- All 31 tests passed.
- All 59 local and all 59 production SEO contracts passed.
- All 20 production migration contracts passed using
  `node --no-warnings scripts/seo/check-domain-migration.mjs`.
- Remote deployment HTML confirmed public email, new canonical URLs and
  advisor links before promotion.
- Live desktop and 390px mobile views were inspected; the mobile menu and
  call/text/email destinations were checked. The temporary viewport override
  was reset.

Private screenshots, Google account read-backs, the prior Vercel domain
configuration and remote HTML evidence are in the owner's
`outputs/tracys-website-migration-2026-10-18/` directory, outside Git.

## Maintenance and rollback

Keep the old domain registered, its email/verification records intact, and
permanent redirects available for old links. Check indexing and search traffic
in the new Search Console property as Google processes the move. Google
Business Profiles, carrier-managed listings and social handles are separate
surfaces and were not renamed by this website deployment.

The previous main deployment was
`san-marino-insurance-9m810kcam-saulrichardsons-projects.vercel.app`
(`dpl_FzbvT63Xc9QPQrMUmyzy3CrRgusu`). A full domain rollback must coordinate
deployment, `NEXT_PUBLIC_SITE_URL`, Vercel domain redirects, Google's move
request and Analytics configuration. Never restore the new-to-old redirect
while old-to-new redirects remain active. Git reverts alone do not change
external routing or Google account settings.
