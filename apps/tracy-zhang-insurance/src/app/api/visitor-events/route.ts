import { NextResponse } from "next/server";

import { parseVisitorCaptureInput } from "@/lib/visitor-data";
import { resolveVisitorIdentity } from "@/lib/identity-resolution-store";
import {
  recordVisitorCapture,
  VisitorStoreNotConfiguredError,
} from "@/lib/visitor-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const startedAt = Date.now();
  const url = new URL(request.url);
  const payload = parseVisitorCaptureInput(await readJson(request), {
    sourceDomain: url.host,
    path: `${url.pathname}${url.search}`,
    referrer: request.headers.get("referer") ?? undefined,
    userAgent: request.headers.get("user-agent") ?? undefined,
    ip: getRequestIp(request),
  });

  if (!payload) {
    return NextResponse.json({ ok: false, error: "Invalid visitor payload." }, { status: 400 });
  }

  try {
    const requestContext = {
      userAgent: request.headers.get("user-agent") ?? undefined,
      ip: getRequestIp(request),
    };
    await recordVisitorCapture(payload, requestContext);
    await resolveVisitorIdentity(payload, requestContext);
  } catch (error) {
    if (error instanceof VisitorStoreNotConfiguredError) {
      return NextResponse.json({ ok: true, stored: false });
    }

    console.error(JSON.stringify({
      level: "error",
      message: "visitor_capture_failed",
      route: "/api/visitor-events",
      durationMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : "Unknown visitor capture error",
    }));
    return NextResponse.json({ ok: true, stored: false });
  }

  return NextResponse.json({ ok: true, stored: true });
}

async function readJson(request: Request) {
  try {
    return (await request.json()) as unknown;
  } catch {
    return null;
  }
}

function getRequestIp(request: Request) {
  return request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? undefined;
}
