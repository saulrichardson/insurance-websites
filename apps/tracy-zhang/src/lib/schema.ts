import { site } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";

export function getPersonSchema() {
  const base = getSiteUrl().toString().replace(/\/$/, "");
  const offices = site.offices.map((office) => ({
    "@type": "InsuranceAgency",
    "@id": `${base}/#${office.id}-office`,
    name: `${site.brand.legalLine} — ${office.location}`,
    telephone: office.phone.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: office.address.street,
      addressLocality: office.address.city,
      addressRegion: office.address.region,
      postalCode: office.address.postalCode,
      addressCountry: office.address.country,
    },
    url: `${base}/#offices`,
  }));

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
        knowsAbout: [
          "Auto insurance",
          "Home insurance",
          "California property insurance",
          "Life insurance",
          "Business insurance",
          "Umbrella insurance",
        ],
        areaServed: {
          "@type": "State",
          name: "California",
        },
        url: base,
        sameAs: [site.agent.links.allstateProfile],
        worksFor: {
          "@id": "https://tracyzhanginsurance.com/#agency",
        },
        workLocation: offices.map((office) => ({ "@id": office["@id"] })),
      },
      {
        "@type": "ProfilePage",
        "@id": `${base}/#profile-page`,
        url: base,
        name: `${site.agent.name} | California Insurance Advisor`,
        description:
          "Advisor profile, language fit, office details, and contact paths for Tracy Zhang.",
        inLanguage: ["en-US", "zh-Hans"],
        about: {
          "@id": `${base}/#tracy-zhang`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        name: site.brand.name,
        url: base,
        inLanguage: ["en-US", "zh-Hans"],
        publisher: {
          "@id": `${base}/#tracy-zhang`,
        },
      },
      ...offices,
    ],
  };
}
