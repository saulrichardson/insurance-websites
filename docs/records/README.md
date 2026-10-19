# Project Records

Records are durable project memory.

Use this directory for anything future agents should understand after the
current task is over: decisions, caveats, stack choices, architecture rationale,
risks, constraints, lessons, operating notes, feature context, and important
tradeoffs.

Create a record when the reasoning matters more than the current edit.

Create a record when the user corrects the project's abstraction, scope, product
shape, or success standard. These corrections are durable project knowledge.
Capture what the project was being incorrectly reduced to, what the user
clarified it should be, what future work should preserve, what future agents
should avoid, and what evidence or examples support the correction.

Use short dated filenames:

```text
YYYY-MM-DD-short-topic.md
```

Examples:

```text
2026-01-15-frontend-stack.md
2026-01-20-report-export-caveats.md
2026-02-03-billing-state-model.md
2026-02-10-deployment-notes.md
```

## Shape

```markdown
# <record title>

- date: YYYY-MM-DD

## Context

What happened, changed, or became clear?

## Record

What should future agents know, preserve, choose, avoid, migrate, or revisit?

## Evidence

What code, tests, commands, examples, data, user feedback, production signals,
or constraints support this record?

## Future Guidance

How should this affect later work?
```

## Practical Rule

Use `product-intent.md` for the product north star.

Use `approach.md` for the current stack, architecture, constraints, and delivery
model.

Use records for the reasoning that explains how the project got here and what
future agents should remember.

- `2026-10-18-direct-contact-online-presence.md`: owner direction, public audit, direct contact fixes, and account work remaining.
- `2026-10-18-analytics-search-operations.md`: authenticated Analytics changes, contact key events, cross-domain settings, Search Console findings, and measurement limits.
- `2026-10-18-tracys-insurance-domain.md`: newly purchased marketing domain, redirect configuration, email boundaries, and verification.

- `2026-10-18-workspace-brand-pivot.md`: new primary domain, mailbox and aliases, mail authentication, verified sender and recovery settings.
- `2026-10-18-email-delivery-and-service-ownership.md`: native Chrome verification, saved sender/signature settings, three passing delivery tests, service owners, verified recovery configuration, and the subsequent website release scope.
- `2026-10-18-website-brand-domain-migration.md`: live agency branding and public email, deployed canonical-domain migration, permanent redirects, Google move request, Analytics updates, verification and rollback.
- `2026-10-18-tracys-homepage-preview.md`: working main-brand homepage preview, responsive checks, deployment and integration boundaries.
- `2026-10-18-approved-homepage-launch.md`: approved design integrated into the main Next.js homepage, responsive checks, contact tracking, production deployment and rollback reference.
