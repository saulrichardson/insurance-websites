# Tracy's Insurance Marketing Domain

- date: 2026-10-18

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
existing insurance domain remains the website's canonical destination. A later
brand migration is a separate decision. Preserve deep paths and campaign query
parameters when changing this configuration.

No new email service was configured for the short domain. Existing Workspace
and public contact addresses retain their current domains. Purchasing or
connecting a website domain does not create mailboxes. No public brand names,
Google Business Profile names or social handles were changed in this step.

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
