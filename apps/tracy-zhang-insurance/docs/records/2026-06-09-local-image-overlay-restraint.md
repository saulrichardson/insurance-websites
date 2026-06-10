# Local Image Overlay Restraint

- date: 2026-06-09

## Context

The user called out the San Marino local image overlay sentence, "A familiar
local landmark for the first coverage conversation," as unnecessary and
nonsensical.

## Record

Local place imagery should not explain itself with generic marketing support
copy. Use the image and the place name as the proof. If attribution is needed,
keep it in the footer or metadata surface, not inside the photo.

## Evidence

- `apps/tracy-zhang-insurance/src/app/page.tsx` now renders local homepage image
  overlays with only the place caption.
- `apps/tracy-zhang-insurance/src/components/MarketLocationPage.tsx` now uses
  the same restrained treatment for location-page imagery.

## Future Guidance

When adding local pages or city imagery, avoid overlay labels such as "local
signal" or explanatory sentences. The image should feel specific and inspectable;
the surrounding page can carry the marketing argument.
