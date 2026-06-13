# Guidance Journal Navigation

- date: 2026-06-13

## Context

The transition from the insurance homepage into a guidance story felt visually
unfinished and too basic. The header also exposed too many persistent
destinations, which made the site feel less focused than modern resource-led
startup websites such as Bretton.

## Record

Treat guidance as a first-class journal/resource system on the canonical
insurance app, not as a generic blog grid or a plain article template.

Use a reduced persistent navigation model:

- insurance app: Products, Guidance, Offices or Location, Contact
- advisor app: Profile, When to call, Offices
- keep one primary header CTA for the main conversion path
- keep schedule/email actions in mobile menus, body CTAs, contact surfaces, and
  office cards rather than crowding the desktop header

The canonical article bodies and guidance SEO remain on
`tracyzhanginsurance.com/stories`. The advisor site may feature guidance as a
bridge, but it should not become a duplicate blog.

Route changes across both public apps should use the shared page-transition
pattern in each root layout. The transition should be subtle, route-keyed, and
disabled for visitors who prefer reduced motion.

## Evidence

- `apps/tracy-zhang-insurance/src/app/stories/page.tsx` now presents a
  journal-style guidance index with a featured guide, topics, and compact
  archive cards.
- `apps/tracy-zhang-insurance/src/app/stories/[slug]/page.tsx` and the
  Chinese story route use an editorial hero, visual fallback, side metadata
  rail, prose treatment, and grouped post-article actions.
- `apps/tracy-zhang/src/app/page.tsx` and `apps/tracy-zhang/src/app/zh/page.tsx`
  keep the advisor site as a bridge into canonical guidance.
- Local checks on June 13, 2026: `pnpm install --frozen-lockfile`,
  `pnpm hygiene:check`, `pnpm lint:all`, `pnpm build:all`, `pnpm test`,
  `pnpm i18n:check`, and the local SEO contract command with explicit
  production-server origins. The SEO contract passed 59/59 checks.
- The staged insurance Vercel package was recreated, installed with
  `pnpm install --frozen-lockfile`, verified to exclude pulled env files, and
  built successfully.
- In-app Browser layout checks covered the guidance index, FAIR Plan article,
  Chinese FAIR Plan article, advisor home, and Chinese advisor home at desktop
  and 390px mobile widths. The pass found mobile overflow on the guidance
  index from a fixed story-image minimum height; `StoryVisual` now uses a
  responsive minimum height and the guidance index scroll width matches the
  390px viewport.

## Future Guidance

When adding or redesigning guidance, preserve the journal/resource model and
avoid returning to a crowded header or a generic card grid. Different sites can
have different product roles, but guidance organization, article polish, and
the route-transition pattern should stay consistent across the public
portfolio.
