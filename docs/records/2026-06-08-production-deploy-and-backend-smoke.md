# Production Deploy And Backend Smoke

- date: 2026-06-08

## Context

The portfolio needed a production pass after cleaning the website split, favicon
assets, backend ownership, and Vercel deployment path.

## Record

Both production Vercel projects were redeployed and smoke-checked:

- `insurance-websites` serves `tracyzhang.com` and `www.tracyzhang.com`.
- `san-marino-insurance` serves `tracyzhanginsurance.com`,
  `www.tracyzhanginsurance.com`, `sanmarinoinsurance.com`,
  `www.sanmarinoinsurance.com`, `lapalmainsurance.com`, and
  `www.lapalmainsurance.com`.

The personal site remains backend-free. `/api/leads` and `/admin/leads` return
404 on `www.tracyzhang.com`.

The insurance backend is live for storage and admin review:

- invalid lead input returns server-side validation errors
- valid lead input stores rows in `leads`
- consent acceptance stores rows in `lead_consents`
- source host/path and campaign fields persist per domain
- notification attempts create `lead_events`
- the deployed admin UI hides leads from anonymous visitors
- admin login works
- admin status updates and notes write `lead_events`

Email delivery is not live yet. Production has `LEADS_TO_EMAIL`, but still needs
`RESEND_API_KEY` and `LEADS_FROM_EMAIL`. Until those are configured, lead
requests are saved and notification events are recorded as
`notification_failed:not_configured`; the public API returns
`notification: "pending"`.

## Evidence

- `pnpm lint:all` passed.
- `pnpm test` passed.
- `pnpm build:all` passed.
- `vercel deploy --prebuilt --prod --yes --scope saulrichardsons-projects`
  deployed the personal site to
  `insurance-websites-qw65cdq8z-saulrichardsons-projects.vercel.app`.
- The staged pnpm source deploy for the insurance app produced
  `san-marino-insurance-g06wcyyoc-saulrichardsons-projects.vercel.app`.
- Live domain checks returned HTTP 200 for all attached insurance domains and
  confirmed host-aware titles, icon links, manifests, robots files, and
  sitemaps.
- Production API smoke tests created disposable leads on
  `tracyzhanginsurance.com`, `sanmarinoinsurance.com`, and
  `lapalmainsurance.com`, verified DB rows/consents/events, then deleted all
  three rows.
- Production admin UI smoke seeded one disposable lead, verified anonymous
  access did not expose it, logged in through the deployed UI, changed status to
  `contacted`, added an internal note, verified the DB events, then deleted the
  row.
- A cleanup query confirmed zero remaining `Codex Smoke` or
  `Codex Admin Smoke` leads.

## Future Guidance

Before email or SMS campaigns launch, configure the Resend sender/API key and
rerun a production smoke that proves `notification_sent` with a real delivered
email. Keep test lead cleanup as part of every production smoke run.
