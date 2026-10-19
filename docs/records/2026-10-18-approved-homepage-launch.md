# Approved Main Homepage Launch

- date: 2026-10-18

## Owner direction

The owner approved the complete homepage preview and requested that it become
the live homepage, with mobile verification. The final direction uses warm
ivory, muted cinnabar red, dark text and small antique-gold accents. Preserve
the text-only Tracy’s Insurance wordmark without a period and the Los Angeles
and Orange County regional framing. San Marino and La Palma remain explicit
as the actual office locations. Contact is by call, text and email only.

## Integration

The approved composition is now a React homepage within the existing Next.js
application. `SiteFrame` selects its own frame for the English canonical `/`
route; product, guidance, Chinese-language and local-domain pages retain their
existing frames. Styles are scoped to the homepage to prevent typography,
colors or spacing from changing other routes after client navigation.

`TracysHome` uses the shared office and public email records and the shared
marketing-event function. Phone, SMS and email clicks are tracked with their
protocol destination and office. Product, guidance, contact, legal and Chinese
links remain crawlable. Shared metadata, language alternates, structured data,
site telemetry and visitor capture remain in the application. The homepage
favicon uses the approved plain T in cinnabar.

The previous canonical homepage implementation was removed. The raw approved
standalone preview remains available as the design reference. Its noindex
metadata was not copied into the production homepage.

## Verification before publication

- Insurance app lint, TypeScript and production build passed.
- All 31 existing tests and workspace hygiene checks passed.
- All 59 SEO contracts passed against the local production server and the live
  unchanged personal advisor site, including both local domains and Chinese
  routes.
- Browser checks passed at widths 320, 360, 390, 430, 768, 1024 and 1440 without
  horizontal overflow. Images and fonts loaded; no consumer form fields exist.
- The mobile menu, Escape focus, navigation close behavior, coverage accordions
  and reduced-motion behavior passed.
- Intercepted contact clicks emitted phone_click, sms_click and email_click;
  the Orange County office emitted the correct La Palma telephone destination.
  Tests prevented real calls or messages. Navigating to a product page and back
  preserved exactly one header and one main region.

## Deployment

Use the staged pnpm source deployment for the full application. The preceding
production deployment is `dpl_HbobE1KiLKEM2pV5Ri8QxsBY53Md`, retained for rollback.
The final production deployment is `dpl_DnEpwZtiSZAPCj5X3drcH1KiRGTT`,
READY and aliased to https://tracysinsurance.com/. It includes the final
photography-credit copy cleanup. The final public homepage check returned
HTTP 200 with the approved design and without preview-only credit wording.

## Public verification

The production homepage returned HTTP 200 with the new design, canonical URL
and indexable metadata. The legacy main domain reached the new homepage through
its existing redirect. Both local office domains and the Chinese homepage
returned HTTP 200 with their existing designs. All 59 production SEO contract
checks passed after publication.

Live browser checks passed at 320, 390 and 1440 pixels. The cinnabar palette,
text-only wordmark, beach image, single header/main and mobile menu were present.
The three mobile contact links retained their correct protocols and targets;
no forms appeared. No JavaScript page errors occurred. Live screenshots and
HTTP results are retained under `output/playwright/tracys-live-*` locally.
