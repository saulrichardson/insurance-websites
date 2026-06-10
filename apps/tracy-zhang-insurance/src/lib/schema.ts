import type { MarketProfile, Office } from "@insurance-websites/domain";

import { primaryOffice, site } from "@/config/site";

export function getLocalBusinessSchema(options?: {
  market?: MarketProfile;
  office?: Office;
  url?: string;
}) {
  const market = options?.market;
  const selectedOffice = options?.office ?? primaryOffice;
  const schemaUrl = options?.url ?? site.url;
  const email = site.email?.trim();
  const sameAs = [
    site.social.googleBusinessProfile,
    site.social.facebook,
    site.social.instagram,
    site.social.linkedin,
  ].filter((value) => value.trim().length > 0);

  const departments =
    market?.domainRole !== "local" && site.offices.length > 1
      ? site.offices.map((office) => ({
          "@type": "InsuranceAgency",
          name: `${site.name} — ${office.label}`,
          telephone: office.phoneE164,
          address: {
            "@type": "PostalAddress",
            streetAddress: office.address.streetAddress,
            addressLocality: office.address.addressLocality,
            addressRegion: office.address.addressRegion,
            postalCode: office.address.postalCode,
            addressCountry: office.address.addressCountry,
          },
          url: `${site.url}/location#${office.slug}`,
        }))
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "@id": `${schemaUrl}/#agency`,
    name: site.name,
    url: schemaUrl,
    telephone: selectedOffice.phoneE164,
    email: email && email.length > 0 ? email : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: selectedOffice.address.streetAddress,
      addressLocality: selectedOffice.address.addressLocality,
      addressRegion: selectedOffice.address.addressRegion,
      postalCode: selectedOffice.address.postalCode,
      addressCountry: selectedOffice.address.addressCountry,
    },
    areaServed: market?.domainRole === "local" ? market.serviceArea : site.serviceArea,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
    department: departments,
  };
}
