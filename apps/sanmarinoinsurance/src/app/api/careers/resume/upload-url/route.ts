import { NextResponse } from "next/server";
import {
  createCareersResumeUploadUrl,
  getCareersResumeMaxBytes,
  isAllowedResumeContentType,
} from "@/lib/s3";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as null | {
    filename?: string;
    contentType?: string;
    size?: number;
  };

  const filename = (body?.filename || "").trim();
  const contentType = (body?.contentType || "").trim();
  const size = Number(body?.size);

  if (!filename || !contentType || !Number.isFinite(size) || size <= 0) {
    return NextResponse.json({ ok: false, error: "Invalid upload metadata." }, { status: 400 });
  }

  if (!isAllowedResumeContentType(contentType)) {
    return NextResponse.json(
      { ok: false, error: "Please upload a PDF or Word document." },
      { status: 400 },
    );
  }

  const maxBytes = getCareersResumeMaxBytes();
  if (size > maxBytes) {
    const maxMb = Math.floor(maxBytes / (1024 * 1024));
    return NextResponse.json(
      { ok: false, error: `Resume is too large. Please keep it under ${maxMb}MB.` },
      { status: 400 },
    );
  }

  const presigned = await createCareersResumeUploadUrl({ filename, contentType });
  if (!presigned) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Resume uploads are not configured yet. Please submit your application without a file and we’ll follow up.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, ...presigned });
}

