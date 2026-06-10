import { describe, expect, it } from "vitest";

import { getMarketByHost, isRetiredHost } from "./index";

describe("market resolution", () => {
  it("uses the canonical statewide market for tracyzhanginsurance.com", () => {
    expect(getMarketByHost("tracyzhanginsurance.com").id).toBe("statewide");
    expect(getMarketByHost("www.tracyzhanginsurance.com").id).toBe("statewide");
  });

  it("uses local markets for local domains", () => {
    expect(getMarketByHost("sanmarinoinsurance.com").id).toBe("san-marino");
    expect(getMarketByHost("lapalmainsurance.com").id).toBe("la-palma");
  });

  it("marks the misspelled domain as retired", () => {
    expect(isRetiredHost("tracysinsurnace.com")).toBe(true);
    expect(isRetiredHost("www.tracysinsurnace.com")).toBe(true);
    expect(isRetiredHost("tracyzhanginsurance.com")).toBe(false);
  });
});
