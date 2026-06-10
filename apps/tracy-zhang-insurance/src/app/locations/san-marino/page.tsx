import type { Metadata } from "next";

import { MarketLocationPage } from "@/components/MarketLocationPage";
import { redirectMismatchedLocalMarket } from "@/lib/local-market-guard";

export const metadata: Metadata = {
  title: "San Marino Insurance Guidance",
  description:
    "San Marino insurance guidance for homes, autos, families, property owners, and businesses.",
  alternates: { canonical: "/locations/san-marino" },
};

export default async function SanMarinoLocationPage() {
  await redirectMismatchedLocalMarket("san-marino");

  return <MarketLocationPage marketId="san-marino" />;
}
