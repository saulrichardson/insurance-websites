import { describe, expect, it } from "vitest";

import { parseVisitorCaptureInput, parseVisitorCaptureJson } from "./visitor-data";

const fallback = {
  sourceDomain: "tracyzhanginsurance.com",
  path: "/api/visitor-events",
  referrer: "https://example.com/ref",
  userAgent: "test-agent",
  ip: "203.0.113.10",
};

describe("visitor capture parsing", () => {
  it("rejects payloads without stable visitor and session ids", () => {
    expect(parseVisitorCaptureInput({ sessionId: "s_1" }, fallback)).toBeNull();
    expect(parseVisitorCaptureInput({ visitorId: "v_1" }, fallback)).toBeNull();
  });

  it("sanitizes source fields and preserves attribution context", () => {
    const parsed = parseVisitorCaptureInput(
      {
        visitorId: " v_123 ",
        sessionId: " s_456 ",
        identityToken: " ct_abc123 ",
        eventName: "quote_form_submit",
        sourceDomain: " www.tracyzhanginsurance.com ",
        path: "contact?utm_campaign=renewal&ct=raw-token&trk=another-token",
        landingPath: "/?identity_token=raw-token&utm_source=first",
        firstReferrer: "https://google.com/search",
        utmSource: "google",
        utmCampaign: "renewal",
        locale: "zh-Hans",
        marketId: "san-marino",
        officeId: "san-marino",
        viewportWidth: 390,
        viewportHeight: 844,
        browserLanguages: ["zh-CN", "en-US"],
        metadata: { routeKind: "quote_contact" },
      },
      fallback,
    );

    expect(parsed).toMatchObject({
      visitorId: "v_123",
      sessionId: "s_456",
      identityToken: "ct_abc123",
      eventName: "quote_form_submit",
      sourceDomain: "www.tracyzhanginsurance.com",
      path: "/contact?utm_campaign=renewal",
      landingPath: "/?utm_source=first",
      firstReferrer: "https://google.com/search",
      utmSource: "google",
      utmCampaign: "renewal",
      locale: "zh-Hans",
      marketId: "san-marino",
      officeId: "san-marino",
      viewportWidth: 390,
      viewportHeight: 844,
      browserLanguages: ["zh-CN", "en-US"],
    });
    expect(parsed?.metadata).toMatchObject({
      routeKind: "quote_contact",
      userAgent: "test-agent",
      ip: "203.0.113.10",
    });
  });

  it("falls back to server request context for malformed json or missing fields", () => {
    expect(parseVisitorCaptureJson("{not json", fallback)).toBeNull();

    const parsed = parseVisitorCaptureInput(
      {
        visitorId: "v_123",
        sessionId: "s_456",
        eventName: "unknown",
      },
      { ...fallback, eventName: "site_visit" },
    );

    expect(parsed).toMatchObject({
      eventName: "site_visit",
      sourceDomain: "tracyzhanginsurance.com",
      path: "/api/visitor-events",
      referrer: "https://example.com/ref",
    });
  });

  it("bounds browser-provided dimensions", () => {
    const parsed = parseVisitorCaptureInput(
      {
        visitorId: "v_123",
        sessionId: "s_456",
        screenWidth: 9999999,
        viewportHeight: -40,
      },
      fallback,
    );

    expect(parsed?.screenWidth).toBe(100000);
    expect(parsed?.viewportHeight).toBe(0);
  });
});
