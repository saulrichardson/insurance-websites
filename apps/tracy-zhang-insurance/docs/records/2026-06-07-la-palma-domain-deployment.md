# La Palma Domain Deployment

- date: 2026-06-07

## Context

The La Palma local acquisition surface already existed in the domain data and
host-aware homepage renderer, but `lapalmainsurance.com` was not attached to the
production Vercel project.

## Decision

Attach `lapalmainsurance.com` and `www.lapalmainsurance.com` to the existing
Vercel project currently named `san-marino-insurance`, pointing both aliases at
the current production deployment.

## DNS

The Cloudflare zone `lapalmainsurance.com` is active on the same Cloudflare
nameservers used by the other insurance domains. Apex and `www` use DNS-only
`A` records to Vercel `76.76.21.21`.

## Verification

Both HTTPS hosts returned HTTP 200 and rendered the La Palma local homepage:

- `https://lapalmainsurance.com`
- `https://www.lapalmainsurance.com`
