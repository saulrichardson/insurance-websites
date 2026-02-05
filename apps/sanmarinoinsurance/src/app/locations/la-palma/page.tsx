import { OfficeLocationPage } from "@/components/office/office-location-page";
import { getOffice } from "@/lib/site";

export const metadata = {
  title: "La Palma office",
  description: `Visit our La Palma office or call ${getOffice("la-palma").phone.display} for help with auto, home, renters, life, and business coverage.`,
};

export default function LaPalmaOfficePage() {
  return <OfficeLocationPage officeId="la-palma" />;
}

