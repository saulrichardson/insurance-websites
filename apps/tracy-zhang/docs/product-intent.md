# Tracy Zhang Product Intent

This app is the advisor profile and contact website for `tracyzhang.com`.

## North Star

Present Tracy Zhang as a trusted local insurance advisor who helps people make
clear coverage decisions before they compare options, request documents, or
start a quote.

The site should make Tracy easy to evaluate by name:

- Tracy is the first-viewport signal.
- The primary promise is clear, practical insurance guidance.
- Office and direct contact details stay easy to find.
- Languages, public review context, and local office proof matter here.
- Coverage paths should be written around customer moments, not internal site
  structure.
- Tracy Zhang Insurance remains the place for product depth, quote intake,
  certificates, and business-specific coverage detail.
- Chinese-speaking visitors can evaluate Tracy by name and language fit through
  a first-class `/zh/` advisor profile that routes product-depth needs to the
  Chinese Tracy Zhang Insurance pages.

## Who It Serves

- People searching for Tracy Zhang by name
- Existing clients looking for direct office contact details
- Families reviewing home, auto, umbrella, renters, condo, or life coverage
- Property owners dealing with California market questions
- Business owners who need a certificate, contract review, or commercial quote
- Future developers maintaining the distinction between advisor profile and
  product-depth marketing

## Core Workflows

### Evaluate Tracy

```text
visitor lands on tracyzhang.com
  -> sees Tracy's name, portrait, role, languages, offices, and review context
  -> calls Tracy or opens a relevant coverage path
```

### Start Insurance Help

```text
visitor has a coverage question
  -> chooses the customer moment that matches their need
  -> lands on the relevant Tracy Zhang Insurance page or quote intake
```

### Reach A Local Office

```text
visitor needs a phone number, appointment, or directions
  -> opens #offices
  -> calls San Marino or La Palma directly
```

### Route Product Depth

```text
visitor needs product detail, quote intake, certificates, or campaign content
  -> chooses an explicit advisor-site path
  -> lands on the relevant Tracy Zhang Insurance surface
```

## Current Source Artifacts

- Homepage: `src/app/page.tsx`
- Header/nav: `src/components/site-header.tsx`
- Footer: `src/components/site-footer.tsx`
- Site/agent data: `src/lib/site.ts`
- Schema: `src/lib/schema.ts`
- Sitemap: `src/app/sitemap.ts`

## Product Boundaries

- Do not rebuild a second full insurance-agency homepage here.
- Do not describe the split between websites in visible copy.
- Do not add hidden quote/career workflows here unless the product role changes.
- Keep product-depth marketing, business placement, and quote intake in
  `apps/tracy-zhang-insurance`.
- Do not clone the personal site into a separate Chinese site. The Simplified
  Chinese path belongs at `/zh/` and should remain an advisor trust surface.

## Visual Role

The homepage should feel like an advisor dossier, not an insurance product
catalog. The first viewport should establish Tracy by name with portrait,
office phone path, review context, languages, and a concise advisor promise. Coverage
paths should be framed as reasons to call or start help, then route to Tracy
Zhang Insurance for product depth and quote intake.
