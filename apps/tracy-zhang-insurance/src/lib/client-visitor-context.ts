import type { VisitorCaptureData } from "@/lib/visitor-data";

const visitorStorageKey = "tzi_visitor_context_v1";
const sessionStorageKey = "tzi_session_context_v1";
const lastCaptureKey = "tzi_last_capture_key_v1";
const identityTokenParams = ["ct", "cid", "contact_token", "identity_token", "trk"];

type BuildVisitorContextInput = {
  eventName?: VisitorCaptureData["eventName"];
  marketId?: string;
  officeId?: string;
  locale?: string;
};

type StoredVisitorContext = {
  visitorId: string;
  firstSeenAt: string;
  landingPath: string;
  firstReferrer: string;
  firstUtm: UtmContext;
  campaignSlug: string;
  identityToken: string;
};

type StoredSessionContext = {
  sessionId: string;
  sessionStartedAt: string;
};

type UtmContext = {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
};

const productRouteIds: Record<string, string> = {
  "/auto-insurance": "auto",
  "/home-insurance": "home",
  "/condo-insurance": "condo",
  "/renters-insurance": "renters",
  "/life-insurance": "life",
  "/umbrella-insurance": "umbrella",
  "/business-insurance": "business",
  "/motorcycle-insurance": "motorcycle",
  "/atv-insurance": "atv",
  "/boat-insurance": "boat",
  "/fair-plan": "fair-plan",
  "/california-property-insurance": "california-property",
};

export function buildVisitorContext(input: BuildVisitorContextInput = {}): VisitorCaptureData | null {
  if (typeof window === "undefined") return null;

  const now = new Date().toISOString();
  const url = new URL(window.location.href);
  const path = sanitizeCapturePath(`${window.location.pathname}${window.location.search}`);
  const storedVisitor = getStoredVisitorContext(url, now);
  const storedSession = getStoredSessionContext(now);
  const routeContext = getRouteContext(window.location.pathname);
  const currentUtm = getUtmContext(url);

  writeVisitorCookies(storedVisitor.visitorId, storedSession.sessionId);

  return {
    visitorId: storedVisitor.visitorId,
    sessionId: storedSession.sessionId,
    identityToken: storedVisitor.identityToken || undefined,
    eventName: input.eventName ?? "site_visit",
    sourceDomain: window.location.host,
    path,
    landingPath: storedVisitor.landingPath,
    referrer: document.referrer,
    firstReferrer: storedVisitor.firstReferrer,
    utmSource: currentUtm.utmSource || storedVisitor.firstUtm.utmSource,
    utmMedium: currentUtm.utmMedium || storedVisitor.firstUtm.utmMedium,
    utmCampaign: currentUtm.utmCampaign || storedVisitor.firstUtm.utmCampaign,
    utmTerm: currentUtm.utmTerm || storedVisitor.firstUtm.utmTerm,
    utmContent: currentUtm.utmContent || storedVisitor.firstUtm.utmContent,
    campaignSlug: url.searchParams.get("campaign") ?? storedVisitor.campaignSlug,
    locale: input.locale ?? (window.location.pathname.startsWith("/zh") ? "zh-Hans" : "en-US"),
    marketId: input.marketId,
    officeId: input.officeId,
    productId: routeContext.productId,
    storySlug: routeContext.storySlug,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    browserLanguage: navigator.language,
    browserLanguages: Array.from(navigator.languages ?? []),
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    metadata: {
      firstSeenAt: storedVisitor.firstSeenAt,
      sessionStartedAt: storedSession.sessionStartedAt,
      routeKind: routeContext.routeKind,
      currentUtm,
      firstUtm: storedVisitor.firstUtm,
    },
  };
}

export function shouldCaptureVisitorPath(pathname: string) {
  return !(
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/auto-lead-intake") ||
    pathname.startsWith("/thanks")
  );
}

export function hasCapturedVisitorPath(payload: VisitorCaptureData) {
  const key = `${payload.sessionId}:${payload.eventName}:${payload.path}`;
  if (window.sessionStorage.getItem(lastCaptureKey) === key) return true;
  window.sessionStorage.setItem(lastCaptureKey, key);
  return false;
}

