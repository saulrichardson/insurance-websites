# Tracy's Insurance Workspace Migration

- date: 2026-10-18

## Purpose

Use Tracy's Insurance as the agency's main business identity while retaining
Tracy Zhang as the personal advisor identity. Repurpose the existing Google
Workspace subscription so the operator can sign in, receive inquiries and
manage business services under the new domain. The owner approved a hard pivot
and does not require historical data migration or a long parallel-brand period.

## Saved configuration

Google Admin confirmed the primary domain changed from
`tracyzhanginsurance.com` to `tracysinsurance.com`. The old domain remains
secondary. The existing active Saul Richardson user now has the primary address
`saul@tracysinsurance.com`; the same mailbox and subscription were retained.
The renamed Gmail inbox opened under the new address.

| Address | Role | Status |
| --- | --- | --- |
| saul@tracysinsurance.com | Operator and administrator | Active primary user |
| hello@tracysinsurance.com | General business inquiries | Receiving alias and tested Gmail sender |
| careers@tracysinsurance.com | Recruiting inquiries | Receiving alias and tested Gmail sender |
| saul@tracyzhanginsurance.com | Previous operator address | Automatically retained alias |
| tracy@tracysinsurance.com | Possible future named account | Not created |

Aliases receive into the existing mailbox; they have no independent Google
sign-in. Gmail Send mail as was subsequently configured and tested for both
aliases. Saul remains the default sender for new messages; replies use the
address that received the message. No new paid seat was added. No user,
subscription or domain was deleted.

The carrier-issued `tzhang@allstate.com` account and Allstate domain are outside
this migration. Public contact information on deployed websites still needs a
separate coordinated brand update.

## Mail authentication

Google verification and Gmail activation completed in Admin. Cloudflare DNS
was changed only in the new `tracysinsurance.com` zone, preserving its website
records. Public DNS was rechecked on October 18:

| Record | Published configuration |
| --- | --- |
| MX at root | Priority 1, smtp.google.com |
| SPF at root | v=spf1 include:_spf.google.com ~all |
| DKIM at google._domainkey | Google generated 2048 bit RSA public key |
| DMARC at _dmarc | v=DMARC1; p=none; rua=mailto:saul@tracysinsurance.com; adkim=r; aspf=r |

The Admin page for the selected `tracysinsurance.com` domain showed
“Authenticating email with DKIM” and a “STOP AUTHENTICATION” control. The public
DKIM key matches the saved Admin value. DNS TXT strings can be split into
multiple quoted chunks; concatenate those chunks before comparing the key.
DMARC currently collects reports without asking receivers to quarantine or
reject messages. Tightening it should follow delivery and sender verification.

## Verified follow-up and remaining checks

The fresh chat under the real projects directory successfully initialized
native Chrome control. The Workspace organization name was saved as
**Tracy's Insurance**. Saul's personal name remains Saul Richardson. A business
signature was saved for new mail and replies from all three new-domain
addresses. The organization profile lists the renamed primary admin and the
owner's external Gmail as secondary contact.

Three separate inbound tests reached the mailbox. The primary-address test
initially went to Spam and was marked not spam; both alias tests reached Inbox.
Replies from all three addresses reached the external owner's Inbox, with
SPF, DKIM (`tracysinsurance.com`) and DMARC all passing. The received headers
confirmed the expected From names and addresses. See
[delivery and service ownership evidence](2026-10-18-email-delivery-and-service-ownership.md)
for the test matrix, limitations and next website release.

1. Complete Google's requested Admin reauthentication, then inspect the user's
   recovery email/phone and security settings. Organization secondary contact
   is verified; it is not proof of user-level recovery configuration.
2. Existing service access has been checked under its actual external Gmail
   owner, independently of the Workspace identity. Do not delete the old
   Workspace alias/domain or move service ownership based on the rename alone.
3. Implement the main website brand and canonical-domain migration, then update
   public contact details and relevant business profiles together. Keep calls,
   texts and email prominent; do not add consumer intake forms.

## Evidence and operating guidance

Private Admin confirmation extracts and DNS snapshots are retained in the
operator workspace at `outputs/workspace-pivot-2026-10-18/`. Confirmation
extracts show the updated primary domain, active user, saved aliases and selected
DKIM domain. They are verification evidence, not customer-facing copy.

All project files belong under `/Users/saulrichardson/projects`. The older
Documents working directory no longer exists. Native browser runtimes failed
there, but native Chrome control works in the fresh projects chat through
`cua_repl`. Use that supported browser interface; do not recreate Documents
paths or substitute Python, AppleScript or other Chrome automation.

Before saving any later setting, verify the selected tenant, domain and exact
address. After saving, reopen or read back the value. Use actual delivery and
received headers to close the email setup; do not mark these checks complete
from configuration confirmations alone.
