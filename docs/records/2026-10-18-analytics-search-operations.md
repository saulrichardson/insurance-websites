# Direct Contact Measurement and Search Operations

- date: 2026-10-18

## Context

The owner asked for Analytics optimization through the authenticated browser.
The regular Chrome session provided access even though the isolated audit
browser did not share its login. Future agents should check the available
authenticated session before declaring account settings inaccessible.

The public acquisition goal is calls, texts and emails. Do not add consumer
intake forms to produce a conversion metric. Earlier records discussing public
form conversions are historical context; the October 18 owner direction takes
precedence. Measure whether the existing direct-contact paths produce useful
inquiries and eventually business, while preserving those distinct outcomes.

## Record

The shared insurance Analytics property is now named **Tracy Zhang Insurance
Websites**. The active web stream still has the display name Tracy Zhang Website
and measurement ID `G-T3GNK3HQLS`. Its configured website URL is the personal
advisor site, but the tag is shared across the insurance portfolio. That field
does not establish that only the advisor site is measured.

The account changes were saved through Google's UI:

- Registered `phone_click`, `sms_click` and `email_click` as key events, counted
  once per event, with no default monetary value. Existing website handlers
  already emit those names. A click is contact intent, not a connected call,
  delivered message, qualified inquiry or policy sale.
- Configured cross-domain measurement for the four agency domains and their
  subdomains. The saved Matches RegEx condition is
  `(^|\.)(tracyzhanginsurance|tracyzhang|sanmarinoinsurance|lapalmainsurance)\.com$`.
  This includes the campaign subdomain and excludes temporary Vercel hosts.
- Linked the main `tracyzhanginsurance.com` Search Console domain property to
  the active web stream. Other local-domain Search Console properties remain
  separate; Google allows one Search Console property per web stream link.
- Extended event-level retention from two months to 14 months. User-level
  retention was already 14 months. Changes take effect after 24 hours and
  cannot recover previously expired data.
- Retained the existing Los Angeles reporting timezone and USD currency.

The inactive legacy Saul personal-site stream remains in the property to
preserve history. Renaming the property did not separate historical data. Saul's
current personal website uses a separate measurement ID and property, which
were not changed. When reading old performance emails, check the page titles
and reporting context before calling their counts insurance-agency results.

## Search evidence

The main property's October 11 indexing report showed 13 indexed and seven
not-indexed URLs. The two redirect examples were HTTP homepage variants; the
two proper-canonical examples were the www homepage and www Chinese SMS terms.
Current public checks confirm HTTPS destinations and matching non-www
canonicals. Those exclusions were not submitted for validation as defects.

The three crawled/not-indexed examples were a favicon, a font file and the
Cerritos location page. The assets are not missing customer landing pages.
The Cerritos page returned 200 with index/follow and its correct self-canonical.
Google's live test reported it can be indexed. An indexing request was accepted
into the priority crawl queue; indexing itself remains unconfirmed.

The main, San Marino and La Palma sitemaps all showed Success. Each existing
sitemap URL was resubmitted after the website release, and Google confirmed
successful submission. This is not proof that all pages have been reread or
indexed. The local sitemaps intentionally contain only their two local entry
pages; do not clone the full product catalog to increase their URL counts.

## Verification and limits

After reopening settings, all three key-event flags, the property name,
14-month retention, Search Console link and cross-domain condition persisted.
A prior live homepage test sent `page_view` to Google's collection endpoint
and received 204. The stream UI also showed recent traffic.

No real contact-click receipt or completed contact delivery was established
by these checks. The events table still had no stream data for the newly
registered contact events. Cross-domain linker behavior also needs a live
journey check. Preview hosts remained tag-diagnostic suggestions; do not claim
every tag warning is resolved. No customer communication or ad spend resulted
from this configuration work.

## Future guidance

Review search queries, landing pages and direct-contact intent by hostname,
language, source/medium and campaign. Confirm contact events in Realtime or
DebugView before depending on them in reports. Register only the custom
dimensions needed for a concrete operating decision. Keep test activity
distinguishable from prospects before drawing conclusions from small counts.

Follow the Cerritos indexing request and updated sitemap processing, then
inspect local-domain exclusions individually. Keep useful Search Console
alerts; promotional Analytics or Ads emails do not establish a site fault.

These settings live in Google, outside deployment source. A website redeploy or
Git revert will not undo them. Key-event flags, domain conditions, the Search
Console link, display name and retention can be changed in their respective
Admin screens; deleting streams or moving historical data is not a rollback.
Account evidence is kept in the owner's local audit output, not this public
repository. No application rebuild was required for this record.

## References

- [Key-event reporting](https://support.google.com/analytics/answer/12571843?hl=en)
- [Cross-domain measurement](https://support.google.com/analytics/answer/10071811?hl=en-NA)
- [Search Console integration](https://support.google.com/analytics/answer/10737381?hl=en)
- [Data retention](https://support.google.com/analytics/answer/7667196?hl=EN)
