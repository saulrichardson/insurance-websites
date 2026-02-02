import { NextResponse } from "next/server";
import { careerRoles } from "@/lib/careers";
import { getSql } from "@/lib/db";
import { getCareersResumeMaxBytes, isAllowedResumeContentType } from "@/lib/s3";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getRoleTitle(roleId: string) {
  if (!roleId || roleId === "general") return "General interest / not sure yet";
  const role = careerRoles.find((r) => r.id === roleId);
  return role?.title || "General interest / not sure yet";
}

function buildEmailText(payload: Record<string, string>) {
  const lines = [
    `New job application (${payload.requestId})`,
    "",
    `Received: ${payload.receivedAt}`,
    `Source: ${payload.source || "unknown"}`,
    "",
    `Role: ${payload.roleTitle}`,
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : "",
    payload.resumeUrl ? `Resume: ${payload.resumeUrl}` : "",
    "",
    payload.message ? `Message:\n${payload.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return lines;
}

async function sendToWebhook(payload: Record<string, string>) {
  const url = process.env.CAREERS_WEBHOOK_URL?.trim();
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
  const to = process.env.CAREERS_TO_EMAIL?.trim();
  const from = process.env.CAREERS_FROM_EMAIL?.trim();
  const subjectPrefix = process.env.CAREERS_EMAIL_SUBJECT_PREFIX?.trim() || "Job application";

  if (!apiKey || !to || !from) return { attempted: false, ok: false };

  const replyTo =
    (payload.email && payload.email.includes("@") ? payload.email : "") ||
    process.env.CAREERS_REPLY_TO_EMAIL?.trim() ||
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
        subject: `${subjectPrefix} • ${payload.name || "New applicant"} (${payload.roleTitle || "Role"})`,
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
  const roleId = getString(formData, "roleId");
  const name = getString(formData, "name");
  const email = getString(formData, "email");
  const phone = getString(formData, "phone");
  const resumeUrl = getString(formData, "resumeUrl"); // optional legacy field (link)
  const resumeKey = getString(formData, "resumeKey");
  const resumeFilename = getString(formData, "resumeFilename");
  const resumeContentType = getString(formData, "resumeContentType");
  const resumeSizeRaw = getString(formData, "resumeSize");
  const message = getString(formData, "message");
  const source = getString(formData, "source");
  const startedAtRaw = getString(formData, "startedAt");

  if (!name || !email || !email.includes("@")) {
    return NextResponse.json(
      { ok: false, error: "Please provide your name and a valid email address." },
      { status: 400 },
    );
  }

  const requestId = crypto.randomUUID();
  const receivedAt = new Date().toISOString();

  const startedAtMs = Number.parseInt(startedAtRaw, 10);
  const fillTimeMs = Number.isFinite(startedAtMs) ? Date.now() - startedAtMs : -1;

  const roleTitle = getRoleTitle(roleId);
  const resumeSize = Number.parseInt(resumeSizeRaw, 10);

  // If a resume key was provided, validate metadata.
  if (resumeKey) {
    if (!resumeFilename || !resumeContentType || !Number.isFinite(resumeSize) || resumeSize <= 0) {
      return NextResponse.json(
        { ok: false, error: "Resume upload metadata is incomplete. Please try again." },
        { status: 400 },
      );
    }
    if (!isAllowedResumeContentType(resumeContentType)) {
      return NextResponse.json(
        { ok: false, error: "Please upload a PDF or Word document." },
        { status: 400 },
      );
    }
    if (resumeSize > getCareersResumeMaxBytes()) {
      return NextResponse.json(
        { ok: false, error: "Resume is too large. Please upload a smaller file." },
        { status: 400 },
      );
    }
  }

  const payload: Record<string, string> = {
    requestId,
    receivedAt,
    roleId: roleId || "general",
    roleTitle,
    name,
    email,
    phone,
    resumeUrl,
    resumeKey,
    resumeFilename,
    resumeContentType,
    resumeSize: resumeKey ? String(resumeSize) : "",
    message,
    source,
    userAgent: request.headers.get("user-agent") ?? "",
    ip: request.headers.get("x-forwarded-for") ?? "",
  };

  // Invisible spam filters (no customer-facing friction).
  // If triggered, we return success to avoid giving bots a feedback loop.
  if (honeypot) {
    console.log("[careers-application]", { requestId, receivedAt, delivered: false, reason: "honeypot" });
    return NextResponse.json({ ok: true, requestId });
  }

  // If the form is submitted extremely quickly, mark as suspicious but still deliver/log
  // (autofill is legitimate; we don't want to drop real candidates).
  if (fillTimeMs >= 0 && fillTimeMs < 1200) {
    payload.suspicious = "too_fast";
    payload.fillTimeMs = String(fillTimeMs);
  }

  // Store in DB if configured (preferred in-house workflow).
  const sql = getSql();
  const stored = { attempted: false, ok: false as boolean, id: "" as string, error: "" as string };
  if (sql) {
    stored.attempted = true;
    const tenantId = process.env.SITE_TENANT_ID?.trim() || "sanmarinoinsurance";
    try {
      const rows = await sql<{ id: string }[]>`
        insert into careers_applications
          (id, tenant_id, status, role_id, role_title, name, email, phone, resume_key, resume_filename, resume_content_type, resume_size, message, source, user_agent, ip, received_at)
        values
          (${requestId}, ${tenantId}, ${"new"}, ${payload.roleId}, ${payload.roleTitle}, ${payload.name}, ${payload.email}, ${payload.phone || null}, ${payload.resumeKey || null}, ${payload.resumeFilename || null}, ${payload.resumeContentType || null}, ${payload.resumeSize ? Number.parseInt(payload.resumeSize, 10) : null}, ${payload.message || null}, ${payload.source || null}, ${payload.userAgent || null}, ${payload.ip || null}, ${payload.receivedAt})
        returning id
      `;
      stored.ok = true;
      stored.id = rows?.[0]?.id || requestId;
      payload.applicationId = stored.id;
    } catch (error) {
      stored.ok = false;
      stored.error = error instanceof Error ? error.message : "Unable to store application.";
      console.error("[careers-application:db-error]", stored.error);
    }
  }

  const [webhookResult, resendResult] = await Promise.all([sendToWebhook(payload), sendViaResend(payload)]);
  const delivered = Boolean(
    (stored.attempted && stored.ok) ||
      (webhookResult.attempted && webhookResult.ok) ||
      (resendResult.attempted && resendResult.ok),
  );

  console.log("[careers-application]", {
    requestId,
    receivedAt,
    delivered,
    stored: stored.attempted ? (stored.ok ? "ok" : "failed") : "not_configured",
    delivery: {
      webhook: webhookResult.attempted ? webhookResult.ok : "not_configured",
      resend: resendResult.attempted ? resendResult.ok : "not_configured",
    },
  });

  if (!delivered) {
    // Fallback: keep the submission available in logs until delivery is configured.
    console.log("[careers-application:payload]", payload);
  } else if (!(webhookResult.attempted || resendResult.attempted) && stored.ok) {
    // Avoid logging full PII payload if DB storage is configured and successful.
    console.log("[careers-application:stored]", { requestId, receivedAt, applicationId: stored.id });
  }

  return NextResponse.json({ ok: true, requestId, applicationId: stored.id || null });
}