function getStoredVisitorContext(url: URL, now: string): StoredVisitorContext {
  const existing = readStoredObject<StoredVisitorContext>(window.localStorage, visitorStorageKey);
  const identityToken = getIdentityToken(url);
  if (existing?.visitorId && existing.landingPath) {
    const landingPath = sanitizeCapturePath(existing.landingPath);
    if ((identityToken && identityToken !== existing.identityToken) || landingPath !== existing.landingPath) {
      const updated = {
        ...existing,
        landingPath,
        identityToken: identityToken || existing.identityToken || "",
      };
      window.localStorage.setItem(visitorStorageKey, JSON.stringify(updated));
      return updated;
    }

    return {
      ...existing,
      landingPath,
      identityToken: existing.identityToken ?? "",
    };
  }

  const value: StoredVisitorContext = {
    visitorId: createId("v"),
    firstSeenAt: now,
    landingPath: sanitizeCapturePath(`${window.location.pathname}${window.location.search}`),
    firstReferrer: document.referrer,
    firstUtm: getUtmContext(url),
    campaignSlug: url.searchParams.get("campaign") ?? "",
    identityToken,
  };
  window.localStorage.setItem(visitorStorageKey, JSON.stringify(value));
  return value;
}

function getIdentityToken(url: URL) {
  return (
    url.searchParams.get("ct") ??
    url.searchParams.get("cid") ??
    url.searchParams.get("contact_token") ??
    url.searchParams.get("identity_token") ??
    url.searchParams.get("trk") ??
    ""
  ).trim();
}

function sanitizeCapturePath(path: string) {
  try {
    const url = new URL(path.startsWith("/") ? path : `/${path}`, window.location.origin);
    for (const param of identityTokenParams) {
      url.searchParams.delete(param);
    }
    return `${url.pathname}${url.search}`;
  } catch {
    return path.startsWith("/") ? path : `/${path}`;
  }
}

function getStoredSessionContext(now: string): StoredSessionContext {
  const existing = readStoredObject<StoredSessionContext>(window.sessionStorage, sessionStorageKey);
  if (existing?.sessionId) return existing;

  const value = {
    sessionId: createId("s"),
    sessionStartedAt: now,
  };
  window.sessionStorage.setItem(sessionStorageKey, JSON.stringify(value));
  return value;
}

function getRouteContext(pathname: string) {
  const englishPath = pathname.replace(/^\/zh(?=\/|$)/, "") || "/";
  if (englishPath.startsWith("/stories/")) {
    return {
      routeKind: "story",
      storySlug: englishPath.split("/")[2] ?? undefined,
    };
  }

  const productId = productRouteIds[englishPath];
  if (productId) return { routeKind: "product", productId };
  if (englishPath === "/products") return { routeKind: "products_index" };
  if (englishPath === "/contact") return { routeKind: "quote_contact" };
  if (englishPath === "/location" || englishPath.startsWith("/locations")) {
    return { routeKind: "location" };
  }
  if (englishPath === "/") return { routeKind: "home" };
  return { routeKind: "public_page" };
}

function getUtmContext(url: URL): UtmContext {
  return {
    utmSource: url.searchParams.get("utm_source") ?? "",
    utmMedium: url.searchParams.get("utm_medium") ?? "",
    utmCampaign: url.searchParams.get("utm_campaign") ?? "",
    utmTerm: url.searchParams.get("utm_term") ?? "",
    utmContent: url.searchParams.get("utm_content") ?? "",
  };
}

function readStoredObject<T>(storage: Storage, key: string): T | null {
  const raw = storage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    storage.removeItem(key);
    return null;
  }
}

function writeVisitorCookies(visitorId: string, sessionId: string) {
  document.cookie = `tzi_vid=${encodeURIComponent(visitorId)}; Path=/; Max-Age=31536000; SameSite=Lax`;
  document.cookie = `tzi_sid=${encodeURIComponent(sessionId)}; Path=/; Max-Age=1800; SameSite=Lax`;
}

function createId(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`;
}
