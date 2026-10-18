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
| hello@tracysinsurance.com | General business inquiries | Saved alias into Saul's mailbox |
| careers@tracysinsurance.com | Recruiting inquiries | Saved alias into Saul's mailbox |
| saul@tracyzhanginsurance.com | Previous operator address | Automatically retained alias |
| tracy@tracysinsurance.com | Possible future named account | Not created |

Aliases receive into the existing mailbox; they have no independent Google
sign-in. Receiving aliases does not establish that Gmail is configured to send
from those addresses. No new paid seat was added. No user, subscription or
domain was deleted.

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

## Remaining completion checks

1. Send a message from an existing owner-controlled external mailbox to the
   primary address and each alias. Verify all three arrive in the renamed inbox.
2. Send an outbound test from the new primary address and reply to it. Inspect
   the received message headers for SPF, DKIM and DMARC results and the visible
   sender name, From address and Reply-To. A DNS check alone does not prove this.
3. Configure and test Gmail Send mail as for `hello@` and `careers@` if those
   addresses will be used for replies. Confirm the default sender explicitly.
4. Update this Workspace organization's old display label and Gmail signatures
   to Tracy's Insurance. Keep Saul's personal user name as Saul Richardson.
5. Check recovery access and ownership of Analytics, Search Console, hosting
   and DNS using the renamed account before retiring old custom-domain access.
6. Implement the main website brand and canonical-domain migration, then update
   public contact details and relevant business profiles together. Keep calls,
   texts and email prominent; do not add consumer intake forms.

## Evidence and operating guidance

Private Admin confirmation extracts and DNS snapshots are retained in the
operator workspace at `outputs/workspace-pivot-2026-10-18/`. Confirmation
extracts show the updated primary domain, active user, saved aliases and selected
DKIM domain. They are verification evidence, not customer-facing copy.

All project files belong under `/Users/saulrichardson/projects`. This chat's
older Documents working directory no longer exists. Native browser runtimes
failed to start in that missing directory. Chrome and its extension passed the
installed diagnostic checks, but the current chat still lacks exposed browser
control tools. Resolve the chat working directory and reload its native tools
before making further UI changes; do not substitute Python or AppleScript for
the Chrome control requested by the owner.

Before saving any later setting, verify the selected tenant, domain and exact
address. After saving, reopen or read back the value. Use actual delivery and
received headers to close the email setup; do not mark these checks complete
from configuration confirmations alone.
