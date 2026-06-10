# Campaign Building Blocks Before Agents

- date: 2026-06-09

## Context

After Resend was configured for production lead notifications, the engagement
strategy expanded toward email marketing, SMS campaigns, inbound replies, and
eventual AI conversations. The user clarified that the immediate need is not to
build a full agentic system. The user then corrected the scope again: do not
overbuild a complete engagement platform before the first production campaigns
require it.

## Record

Do not jump from the current lead-capture system directly to autonomous inbound
or outbound AI agents. Also do not build a generalized CRM, webhook platform,
conversation system, or full campaign engine merely because those may become
useful later.

The correct near-term model is a production-minimum campaign setup:

- Resend audience/campaign readiness for email-first outreach
- a verified campaign sender and real reply-to mailbox
- simple policy/account CSV import for the home-without-auto audience
- simple third-party lead CSV import or upload for lead distribution
- enough consent, suppression, and source fields to avoid blind outreach
- UTM naming and landing-page links for campaign measurement
- producer assignment output through the simplest working surface: admin table,
  CSV export, or task list

Business logic is not defined yet. Do not hardcode segment definitions,
producer-routing rules, provider-specific assumptions, scoring logic, or
campaign-specific automation before the data and operating policy are known.
Build configurable import, audience, source, suppression, UTM, and assignment
building blocks instead.

Autonomous AI conversations and richer contact/conversation history may become
valuable later, but they should not be prerequisites for the first campaigns.

The first expected workflows are examples to enable, not rules to bake into the
application:

- identifying customers with home/property coverage but no visible auto line,
  then running an email-first cross-sell campaign;
- importing leads from third-party providers, doing basic dedupe/consent review,
  and assigning them to internal producers.

## Evidence

- `apps/tracy-zhang-insurance` already stores leads, consent copy version,
  source domain, source path, UTM fields, lead events, and admin status.
- Production lead notifications are live through Resend using the verified
  `tracyzhanginsurance.com` sending domain.
- Root docs already identify future email/SMS operations as a portfolio goal,
  but needed this clarification to prevent premature agentic implementation.
- The user identified home-without-auto cross-sell and third-party lead
  distribution as the first likely workflows.
- The user corrected the plan when it became too focused on nonessential
  production details.
- The user clarified that business logic is not yet defined and should not be
  hardcoded before production data and campaign policies exist.

## Future Guidance

When implementing the next layer, build only what the first production campaign
needs:

1. set up the campaign sender/reply-to and Resend audience;
2. create the simplest configurable import path for the data file in hand;
3. add only the minimum suppression, consent, and assignment fields needed to
   run the workflow responsibly;
4. use Resend's built-in campaign/audience tools before building custom
   campaign UI;
5. defer Twilio, provider webhooks, custom AI endpoints, generalized
   conversation history, and CRM-style abstractions until a production workflow
   creates a concrete need.
