# Personal Site Backend Env Cleanup

- date: 2026-06-07

## Context

The personal `tracyzhang.com` app had already been simplified into an advisor
profile and routing surface, but local examples and production Vercel
configuration still carried leftovers from the older product/careers backend:
database, admin, S3, and career/resume environment variables.

## Record

Keep backend ownership out of `apps/tracy-zhang`. This app should not contain
quote intake, career intake, database-backed admin screens, file uploads, S3/R2
storage, or backend route protection for nonexistent admin paths.

The active backend surface belongs in `apps/tracy-zhang-insurance`, where quote
requests, consent records, attribution, admin review, and future notification
workflows live.

## Evidence

- `apps/tracy-zhang/.env.example` now only lists `NEXT_PUBLIC_SITE_URL` and
  `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- `apps/tracy-zhang/src/proxy.ts` was removed because there are no personal-site
  `/admin` or `/api/admin` routes.
- `apps/tracy-zhang/src/app/robots.ts` no longer refers to nonexistent admin
  paths.
- `apps/tracy-zhang/tsconfig.json` no longer maps unused workspace backend
  packages.
- Production Vercel env for the `insurance-websites` project now only contains
  `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_GA_MEASUREMENT_ID`.

## Future Guidance

If the personal site needs a customer action, prefer routing the visitor into
`tracyzhanginsurance.com` unless the action is truly advisor-profile specific.
If a future workflow needs persistence, notifications, admin review, carrier
submission, career intake, or file uploads, build that workflow in
`apps/tracy-zhang-insurance` or a clearly named service, not in the personal
profile app.
