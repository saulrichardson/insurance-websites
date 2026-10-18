# Tracy’s Insurance Homepage Preview

- date: 2026-10-18

## Purpose

The owner requested a complete homepage preview using the agreed design
principles, including a strong mobile experience and direct call, text and email
contact. Consumer intake forms are excluded.

## Design and implementation

The preview lives at `previews/tracys-insurance/` and uses the main-brand
minimalist direction from the earlier domain design study: a soft blue canvas,
large typography, real local imagery, limited navigation and clear contact
choices. It introduces the agency through everyday coverage questions, Tracy's
portrait, supported languages and the two actual offices. San Marino's garden
and La Palma's City Hall are labeled as community photographs, not premises.
No review scores, savings guarantees, new office locations or testimonials were
invented for the design.

A mobile contact bar, responsive image crops, menu disclosure and expandable
coverage descriptions make the page usable on a phone. The entrance and scroll
reveals honor reduced motion. Basic content and contact links remain available
without JavaScript. Source, styles, behavior, font licenses and photographs are
preserved together for later integration into the existing Next.js app.

The current shared domain module supplies the reference office facts and
hello mailbox. This preview has no production telemetry or visitor capture.
The final Next.js implementation must reuse the shared contact behavior,
market-specific routing and SEO contracts.

## Preview deployment

The static Vercel Build Output deployment is READY on the existing
san-marino-insurance project, with no production target or domain changes:

https://san-marino-insurance-7crgys6qi-saulrichardsons-projects.vercel.app

Deployment ID: `dpl_CzC1cyH91H1iBb7c1pyzbDwBuG2S`.
The preview has HTML noindex metadata and an X-Robots-Tag header. Existing
Vercel preview access policies still apply. Its local equivalent is served at
http://127.0.0.1:8848/ while the development server is running.

## Verification

The local browser check covered widths 320, 360, 390, 430, 768, 1024 and 1440.
At every size, the document fit the viewport, all photographs and the local
font loaded, in-page anchors resolved, and no forms or input controls existed.
The mobile contact bar's buttons measured 46 pixels high. No JavaScript page
errors occurred in the interaction checks.

The menu opened and closed, Escape restored focus to its toggle, selecting an
in-page destination closed the menu, and the coverage accordion expanded.
Reduced-motion emulation disabled the hero animation. Full desktop and mobile
screenshots and the browser verification script are retained locally under
`output/playwright/`. Calls, texts and emails were inspected as protocol links;
no real calls or messages were initiated by these tests.

## Next step

Review the complete desktop and mobile composition before making this the live
homepage. After design review, integrate with the production app, prepare
reviewed Chinese content, verify contact-event receipt and run the existing SEO,
lint and build checks. Improve the portrait and add approved actual team or
premises photography when available.

The owner rejected the arrow-shaped T symbol. The header now uses the text
wordmark alone; the browser icon uses a plain T. Preserve the preference for
simple typography rather than reintroducing that symbol.

The wordmark is “Tracy’s Insurance” with no trailing period in the header or footer.

The owner subsequently requested broader Los Angeles and Orange County framing.
The region headings now lead with Los Angeles and Orange County; explicit
San Marino office and La Palma office labels retain the actual locations.
Huntington Beach Pier at sunset by TeKappa (CC BY-SA 4.0) replaces La Palma
City Hall as Orange County imagery, with source and license in the page footer.
The addresses, telephone numbers and office-specific language lists are unchanged.
