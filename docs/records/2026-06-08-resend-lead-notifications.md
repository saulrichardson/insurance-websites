# Resend Lead Notifications

- date: 2026-06-08

## Context

Production lead capture already stored requests and admin events, but email
delivery was still pending because the Vercel project lacked a Resend API key
and verified sender.

## Record

Lead notification email is now live for `apps/tracy-zhang-insurance`.

- The Vercel project `san-marino-insurance` has production `RESEND_API_KEY`.
- `LEADS_FROM_EMAIL` is set to
  `Tracy Zhang Insurance <leads@tracyzhanginsurance.com>`.
- `LEADS_TO_EMAIL` remains the internal recipient list.
- The Resend domain `tracyzhanginsurance.com` is verified.
- Required Resend DNS records live in the Cloudflare zone for
  `tracyzhanginsurance.com`.

The API key itself must not be committed, logged, or stored in docs. Keep it in
Vercel/project secret storage and Resend. If a local copy is temporarily used
for setup, delete it after verification.

## Evidence

- Resend direct send from `leads@tracyzhanginsurance.com` to
  `saulrichardson44@gmail.com` returned HTTP 200 with Resend email id
  `6642b4a7-d265-4975-b3fe-cb56242c1e1f`.
- Production deploy
  `san-marino-insurance-ndwyyyj87-saulrichardsons-projects.vercel.app` was
  created after the env update and aliased to the insurance domains.
- A production `POST https://tracyzhanginsurance.com/api/leads` smoke returned
  `notification: "sent"` for request id
  `02125653-2cd4-40d3-a2fc-5c2537da708b`.
- The corresponding `lead_events` row was `notification_sent` with
  `metadata.provider = resend` and `metadata.attempted = true`.
- The disposable smoke lead was deleted after verification.

## Future Guidance

For campaign launch readiness, add monitoring around failed notification events
and consider whether a customer autoresponder should be added as a separate
explicit workflow. Do not use Resend Broadcasts or marketing contacts for lead
notification unless the product direction changes.
