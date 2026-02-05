import { OfficeLocationPage } from "@/components/office/office-location-page";
import { getOffice } from "@/lib/site";

export const metadata = {
  title: "San Marino office",
  description: `Visit our San Marino office or call ${getOffice("san-marino").phone.display} for help with auto, home, renters, life, and business coverage.`,
};

export default function SanMarinoOfficePage() {
  return <OfficeLocationPage officeId="san-marino" />;
}
