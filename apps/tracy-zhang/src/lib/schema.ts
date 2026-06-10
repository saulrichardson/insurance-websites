import { getOffice, site } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";

export function getPersonSchema() {
  const base = getSiteUrl().toString().replace(/\/$/, "");
  const primaryOffice = getOffice("san-marino");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${base}/#tracy-zhang`,
        name: site.agent.name,
        jobTitle: "Insurance advisor",
        image: site.agent.images.portrait,
        telephone: site.agent.phone.e164,
        knowsLanguage: site.agent.languages,
        url: base,
        sameAs: [site.agent.links.allstateProfile],
        worksFor: {
          "@id": "https://tracyzhanginsurance.com/#agency",
        },
        workLocation: {
          "@id": `${base}/#san-marino-office`,
        },
      },
      {
        "@type": "InsuranceAgency",
        "@id": `${base}/#san-marino-office`,
        name: site.brand.legalLine,
        telephone: primaryOffice.phone.e164,
        address: {
          "@type": "PostalAddress",
          streetAddress: primaryOffice.address.street,
          addressLocality: primaryOffice.address.city,
          addressRegion: primaryOffice.address.region,
          postalCode: primaryOffice.address.postalCode,
          addressCountry: primaryOffice.address.country,
        },
      },
    ],
  };
}
