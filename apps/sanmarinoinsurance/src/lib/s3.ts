import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

type S3Config = {
  endpoint?: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
};

function getS3Config(): S3Config | null {
  const bucket = process.env.S3_BUCKET?.trim();
  const accessKeyId = process.env.S3_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY?.trim();
  const region = process.env.S3_REGION?.trim() || "us-east-1";
  const endpoint = process.env.S3_ENDPOINT?.trim();

  if (!bucket || !accessKeyId || !secretAccessKey) return null;

  return { bucket, accessKeyId, secretAccessKey, region, endpoint };
}

declare global {
  var __san_marino_s3: S3Client | undefined;
}

function getS3Client() {
  const cfg = getS3Config();
  if (!cfg) return null;

  if (!globalThis.__san_marino_s3) {
    globalThis.__san_marino_s3 = new S3Client({
      region: cfg.region,
      endpoint: cfg.endpoint,
      credentials: {
        accessKeyId: cfg.accessKeyId,
        secretAccessKey: cfg.secretAccessKey,
      },
      forcePathStyle: Boolean(cfg.endpoint),
    });
  }

  return { client: globalThis.__san_marino_s3, bucket: cfg.bucket };
}

export type PresignedUpload = {
  key: string;
  uploadUrl: string;
  expiresInSeconds: number;
};

function sanitizeFilename(name: string) {
  const trimmed = name.trim();
  const withoutPath = trimmed.split(/[/\\]/).pop() || "resume";
  const safe = withoutPath.replace(/[^\w.\-()+ ]+/g, "").replace(/\s+/g, " ").trim();
  return safe || "resume";
}

export function getCareersResumeMaxBytes() {
  const raw = process.env.CAREERS_RESUME_MAX_BYTES?.trim();
  const parsed = raw ? Number.parseInt(raw, 10) : Number.NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 8 * 1024 * 1024;
}

export function isAllowedResumeContentType(contentType: string) {
  const normalized = contentType.trim().toLowerCase();
  return (
    normalized === "application/pdf" ||
    normalized === "application/msword" ||
    normalized === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );
}

export async function createCareersResumeUploadUrl(input: {
  filename: string;
  contentType: string;
}) {
  const s3 = getS3Client();
  if (!s3) return null;

  const safeName = sanitizeFilename(input.filename);
  const key = `careers/resumes/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName}`;

  const expiresInSeconds = 5 * 60;
  const command = new PutObjectCommand({
    Bucket: s3.bucket,
    Key: key,
    ContentType: input.contentType,
  });

  const uploadUrl = await getSignedUrl(s3.client, command, { expiresIn: expiresInSeconds });
  return { key, uploadUrl, expiresInSeconds } satisfies PresignedUpload;
}

export async function createCareersResumeDownloadUrl(input: { key: string; filename?: string }) {
  const s3 = getS3Client();
  if (!s3) return null;

  const expiresInSeconds = 60;
  const safeFilename = input.filename ? sanitizeFilename(input.filename) : "";
  const contentDisposition = safeFilename ? `attachment; filename="${safeFilename}"` : "";
  const command = new GetObjectCommand({
    Bucket: s3.bucket,
    Key: input.key,
    ...(contentDisposition ? { ResponseContentDisposition: contentDisposition } : {}),
  });

  return await getSignedUrl(s3.client, command, { expiresIn: expiresInSeconds });
}
