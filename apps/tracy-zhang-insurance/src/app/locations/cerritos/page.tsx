import { MarketLocationPage } from "@/components/MarketLocationPage";
import { redirectMismatchedLocalMarket } from "@/lib/local-market-guard";
import { getRouteMetadata } from "@/lib/seo";

export const metadata = getRouteMetadata("/locations/cerritos");

export default async function CerritosLocationPage() {
  await redirectMismatchedLocalMarket("cerritos");

  return <MarketLocationPage marketId="cerritos" />;
}
