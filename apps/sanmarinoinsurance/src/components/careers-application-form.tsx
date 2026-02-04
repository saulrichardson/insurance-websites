"use client";

import { useMemo, useState } from "react";
import type { CareerRole } from "@/lib/careers";

type ApplicationStatus = "idle" | "submitting" | "success" | "error";
const MAX_RESUME_MB = 8;
const MAX_RESUME_BYTES = MAX_RESUME_MB * 1024 * 1024;
const ACCEPTED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

function inferResumeContentType(file: File) {
  const provided = (file.type || "").trim().toLowerCase();
  if (provided) return provided;

  const name = file.name.toLowerCase();
  if (name.endsWith(".pdf")) return "application/pdf";
  if (name.endsWith(".doc")) return "application/msword";
  if (name.endsWith(".docx")) return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  return "application/pdf";
}

function isAllowedResumeContentType(contentType: string) {
  return (ACCEPTED_RESUME_TYPES as readonly string[]).includes(contentType.trim().toLowerCase());
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/75"
    >
      {children}
    </label>
  );
}

function FieldHint({ children }: { children: React.ReactNode }) {
  return <div className="text-xs leading-6 text-foreground/70">{children}</div>;
}

export type CareersApplicationFormProps = {
  roles: CareerRole[];
  lockedRoleId?: string;
  source?: string;
};

export function CareersApplicationForm({
  roles,
  lockedRoleId,
  source = "careers-page",
}: CareersApplicationFormProps) {
  const [status, setStatus] = useState<ApplicationStatus>("idle");
  const [message, setMessage] = useState<string>("");
  const [startedAt] = useState(() => Date.now().toString());

  const lockedRole = lockedRoleId ? roles.find((role) => role.id === lockedRoleId) : null;

  const statusCopy = useMemo(() => {
    if (status === "success") return "Application received. We’ll follow up soon.";
    if (status === "error") return "Something went wrong. Please try again in a moment.";
    return "";
  }, [status]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const resume = formData.get("resume");
      if (resume && resume instanceof File && resume.size > 0) {
        if (resume.size > MAX_RESUME_BYTES) {
          setStatus("error");
          setMessage(`Resume is too large. Please keep it under ${MAX_RESUME_MB}MB.`);
          return;
        }

        const contentType = inferResumeContentType(resume);
        if (!isAllowedResumeContentType(contentType)) {
          setStatus("error");
          setMessage("Please upload a PDF or Word document.");
          return;
        }

        const uploadMetaResponse = await fetch("/api/careers/resume/upload-url", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            filename: resume.name,
            contentType,
            size: resume.size,
          }),
        });

        if (!uploadMetaResponse.ok) {
          const payload = await uploadMetaResponse.json().catch(() => null);
          setStatus("error");
          setMessage(payload?.error ? String(payload.error) : "Unable to upload resume.");
          return;
        }

        const uploadMeta = (await uploadMetaResponse.json()) as {
          ok: boolean;
          key: string;
          uploadUrl: string;
          expiresInSeconds: number;
        };

        const uploadResponse = await fetch(uploadMeta.uploadUrl, {
          method: "PUT",
          headers: { "content-type": contentType },
          body: resume,
        });

        if (!uploadResponse.ok) {
          setStatus("error");
          setMessage("Resume upload failed. Please try again.");
          return;
        }

        formData.delete("resume");
        formData.set("resumeKey", uploadMeta.key);
        formData.set("resumeFilename", resume.name);
        formData.set("resumeContentType", contentType);
        formData.set("resumeSize", String(resume.size));
      } else {
        formData.delete("resume");
      }

      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        setStatus("error");
        setMessage(payload?.error ? String(payload.error) : "Unable to submit form.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to submit form.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="border border-foreground/20 bg-background/35 p-6 sm:p-7">
      <div className="text-sm font-semibold text-foreground">
        {lockedRole ? `Apply for ${lockedRole.title}` : "Apply"}
      </div>
      <div className="mt-2 text-sm text-foreground/75">
        Use this form to apply. We’ll follow up by email with next steps.
      </div>

      <div className="mt-6 grid gap-4">
        {lockedRoleId ? (
          <input type="hidden" name="roleId" value={lockedRoleId} />
        ) : (
          <div className="grid gap-2">
            <FieldLabel htmlFor="roleId">Role</FieldLabel>
            <select
              id="roleId"
              name="roleId"
              defaultValue="general"
              className="h-11 w-full rounded-none border border-foreground/40 bg-background/80 px-4 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
            >
              <option value="general">General interest / not sure yet</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.title}
                </option>
              ))}
            </select>
            <FieldHint>If you’re unsure, pick “General interest”.</FieldHint>
          </div>
        )}

        <div className="grid gap-2">
          <FieldLabel htmlFor="name">Full name</FieldLabel>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="h-11 w-full rounded-none border border-foreground/40 bg-background/80 px-4 text-sm text-foreground placeholder:text-foreground/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
          />
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="grid gap-2">
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="h-11 w-full rounded-none border border-foreground/40 bg-background/80 px-4 text-sm text-foreground placeholder:text-foreground/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
            />
          </div>

          <div className="grid gap-2">
            <FieldLabel htmlFor="phone">Phone (optional)</FieldLabel>
            <input
              id="phone"
              name="phone"
              inputMode="tel"
              autoComplete="tel"
              className="h-11 w-full rounded-none border border-foreground/40 bg-background/80 px-4 text-sm text-foreground placeholder:text-foreground/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <FieldLabel htmlFor="resume">Resume (optional)</FieldLabel>
          <input
            id="resume"
            name="resume"
            type="file"
            accept={[
              ".pdf",
              ".doc",
              ".docx",
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ].join(",")}
            className="h-11 w-full rounded-none border border-foreground/40 bg-background/80 px-4 text-sm text-foreground placeholder:text-foreground/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
          />
          <FieldHint>
            Upload a PDF or Word document. Max {MAX_RESUME_MB}MB.
          </FieldHint>
        </div>

        <div className="grid gap-2">
          <FieldLabel htmlFor="message">Message (optional)</FieldLabel>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full rounded-none border border-foreground/40 bg-background/80 px-4 py-3 text-sm leading-7 text-foreground placeholder:text-foreground/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
          />
          <FieldHint>Tell us what role you’re interested in and what experience you bring.</FieldHint>
        </div>

        <div className="sr-only" aria-hidden>
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="h-11 w-full rounded-none border border-foreground/40 bg-background/80 px-4 text-sm text-foreground"
          />
        </div>

        <input type="hidden" name="startedAt" value={startedAt} />
        <input type="hidden" name="source" value={source} />

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-none border border-foreground bg-foreground px-6 text-xs font-medium uppercase tracking-[0.18em] text-white shadow-sm shadow-black/15 transition-colors hover:bg-foreground/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60 disabled:pointer-events-none disabled:opacity-70"
        >
          {status === "submitting" ? "Sending..." : "Submit application"}
        </button>

        {statusCopy ? (
          <div
            role="status"
            className={[
              "border px-4 py-3 text-sm",
              status === "success"
                ? "border-foreground/20 bg-surface/60 text-foreground"
                : "border-red-500/40 bg-red-500/10 text-foreground",
            ].join(" ")}
          >
            {statusCopy}
            {message ? <div className="mt-2 text-xs text-foreground/75">{message}</div> : null}
          </div>
        ) : null}
      </div>
    </form>
  );
}
