# Tracy’s Insurance Homepage Preview

A working design preview for the agency's main homepage. This is a standalone
HTML, CSS and JavaScript composition, preserved beside the existing Next.js
application so the design can be reviewed before integration.

## View

- Hosted preview: https://san-marino-insurance-dg4d20ipq-saulrichardsons-projects.vercel.app
- Local preview while the development server is running: http://127.0.0.1:8848/
- To serve this directory again with a static file server, use this directory as
  the document root. No compilation or app environment variables are needed.

The Vercel deployment is a Preview on the existing san-marino-insurance
project. It does not replace the production deployment or change domain aliases.
Both HTML and deployment headers request no indexing. Vercel's existing
preview access policy may require signing into the owner's account.

## Design

The minimalist composition uses a soft blue full-width first section, large
Plus Jakarta Sans type and a San Marino community photograph. Coverage is
organized around everyday situations, followed by Tracy's introduction,
language support, two real offices and a final contact section. A mobile
contact bar keeps call, text and email available without opening the menu.

The contact links use the shared domain data in packages/domain/src/index.ts:
San Marino +16263008338, La Palma +15624024375, and
hello@tracysinsurance.com. Check those facts again when integrating. There are
no consumer intake fields, forms, submissions or scheduling widgets.

The preview includes menu open/close and Escape behavior, coverage accordions,
hero entrance animation, section reveals, hover feedback and reduced-motion
support. It does not run production analytics, capture visitor identities or
send messages. Selecting call, text or email delegates to the visitor's device.
Product and legal links lead to the current live website.

## Assets

Photographs are local copies of the existing site/study assets:

- San Marino: Hickorypine, The Huntington Chinese Garden, CC BY-SA 4.0.
  https://commons.wikimedia.org/wiki/File:Huntington_Library_Chinese_Garden.jpg
- La Palma: Mike Greene, La Palma City Hall, CC BY-SA 2.0.
  https://commons.wikimedia.org/wiki/File:LaPalmaCityHall.jpg
- Tracy Zhang: existing official agency profile portrait, used for this design
  preview. Replace with an approved higher-resolution portrait for final launch.

Community photographs are labeled as landmarks rather than agency premises.
Photography attribution and license links are included in the page footer.
Plus Jakarta Sans is self-hosted from the existing application font assets;
its SIL Open Font License is retained in assets/FONT-LICENSE.txt.

## Integration

Port the approved composition into the current Next.js app and shared contact
components. Preserve market-specific office routing, Chinese-language routes,
metadata, structured data and event tracking. The standalone preview is not a
replacement for those production contracts. Keep San Marino and La Palma
localized homepages distinct from this main agency homepage.

Do not copy the preview's noindex policy into the production homepage. Preserve
actual call, text and email protocols. Before launch, verify analytics receipt,
shared contact facts, translations and all existing SEO contracts.
