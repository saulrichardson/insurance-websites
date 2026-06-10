import { headers } from "next/headers";
import {
  domains,
  getMarketByHost,
  getMarketProfile,
  isRetiredHost,
  type MarketId,
} from "@insurance-websites/domain";

export async function getRequestMarket() {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");

  if (isRetiredHost(host)) {
    return getMarketProfile("statewide");
  }

  return getMarketByHost(host);
}

export function getMarketUrl(id: MarketId) {
  if (id === "san-marino") return `https://${domains.local.sanMarino}`;
  if (id === "la-palma") return `https://${domains.local.laPalma}`;
  return `https://${domains.canonicalInsurance}`;
}
