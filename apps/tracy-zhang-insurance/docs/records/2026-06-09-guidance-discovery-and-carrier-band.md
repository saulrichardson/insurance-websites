# Guidance Discovery And Carrier Band

- date: 2026-06-09

## Context

The user could not easily find the newly published story from the public
website and called out that the carrier strip's horizontal scrolling behavior
looked aesthetically weak.

## Record

Guidance/blog content should be discoverable from the homepage as a first-class
editorial surface, not only as a header nav item, a sitemap route, or a generic
button. The homepage should expose the latest story through a distinctive
coverage-note object that links directly to the article.

The header carrier presentation should not look like a scroll widget. Carrier
names may wrap gracefully, but the public header should avoid visible horizontal
scrollbars or drag rails for normal desktop viewing.

## Evidence

- `apps/tracy-zhang-insurance/src/app/page.tsx` adds a linked latest coverage
  note near the first screen for canonical and local homepages.
- `apps/tracy-zhang-insurance/src/components/Header.tsx` replaces the
  `overflow-x-auto` carrier pill rail with a grouped, wrapping carrier band.
- Local Chrome verification showed the carrier band had equal `clientWidth` and
  `scrollWidth`, meaning no horizontal overflow in the tested desktop viewport.

## Future Guidance

When adding stories, campaign guidance, or seasonal articles, keep the route
discoverable through an editorial object or content surface that fits the page's
visual language. Avoid solving discovery with another ordinary button unless
the button is part of a larger, intentional interaction pattern.
