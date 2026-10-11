"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import {
  buildVisitorContext,
  hasCapturedVisitorPath,
  shouldCaptureVisitorPath,
} from "@/lib/client-visitor-context";

export function VisitorCapture({
  marketId,
  officeId,
}: {
  marketId: string;
  officeId: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!shouldCaptureVisitorPath(pathname)) return;

    const payload = buildVisitorContext({
      marketId,
      officeId,
      locale: pathname.startsWith("/zh") ? "zh-Hans" : "en-US",
    });
    if (!payload || hasCapturedVisitorPath(payload)) return;

    fetch("/api/visitor-events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Visitor capture should never interrupt the public website experience.
    });
  }, [marketId, officeId, pathname, searchParams]);

  return null;
}
