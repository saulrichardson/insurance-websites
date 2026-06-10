# Clean Source Architecture

- date: 2026-06-10

## Context

The user clarified that the production source should not preserve backwards
functionality, glue code, or compatibility shims. The repo had already moved to
the two-app monorepo model, but several old paths and names still remained:
personal-site redirects, insurance `/team` and `/thanks` redirects,
contractor-prefixed auto lead API/admin/intake paths, and contractor-prefixed
auto lead persistence names.

## Record

The clean product model is direct:

- `apps/tracy-zhang-insurance` owns insurance product depth, quote capture,
  campaign surfaces, localized `/zh` pages, and auto lead intake.
- `apps/tracy-zhang` owns only the advisor profile surfaces `/` and `/zh`,
  plus homepage anchors and explicit links into the insurance app.
- Auto lead intake uses `/auto-lead-intake`, `/api/auto-leads`,
  `/admin/auto-leads`, `auto_leads`, `auto_lead_events`, submitter fields, and
  auto-lead source names.
- Current source should not reintroduce contractor-prefixed public routes,
  admin routes, API routes, helper names, environment variables, or table names.
- App-level redirects for old personal-site product/backend paths should not be
  restored unless a new production contract explicitly makes them current
  behavior again.

## Evidence

- `apps/tracy-zhang/next.config.ts` has no app-level legacy redirects.
- `apps/tracy-zhang-insurance/vercel.json` keeps security headers without
  `/team` or `/thanks` redirects.
- `apps/tracy-zhang-insurance/src/app/api/auto-leads/route.ts` owns the auto
  lead API directly.
- `apps/tracy-zhang-insurance/src/lib/auto-lead-store.ts` uses `auto_leads`
  and `auto_lead_events`.
- `apps/tracy-zhang-insurance/sql/leads.sql` creates the current tables and
  renames the first implementation's contractor-prefixed tables and columns
  when they exist.

## Future Guidance

Treat compatibility as a product requirement, not a default. If a future route,
alias, redirect, env var, or persistence name exists only to preserve old
behavior, remove it or require an explicit current production contract. For
database renames, prefer one-way migrations that move existing production data
into the current model instead of keeping runtime aliases.
