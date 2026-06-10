import { NextResponse } from "next/server";
import {
  buildAutoLeadEmailText,
  parseAutoLeadInput,
  validateAutoLead,
  type ValidAutoLead,
} from "@insurance-websites/lead-capture";

import {
  AutoLeadStoreNotConfiguredError,
  insertAutoLead,
  recordAutoLeadEvent,
} from "@/lib/auto-lead-store";

export const runtime = "nodejs";

type DeliveryResult =
  | { attempted: false; ok: false; reason: "not_configured" }
  | { attempted: true; ok: true; id?: string }
  | { attempted: true; ok: false; error: string };

export async function POST(request: Request) {
  const startedAt = Date.now();
  const traceId = request.headers.get("x-vercel-id") ?? crypto.randomUUID();
  const parsed = parseAutoLeadInput(await readBody(request));
  const url = new URL(request.url);

  parsed.sourceDomain ||= url.host;
  parsed.sourcePath ||= `${url.pathname}${url.search}`;
  parsed.referrer ||= request.headers.get("referer") ?? undefined;
  parsed.userAgent ||= request.headers.get("user-agent") ?? undefined;
  parsed.ip ||= request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? undefined;

  const logContext = {
    traceId,
    sourceDomain: parsed.sourceDomain,
    sourcePath: parsed.sourcePath,
    submitterId: parsed.submitterId,
    campaignId: parsed.campaignId,
  };

  logAutoLeadApi("info", "auto_lead_submit_received", startedAt, logContext);

  const result = validateAutoLead(parsed);

  if (!result.ok) {
    logAutoLeadApi("warn", "auto_lead_validation_failed", startedAt, {
      ...logContext,
      errorsCount: result.errors.length,
    });
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  try {
    if (result.blocked) {
      await insertAutoLead(result.lead, {
        status: "invalid_lead",
        blockedReason: result.reason,
      });
      logAutoLeadApi("warn", "auto_lead_blocked", startedAt, {
        ...logContext,
        leadId: result.lead.requestId,
        reason: result.reason,
      });
      return NextResponse.json({ ok: true, requestId: result.lead.requestId });
    }

    await insertAutoLead(result.lead);
    logAutoLeadApi("info", "auto_lead_stored", startedAt, {
      ...logContext,
      leadId: result.lead.requestId,
      vehicleMake: result.lead.vehicleMake,
      vehicleModel: result.lead.vehicleModel,
      hasVin: Boolean(result.lead.vin),
    });
  } catch (error) {
    if (error instanceof AutoLeadStoreNotConfiguredError) {
      logAutoLeadApi("error", "auto_lead_storage_not_configured", startedAt, logContext);
      return NextResponse.json(
        {
          ok: false,
          error: "Auto lead storage is not configured. Please contact the office directly.",
        },
        { status: 503 },
      );
    }

    logAutoLeadApi("error", "auto_lead_storage_failed", startedAt, {
      ...logContext,
      error: error instanceof Error ? error.message : "Unknown storage error",
    });
    return NextResponse.json(
      {
        ok: false,
        error: "We could not save this auto lead. Please contact the office directly.",
      },
      { status: 500 },
    );
  }

  const delivery = await sendAutoLeadNotification(result.lead);
  await recordAutoLeadEvent({
    leadId: result.lead.requestId,
    eventType: delivery.ok ? "notification_sent" : "notification_failed",
    eventBody:
      delivery.attempted && !delivery.ok
        ? delivery.error
        : !delivery.attempted
          ? delivery.reason
          : undefined,
    metadata: {
      provider: "resend",
      attempted: delivery.attempted,
      resendId: delivery.ok ? delivery.id : undefined,
    },
  }).catch((error) => {
    logAutoLeadApi("error", "auto_lead_event_record_failed", startedAt, {
      ...logContext,
      leadId: result.lead.requestId,
      error: error instanceof Error ? error.message : "Unknown submitter lead event error",
    });
  });

  logAutoLeadApi(
    delivery.ok ? "info" : "error",
    delivery.ok ? "auto_lead_notification_sent" : "auto_lead_notification_failed",
    startedAt,
    {
      ...logContext,
      leadId: result.lead.requestId,
      provider: "resend",
      attempted: delivery.attempted,
      resendId: delivery.ok ? delivery.id : undefined,
      error: delivery.attempted && !delivery.ok ? delivery.error : undefined,
    },
  );

  return NextResponse.json({
    ok: true,
    requestId: result.lead.requestId,
    notification: delivery.ok ? "sent" : "pending",
  });
}

async function readBody(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return (await request.json()) as Record<string, unknown>;
  }
  return request.formData();
}

async function sendAutoLeadNotification(
  lead: ValidAutoLead,
): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const toRaw = process.env.AUTO_LEADS_TO_EMAIL?.trim() || process.env.LEADS_TO_EMAIL?.trim();
  const from = process.env.LEADS_FROM_EMAIL?.trim();
  const subjectPrefix = process.env.AUTO_LEADS_EMAIL_SUBJECT_PREFIX?.trim() || "Auto lead";

  if (!apiKey || !toRaw || !from) {
    return { attempted: false, ok: false, reason: "not_configured" };
  }

  const to = toRaw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const vehicle = [lead.vehicleYear, lead.vehicleMake, lead.vehicleModel].filter(Boolean).join(" ");
  const subjectName = vehicle ? `${lead.prospectName} - ${vehicle}` : lead.prospectName;

  const body = {
    from,
    to,
    subject: `${subjectPrefix} - ${subjectName}`,
    text: buildAutoLeadEmailText(lead),
    reply_to: lead.submitterEmail,
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      return { attempted: true, ok: false, error: `Resend returned ${response.status}: ${text}` };
    }

    const payload = (await response.json().catch(() => null)) as { id?: string } | null;
    return { attempted: true, ok: true, id: payload?.id };
  } catch (error) {
    return {
      attempted: true,
      ok: false,
      error: error instanceof Error ? error.message : "Unknown Resend error",
    };
  } finally {
    clearTimeout(timeout);
  }
}

function logAutoLeadApi(
  level: "info" | "warn" | "error",
  message: string,
  startedAt: number,
  fields: Record<string, unknown>,
) {
  const entry = {
    level,
    message,
    route: "/api/auto-leads",
    durationMs: Date.now() - startedAt,
    ...compactLogFields(fields),
  };

  const line = JSON.stringify(entry);
  if (level === "error") {
    console.error(line);
  } else if (level === "warn") {
    console.warn(line);
  } else {
    console.log(line);
  }
}

function compactLogFields(fields: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(fields).filter(([, value]) => value !== undefined && value !== ""),
  );
}
