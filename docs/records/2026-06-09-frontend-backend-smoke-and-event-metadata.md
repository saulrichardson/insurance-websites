# Frontend Backend Smoke And Event Metadata

- date: 2026-06-09

## Context

The production insurance site needed an end-to-end verification pass for every
frontend path that currently causes backend writes: public quote form submit,
admin status update, and admin note creation.

## Record

The production-changing frontend surfaces are:

- `QuoteForm` on `tracyzhanginsurance.com/contact` posts to `/api/leads`
- `/api/leads` writes `leads`, `lead_consents`, and a notification event
- `/admin/leads` signs in with server-side session auth
- admin status updates write `leads.status` and a `status_updated` event
- admin notes write an `admin_note` event

During the smoke, `lead_events.metadata` was found to be stored as JSON strings
inside the `jsonb` column. The writer now uses the Postgres JSON binding so
metadata persists as queryable JSON objects. Existing production event rows
were repaired from JSON string metadata to JSON object metadata.

The staged Vercel deploy script now excludes local `.env*` files except
`.env.example` from the temporary deploy root.

## Evidence

- Public form smoke on `www.tracyzhanginsurance.com` created request
  `4a5e7603-4500-4404-9b08-a3ae4cc24e1d` with marker
  `FRONTEND_SMOKE_DEPLOYED_20260609040049`.
- The API returned `notification: "sent"`.
- The lead row persisted source domain/path, UTM fields, campaign slug,
  product interest, preferred contact, and contact consent.
- Resend notification event persisted with `metadata.provider = resend`,
  `metadata.attempted = true`, and Resend id
  `d44bdd81-9a53-42df-8fa5-df6f0f19d2be`.
- Admin UI smoke signed in through the deployed login form, changed the same
  lead to `contacted`, and added an internal note.
- Final production DB read for the request showed event types
  `notification_sent`, `status_updated`, and `admin_note`.
- Production `lead_events` metadata type count after repair and redeploy was
  `object = 6`, with zero string metadata rows.
- Checks passed before production deploy:
  `pnpm lint:tracy-zhang-insurance`, `pnpm test`, and
  `pnpm build:tracy-zhang-insurance`.
- Production deployment
  `san-marino-insurance-jkqrd5azl-saulrichardsons-projects.vercel.app` was
  created and aliased to the insurance domains.

## Future Guidance

When testing frontend paths that write backend state, verify both the browser
result and the persisted rows. For lead events, check `jsonb_typeof(metadata)`
when metadata shape matters; successful writes are not enough if future
automation needs to query provider ids, statuses, or routing attributes.

Keep disposable smoke leads clearly named with `Codex` and a timestamp. Do not
delete them when the user wants to see real inbox/admin effects; do clean them
up when running routine deployment smokes that are not meant to be user-visible.
