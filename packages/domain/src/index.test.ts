import { describe, expect, it } from "vitest";

import { getMarketByHost, getOfficeById, isRetiredHost, publicContact } from "./index";

describe("market resolution", () => {
  it("uses the canonical statewide market for tracyzhanginsurance.com", () => {
    expect(getMarketByHost("tracyzhanginsurance.com").id).toBe("statewide");
    expect(getMarketByHost("www.tracyzhanginsurance.com").id).toBe("statewide");
  });

  it("uses local markets for local domains", () => {
    expect(getMarketByHost("sanmarinoinsurance.com").id).toBe("san-marino");
    expect(getMarketByHost("lapalmainsurance.com").id).toBe("la-palma");
  });

  it("routes La Palma market pages to the La Palma office number", () => {
    const market = getMarketByHost("lapalmainsurance.com");
    const office = getOfficeById(market.primaryOfficeId);

    expect(market.primaryOfficeId).toBe("la-palma");
    expect(office.phoneDisplay).toBe("(562) 402-4375");
    expect(office.phoneE164).toBe("+15624024375");
  });

  it("marks the misspelled domain as retired", () => {
    expect(isRetiredHost("tracysinsurnace.com")).toBe(true);
    expect(isRetiredHost("www.tracysinsurnace.com")).toBe(true);
    expect(isRetiredHost("tracyzhanginsurance.com")).toBe(false);
  });

  it("publishes shared public contact actions", () => {
    expect(publicContact.email).toBe("tzhang@allstate.com");
    expect(publicContact.scheduling.provider).toBe("calendly");
    expect(publicContact.scheduling.url).toBe(
      "https://calendly.com/tracyzhangallstate/new-meeting",
    );
  });
});
