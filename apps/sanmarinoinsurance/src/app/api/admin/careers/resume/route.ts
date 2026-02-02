import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { createCareersResumeDownloadUrl } from "@/lib/s3";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id")?.trim() || "";
  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing id." }, { status: 400 });
  }

  const sql = getSql();
  if (!sql) {
    return NextResponse.json({ ok: false, error: "Database is not configured." }, { status: 503 });
  }

  const tenantId = process.env.SITE_TENANT_ID?.trim() || "sanmarinoinsurance";

  const rows = await sql<{ resume_key: string | null; resume_filename: string | null }[]>`
    select resume_key, resume_filename
    from careers_applications
    where id = ${id}
      and tenant_id = ${tenantId}
    limit 1
  `;

  const resumeKey = rows?.[0]?.resume_key || "";
  const resumeFilename = rows?.[0]?.resume_filename || "";
  if (!resumeKey) {
    return NextResponse.json({ ok: false, error: "Resume not found." }, { status: 404 });
  }

  const downloadUrl = await createCareersResumeDownloadUrl({ key: resumeKey, filename: resumeFilename });
  if (!downloadUrl) {
    return NextResponse.json(
      { ok: false, error: "Resume downloads are not configured." },
      { status: 503 },
    );
  }

  return NextResponse.redirect(downloadUrl, 302);
}
