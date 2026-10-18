# Tracy's Insurance Marketing Domain

- date: 2026-10-18

## Subsequent website release

The temporary setup below was superseded later on October 18 by the
[completed website migration](2026-10-18-website-brand-domain-migration.md).
The new apex now serves the site directly; the old apex/www/campaign hosts and
new www host permanently redirect to it. Preserve this record as the initial
purchase and setup history, not the current routing instructions.

## Context

The owner bought `tracysinsurance.com` after discussing Tracy's Insurance as a
shorter marketing identity. This is the correctly spelled domain. The older
`tracysinsurnace.com` Cloudflare zone has a spelling mistake and is a separate
domain.

## Configuration

The new domain is active in the owner's Cloudflare account. Both the apex and
`www.tracysinsurance.com` are attached to the existing Vercel project
`san-marino-insurance`, with a 307 redirect to `tracyzhanginsurance.com`.

Cloudflare has DNS-only CNAME records for both names pointing to the
project-specific target returned by Vercel:
`8d5807285c8a766b.vercel-dns-017.com`. Cloudflare flattens the apex CNAME.
Vercel manages HTTPS for these domains. No nameserver transfer or new app
deployment is required.

The temporary redirect supports trying the short marketing address while the
existing insurance domain remains the website's canonical destination. The owner
subsequently approved Tracy's Insurance as the main brand; the website's
canonical-domain migration is still pending implementation. Preserve deep paths
and campaign query parameters when changing this configuration.

Google Workspace was subsequently migrated to the new domain on October 18.
The active operator account is `saul@tracysinsurance.com`; `hello@` and
`careers@` are aliases into that mailbox. See
[the Workspace migration record](2026-10-18-workspace-brand-pivot.md) for
configuration, verification and remaining delivery checks. The carrier-issued
`tzhang@allstate.com` account is separate and unchanged. Public website branding,
Google Business Profile names and social handles have not yet been migrated.

## Verification

Check HTTPS for both hostnames, the canonical homepage destination, a real
deep link and query parameter preservation. DNS acceptance is not proof that
the HTTPS certificate is ready. Final public results are recorded in the
owner's online-presence audit output.

On October 18, both Vercel domain checks reported valid configuration and
certificates were issued with automatic renewal. Eight public checks passed:
HTTP upgraded to HTTPS on both hosts; HTTPS redirected to the canonical site;
the Cerritos deep link and its UTM parameters survived on both hosts; following
the homepage and deep-link redirects reached HTTP 200. Evidence is saved in
`tracysinsurance-domain-verification.json` in the owner's audit output.

## Maintenance

Keep domain registration at Cloudflare and website routing on the existing
Vercel project. To stop using this alias, remove its two project-domain entries
and matching DNS records; do not remove the canonical insurance domain. For a
permanent redirect or a new canonical domain, first review search, campaign,
email and branding implications. The marketing redirect itself does not need
another Analytics tag or a duplicate website.
