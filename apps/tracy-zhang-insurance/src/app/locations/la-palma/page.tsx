import type { Metadata } from "next";

import { MarketLocationPage } from "@/components/MarketLocationPage";
import { redirectMismatchedLocalMarket } from "@/lib/local-market-guard";

export const metadata: Metadata = {
  title: "La Palma Insurance",
  description:
    "La Palma and Cerritos-area insurance guidance for households, life milestones, small businesses, and property questions.",
  alternates: { canonical: "/locations/la-palma" },
};

export default async function LaPalmaLocationPage() {
  await redirectMismatchedLocalMarket("la-palma");

  return <MarketLocationPage marketId="la-palma" />;
}
