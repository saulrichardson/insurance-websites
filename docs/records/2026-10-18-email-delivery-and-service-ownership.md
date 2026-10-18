# Email Delivery and Service Ownership Verification

- date: 2026-10-18

## Context

The owner requested a fresh chat under the real projects directory to finish
the Tracy's Insurance Workspace pivot using native Chrome control. The
installed `cua_repl` interface successfully inspected and operated the existing
authenticated agency Admin/Gmail tabs and the owner's external Gmail session.
No Documents directory, diagnostic symlink, replacement Chrome automation,
paid seat or subscription was created.

The authoritative checkout remains the GitHub migration repository on
`codex/online-presence-direct-contact-2026-10-18`, continuing PR 5 on PR 4.
Do not deploy the older checkout or main branch as a substitute.

## Saved settings

Admin showed `saul@tracysinsurance.com` signed in, selected
`tracysinsurance.com` for DKIM, and “Authenticating email with DKIM.” Existing
DNS and domain configuration were not repeated. Admin's organization profile
name was changed from `Allstate | Tracy Zhang` to **Tracy's Insurance**, and the
saved value was read back with “Name updated.” Saul Richardson remains the
personal user name. Some existing Gmail page titles still displayed the old
organization label during this session; the new sender-setup popup displayed
Tracy's Insurance. Do not mistake cached UI branding for an unsaved Admin name.

| Gmail sender | Display name | New-message default |
| --- | --- | --- |
| saul@tracysinsurance.com | Saul Richardson | Yes |
| hello@tracysinsurance.com | Tracy's Insurance | No |
| careers@tracysinsurance.com | Tracy's Insurance Careers | No |

Both aliases were added through Gmail Send mail as, with “Treat as an alias”
enabled. The saved reply preference is “Reply from the same address the message
was sent to.” Test reply composers automatically selected the correct address.
No separate Reply-To override was configured or present in the received test
messages. All three messages used `saul@tracysinsurance.com` as the SMTP
Return-Path; both alias From domains remained aligned with SPF and DKIM.

One business signature is assigned to new messages and replies/forwards for
each of the three addresses:

```text
Saul Richardson
Tracy's Insurance
San Marino: (626) 300-8338
La Palma: (562) 402-4375
tracysinsurance.com
```

The signature appeared in received messages. After those tests, the “Insert
signature before quoted text” preference was enabled and read back after
saving. The sender table, reply preference and signature defaults were reopened
and verified. Aliases remain part of the single existing mailbox and are not
separate sign-ins.

## Delivery evidence

The owner-controlled external Gmail sent three separate messages with subjects
`Tracys mail check 2026-10-18 — primary`, `— hello`, and `— careers`.
Each was opened in the agency mailbox and replied to from its receiving
address. The received replies were examined through Gmail's Show original UI
between approximately 17:36 and 17:38 America/New_York.

| Address tested | Inbound result | Reply received externally | Received authentication |
| --- | --- | --- | --- |
| saul@tracysinsurance.com | Received; initially Spam, corrected with Report not spam | Inbox; 14-second delivery shown | SPF PASS, DKIM PASS, DMARC PASS |
| hello@tracysinsurance.com | Inbox | Inbox; 13-second delivery shown | SPF PASS, DKIM PASS, DMARC PASS |
| careers@tracysinsurance.com | Inbox | Inbox; 12-second delivery shown | SPF PASS, DKIM PASS, DMARC PASS |

DKIM used `d=tracysinsurance.com` and selector `google` in all three replies.
DMARC evaluated `header.from=tracysinsurance.com`, with the existing monitoring
policy `p=none`. Names, From addresses and signature content matched the saved
configuration. No customer or applicant data was used and no marketing was
sent. These are real Gmail-to-Workspace-to-Gmail delivery tests; other receiving
providers and universal inbox placement have not been established.

