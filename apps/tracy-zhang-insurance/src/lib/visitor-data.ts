export type VisitorCaptureData = {
  visitorId: string;
  sessionId: string;
  identityToken?: string;
  eventName: "site_visit" | "quote_form_submit";
  sourceDomain: string;
  path: string;
  landingPath?: string;
  referrer?: string;
  firstReferrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  campaignSlug?: string;
  locale?: string;
  marketId?: string;
  officeId?: string;
  productId?: string;
  storySlug?: string;
  timezone?: string;
  browserLanguage?: string;
  browserLanguages?: string[];
  screenWidth?: number;
  screenHeight?: number;
  viewportWidth?: number;
  viewportHeight?: number;
  metadata?: Record<string, unknown>;
};

type VisitorCaptureFallback = {
  eventName?: VisitorCaptureData["eventName"];
  sourceDomain: string;
  path: string;
  referrer?: string;
  userAgent?: string;
  ip?: string;
};

const allowedEventNames = new Set(["site_visit", "quote_form_submit"]);
const identityTokenParams = ["ct", "cid", "contact_token", "identity_token", "trk"];

export function parseVisitorCaptureInput(
  input: unknown,
  fallback: VisitorCaptureFallback,
): VisitorCaptureData | null {
  const value = coerceObject(input);
  if (!value) return null;

  const visitorId = cleanString(value.visitorId, 96);
  const sessionId = cleanString(value.sessionId, 96);
  if (!visitorId || !sessionId) return null;

  const rawEventName = cleanString(value.eventName, 48);
  const eventName =
    rawEventName && allowedEventNames.has(rawEventName)
      ? (rawEventName as VisitorCaptureData["eventName"])
      : (fallback.eventName ?? "site_visit");

  const inputMetadata = coerceObject(value.metadata) ?? {};
  const metadata = compactObject({
    ...inputMetadata,
    firstSeenAt: cleanString(value.firstSeenAt, 40),
    sessionStartedAt: cleanString(value.sessionStartedAt, 40),
    routeKind: cleanString(value.routeKind, 48) ?? cleanString(inputMetadata.routeKind, 48),
    currentUtm: coerceObject(value.currentUtm) ?? coerceObject(inputMetadata.currentUtm),
    firstUtm: coerceObject(value.firstUtm) ?? coerceObject(inputMetadata.firstUtm),
    userAgent: cleanString(fallback.userAgent, 512),
    ip: cleanString(fallback.ip, 128),
  });

  return {
    visitorId,
    sessionId,
    identityToken: cleanString(value.identityToken, 256),
    eventName,
    sourceDomain: cleanString(value.sourceDomain, 255) || fallback.sourceDomain,
    path: cleanPath(value.path) || fallback.path,
    landingPath: cleanPath(value.landingPath),
    referrer: cleanString(value.referrer, 1024) || fallback.referrer,
    firstReferrer: cleanString(value.firstReferrer, 1024),
    utmSource: cleanString(value.utmSource, 255),
    utmMedium: cleanString(value.utmMedium, 255),
    utmCampaign: cleanString(value.utmCampaign, 255),
    utmTerm: cleanString(value.utmTerm, 255),
    utmContent: cleanString(value.utmContent, 255),
    campaignSlug: cleanString(value.campaignSlug, 255),
    locale: cleanString(value.locale, 32),
    marketId: cleanString(value.marketId, 64),
    officeId: cleanString(value.officeId, 64),
    productId: cleanString(value.productId, 96),
    storySlug: cleanString(value.storySlug, 160),
    timezone: cleanString(value.timezone, 96),
    browserLanguage: cleanString(value.browserLanguage, 64),
    browserLanguages: cleanStringArray(value.browserLanguages, 8, 64),
    screenWidth: cleanInteger(value.screenWidth, 0, 100000),
    screenHeight: cleanInteger(value.screenHeight, 0, 100000),
    viewportWidth: cleanInteger(value.viewportWidth, 0, 100000),
    viewportHeight: cleanInteger(value.viewportHeight, 0, 100000),
    metadata,
  };
}

export function parseVisitorCaptureJson(
  raw: unknown,
  fallback: VisitorCaptureFallback,
): VisitorCaptureData | null {
  if (typeof raw !== "string" || raw.trim().length === 0) return null;
  try {
    return parseVisitorCaptureInput(JSON.parse(raw), fallback);
  } catch {
    return null;
  }
}

function cleanPath(value: unknown) {
  const path = cleanString(value, 1024);
  if (!path) return undefined;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  try {
    const url = new URL(normalized, "https://capture.local");
    for (const param of identityTokenParams) {
      url.searchParams.delete(param);
    }
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return normalized;
  }
}

function cleanString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : undefined;
}

function cleanInteger(value: unknown, min: number, max: number) {
  const parsed = typeof value === "number" ? value : Number.parseInt(String(value ?? ""), 10);
  if (!Number.isFinite(parsed)) return undefined;
  return Math.min(Math.max(Math.trunc(parsed), min), max);
}

function cleanStringArray(value: unknown, maxItems: number, maxLength: number) {
  if (!Array.isArray(value)) return undefined;
  const items = value
    .map((item) => cleanString(item, maxLength))
    .filter((item): item is string => Boolean(item));
  return items.length > 0 ? items.slice(0, maxItems) : undefined;
}

function coerceObject(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function compactObject(value: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(value).filter(([, item]) => item !== undefined && item !== null && item !== ""),
  );
}
