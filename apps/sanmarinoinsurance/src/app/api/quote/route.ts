import { NextResponse } from "next/server";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function buildEmailText(payload: Record<string, string>) {
  const lines = [
    `New quote request (${payload.requestId})`,
    "",
    `Received: ${payload.receivedAt}`,
    `Source: ${payload.source || "unknown"}`,
    "",
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    payload.email ? `Email: ${payload.email}` : "",
    payload.coverage ? `Coverage: ${payload.coverage}` : "",
    payload.zip ? `ZIP: ${payload.zip}` : "",
    "",
    payload.notes ? `Notes:\n${payload.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return lines;
}

async function sendToWebhook(payload: Record<string, string>) {
  const url = process.env.QUOTE_WEBHOOK_URL?.trim();
  if (!url) return { attempted: false, ok: false };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      return { attempted: true, ok: false, error: `Webhook returned ${response.status} ${text}` };
    }

    return { attempted: true, ok: true };
  } finally {
    clearTimeout(timeout);
  }
}

async function sendViaResend(payload: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.QUOTE_TO_EMAIL?.trim();
  const from = process.env.QUOTE_FROM_EMAIL?.trim();
  const subjectPrefix = process.env.QUOTE_EMAIL_SUBJECT_PREFIX?.trim() || "Quote request";

  if (!apiKey || !to || !from) return { attempted: false, ok: false };

  const replyTo =
    (payload.email && payload.email.includes("@") ? payload.email : "") ||
    process.env.QUOTE_REPLY_TO_EMAIL?.trim() ||
    "";

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `${subjectPrefix} • ${payload.name || "New lead"}`,
        text: buildEmailText(payload),
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      return { attempted: true, ok: false, error: `Resend returned ${response.status} ${text}` };
    }

    return { attempted: true, ok: true };
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const honeypot = getString(formData, "company");
  const name = getString(formData, "name");
  const phone = getString(formData, "phone");
  const email = getString(formData, "email");
  const coverage = getString(formData, "coverage");
  const zip = getString(formData, "zip");
  const notes = getString(formData, "notes");
  const source = getString(formData, "source");
  const startedAtRaw = getString(formData, "startedAt");

  if (!name || !phone) {
    return NextResponse.json(
      { ok: false, error: "Please provide your name and phone number." },
      { status: 400 },
    );
  }

  const requestId = crypto.randomUUID();
  const receivedAt = new Date().toISOString();

  const startedAtMs = Number.parseInt(startedAtRaw, 10);
  const fillTimeMs = Number.isFinite(startedAtMs) ? Date.now() - startedAtMs : -1;

  const payload: Record<string, string> = {
    requestId,
    receivedAt,
    name,
    phone,
    email,
    coverage,
    zip,
    notes,
    source,
    userAgent: request.headers.get("user-agent") ?? "",
    ip: request.headers.get("x-forwarded-for") ?? "",
  };

  // Invisible spam filters (no customer-facing friction).
  // If triggered, we return success to avoid giving bots a feedback loop.
  if (honeypot) {
    console.log("[quote-request]", { requestId, receivedAt, delivered: false, reason: "honeypot" });
    return NextResponse.json({ ok: true, requestId });
  }

  if (fillTimeMs >= 0 && fillTimeMs < 1200) {
    console.log("[quote-request]", { requestId, receivedAt, delivered: false, reason: "too_fast" });
    return NextResponse.json({ ok: true, requestId });
  }

  const [webhookResult, resendResult] = await Promise.all([sendToWebhook(payload), sendViaResend(payload)]);
  const delivered = Boolean((webhookResult.attempted && webhookResult.ok) || (resendResult.attempted && resendResult.ok));

  console.log("[quote-request]", {
    requestId,
    receivedAt,
    delivered,
    delivery: {
      webhook: webhookResult.attempted ? webhookResult.ok : "not_configured",
      resend: resendResult.attempted ? resendResult.ok : "not_configured",
    },
  });

  if (!delivered) {
    // Fallback: keep the submission available in logs until delivery is configured.
    console.log("[quote-request:payload]", payload);
  }

  return NextResponse.json({ ok: true, requestId });
}
