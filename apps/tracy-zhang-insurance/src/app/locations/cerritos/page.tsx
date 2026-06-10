import type { Metadata } from "next";

import { MarketLocationPage } from "@/components/MarketLocationPage";
import { redirectMismatchedLocalMarket } from "@/lib/local-market-guard";

export const metadata: Metadata = {
  title: "Cerritos Insurance Guidance",
  description:
    "Insurance guidance for Cerritos households, property owners, drivers, families, and small businesses.",
  alternates: { canonical: "/locations/cerritos" },
};

export default async function CerritosLocationPage() {
  await redirectMismatchedLocalMarket("cerritos");

  return <MarketLocationPage marketId="cerritos" />;
}
