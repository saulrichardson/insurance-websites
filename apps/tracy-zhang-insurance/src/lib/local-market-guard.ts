import { redirect } from "next/navigation";
import type { MarketId } from "@insurance-websites/domain";

import { getRequestMarket } from "@/lib/market";

export async function redirectMismatchedLocalMarket(routeMarketId: MarketId) {
  const activeMarket = await getRequestMarket();

  if (activeMarket.domainRole === "local" && activeMarket.id !== routeMarketId) {
    redirect("/location");
  }
}
