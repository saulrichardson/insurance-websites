import { MarketLocationPage } from "@/components/MarketLocationPage";
import { redirectMismatchedLocalMarket } from "@/lib/local-market-guard";
import { getRouteMetadata } from "@/lib/seo";

export const metadata = getRouteMetadata("/locations/la-palma");

export default async function LaPalmaLocationPage() {
  await redirectMismatchedLocalMarket("la-palma");

  return <MarketLocationPage marketId="la-palma" />;
}
