# Public Design Browser Audit

`audit-public-design.js` is a Playwright CLI `run-code` entry, not a Node server
or an application dependency. Open the target agency site in a dedicated test
browser session, then pass this file to the CLI's `run-code --filename` option.
It derives the target origin from the current browser page.

The audit visits every route listed in that site's sitemap at 320 pixels wide.
It checks HTTP success, horizontal overflow, exactly one header and main,
Chinese language markup, absence of consumer form controls and appointment
widgets, and the mobile call/text/email bar. It does not dial, text, email or
submit customer data. A failure includes the route and overflowing elements.

Use the local production build before release, then repeat against the live
main domain after deployment. Review desktop and mobile screenshots separately:
this structural audit does not judge composition or copy quality. Local-domain
phone isolation and language-switch query/hash behavior require their own
interaction checks described in the site-wide design record.
