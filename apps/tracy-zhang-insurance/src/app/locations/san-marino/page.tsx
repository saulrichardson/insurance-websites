import { MarketLocationPage } from "@/components/MarketLocationPage";
import { redirectMismatchedLocalMarket } from "@/lib/local-market-guard";
import { getRouteMetadata } from "@/lib/seo";

export const metadata = getRouteMetadata("/locations/san-marino");

export default async function SanMarinoLocationPage() {
  await redirectMismatchedLocalMarket("san-marino");

  return <MarketLocationPage marketId="san-marino" />;
}