The first primary test's spam banner said it resembled previously identified
spam. Reporting that known test as not spam moved it to Inbox, and Gmail
confirmed future mail from the sender would go to Inbox. No broad spam filter
or authentication protection was disabled.

## Recovery and service access

The Workspace organization profile lists `saul@tracysinsurance.com` as primary
admin and the owner's external Gmail as secondary contact. Reloading the older
user-details tab requested Google password reauthentication. The user was asked
to complete that sign-in, and the tab was retained for handoff. **User-level
recovery email/phone and security configuration remain unverified.** A secondary
organization contact is not evidence that user recovery is configured.

Existing services were checked under their actual independent owner identity:

| Service | Read-back evidence |
| --- | --- |
| GA4 insurance property | Property access management listed one user: the owner's external Gmail, Administrator |
| Search Console: main old domain, San Marino, La Palma | Each listed the external Gmail as its sole verified owner |
| Search Console: tracyzhang.com | External Gmail and a second owner-controlled Gmail were both verified owners |
| Cloudflare account holding tracysinsurance.com | External Gmail was active; member policy showed Entire account, Super Administrator - All Privileges |
| Vercel | Existing CLI session authenticated as the external Gmail/saulrichardson, in saulrichardsons-projects; both website projects were accessible and owned by that team |

No old custom-domain user appeared in those inspected service permission lists.
No ownership transfer or new permission grant was made. The renamed Workspace
identity was not added to external services; its independent access is not
claimed. Preserve the functioning external owner and the old Workspace alias
until any intentional ownership migration is verified.

Vercel's browser was signed out. The installed Vercel CLI's read-only
`whoami --format json` and explicit project inspections provided the hosting
evidence instead. The repository's root `.vercel` context resolves to the
personal `insurance-websites` project, with root `apps/tracy-zhang`. The agency
project was separately inspected as `san-marino-insurance` in the same team.
No linking, deployment, environment changes or authentication repairs occurred.

## Next website release

Email is operational for the three tested addresses. The public website brand
and canonical migration have not been implemented or deployed. Current source
still sets the old canonical domain and brand in `packages/domain/src/index.ts`,
and `publicContact.email` still points to the separate carrier address.

Prepare one coordinated release from this branch:

1. Set the approved brand, canonical host and tested public hello address in
   shared domain data. Update English/Chinese copy and metadata consistently,
   retaining personal advisor identity, exact office contact routing and no
   consumer intake forms. Preserve existing internal referral workflows.
2. Update both apps' cross-site links and the insurance site's canonical,
   hreflang, JSON-LD, sitemap/robots and production URL configuration. Preserve
   San Marino and La Palma self-canonical entry pages and the personal site's
   `www.tracyzhang.com` canonical host. Update the executable SEO contracts.
3. Coordinate Vercel routing with the deployed new canonical host. Remove the
   current new-to-old 307 before introducing old-to-new permanent redirects,
   avoiding a loop; preserve deep paths and campaign query strings. Keep the
   previous deployment/routing state available for rollback.
4. Verify the new Search Console property, submit its sitemap and handle the
   old-to-new move after the public routes work. Update the GA4 domain condition
   and Search Console link as appropriate, retaining the existing property and
   measurement ID. Actual contact-event receipt is still a separate open check.
5. Verify both app builds, relevant tests, local and production SEO contracts,
   direct-contact behavior and representative desktop/mobile layouts. Follow
   the existing app-specific Vercel deploy paths. Website testing is required
   for that release; no application rebuild was needed for this account and
   documentation work.

The design study is still a study. Bespoke office/personal layouts can build on
the shared behavior, with reviewed real assets and facts. A public design
rollout must not be described as already complete based on email setup.

## Private evidence

Raw UI extracts, received test headers and screenshots are stored only in the
owner's existing `outputs/workspace-pivot-2026-10-18/` directory. The saved
`verification-summary.json`, `send-as-saved.txt`, `signature-saved.txt`, three
received-original records and service-ownership extracts support this record.
Do not commit those private account extracts to the repository.
