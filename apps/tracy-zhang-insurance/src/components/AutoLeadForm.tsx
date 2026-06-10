"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import {
  useRef,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

import { trackMarketingEvent } from "@/components/marketing-events";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type FormStatus = "idle" | "submitting" | "success" | "error";

const inputClass =
  "h-11 w-full min-w-0 rounded-md border border-[var(--rail-border)] bg-white px-3 text-sm text-[var(--ink)] shadow-sm outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[var(--ink)]/20";

const textareaClass =
  "min-h-24 w-full min-w-0 rounded-md border border-[var(--rail-border)] bg-white px-3 py-3 text-sm text-[var(--ink)] shadow-sm outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[var(--ink)]/20";

const boundaryFields = [
  "didNotQuote",
  "didNotRecommend",
  "didNotCompare",
  "didNotExplainTerms",
  "didNotCompleteApplication",
  "didNotBind",
  "didNotRepresentCoverage",
] as const;

export function AutoLeadForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<string[]>([]);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [startedAt] = useState(() => String(Date.now()));
  const hasTrackedStart = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors([]);
    setRequestId(null);
    const submitStartedAt = Date.now();
    const form = event.currentTarget;
    const formData = new FormData(form);
    appendSourceFields(formData);
    appendCertificationFields(formData);
    const eventProps = getFormEventProps(formData);

    trackMarketingEvent("auto_lead_submit_attempt", eventProps);

    try {
      const response = await fetch("/api/auto-leads", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; requestId?: string; errors?: string[]; error?: string }
        | null;

      if (!response.ok || !payload?.ok) {
        setStatus("error");
        setErrors(
          payload?.errors?.length
            ? payload.errors
            : [payload?.error || "We could not save this lead. Contact the office directly."],
        );
        trackMarketingEvent("auto_lead_error", {
          ...eventProps,
          status: response.status,
          duration_ms: Date.now() - submitStartedAt,
        });
        return;
      }

      setStatus("success");
      setRequestId(payload.requestId ?? null);
      trackMarketingEvent("auto_lead_submitted", {
        ...eventProps,
        request_id: payload.requestId ?? "",
        duration_ms: Date.now() - submitStartedAt,
      });
      form.reset();
    } catch {
      setStatus("error");
      setErrors(["Network error. Contact the office directly if this is time-sensitive."]);
      trackMarketingEvent("auto_lead_error", {
        ...eventProps,
        status: "network",
        duration_ms: Date.now() - submitStartedAt,
      });
    }
  }

  function handleFormStart() {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    const url = new URL(window.location.href);

    trackMarketingEvent("auto_lead_form_start", {
      source_domain: window.location.host,
      source_path: `${window.location.pathname}${window.location.search}`,
      campaign: url.searchParams.get("campaign") ?? "",
      utm_campaign: url.searchParams.get("utm_campaign") ?? "",
    });
  }

  return (
    <form className="grid gap-8" onFocusCapture={handleFormStart} onSubmit={handleSubmit}>
      <Section title="Your details">
        <div className="grid min-w-0 gap-4 sm:grid-cols-2">
          <TextField label="Name" name="submitterName" autoComplete="name" required />
          <TextField label="Email" name="submitterEmail" type="email" required />
        </div>
      </Section>

      <Section title="Prospect">
        <div className="grid min-w-0 gap-4 sm:grid-cols-2">
          <TextField label="Full legal name" name="prospectName" autoComplete="name" required />
          <TextField label="Phone" name="prospectPhone" type="tel" autoComplete="tel" required />
          <TextField label="Email, if available" name="prospectEmail" type="email" autoComplete="email" />
        </div>
      </Section>

      <Section title="Vehicle">
        <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <TextField label="VIN" name="vin" className="lg:col-span-4" required />
          <TextField label="Year" name="vehicleYear" inputMode="numeric" />
          <TextField label="Make" name="vehicleMake" />
          <TextField label="Model" name="vehicleModel" />
          <TextField label="Garaging ZIP" name="garagingZip" inputMode="numeric" required />
        </div>
        <p className="mt-3 text-xs leading-5 text-[var(--muted)]">
          Required: VIN and garaging ZIP. Add year, make, and model if available.
        </p>
      </Section>

      <Section title="Driver">
        <div className="grid min-w-0 gap-4 sm:grid-cols-2">
          <TextField label="Primary driver full legal name" name="primaryDriverName" required />
          <SelectField label="License status" name="primaryDriverLicenseStatus">
            <option value="">Unknown</option>
            <option value="valid">Valid</option>
            <option value="suspended">Suspended</option>
            <option value="expired">Expired</option>
            <option value="permit">Permit</option>
            <option value="unlicensed">Unlicensed</option>
          </SelectField>
          <TextAreaField
            label="Driver notes, if disclosed"
            name="drivingHistoryDisclosure"
            placeholder="Accidents, violations, claims, suspensions, or other driver details already provided."
            className="sm:col-span-2"
          />
        </div>
      </Section>

      <Section title="Consent">
        <div className="grid min-w-0 gap-4 sm:grid-cols-2">
          <TextField label="Consent date and time" name="consentObtainedAt" type="datetime-local" required />
          <SelectField label="Consent method" name="consentMethod" required>
            <option value="">Select one...</option>
            <option value="phone">Phone</option>
            <option value="text">Text</option>
            <option value="online_form">Online form</option>
            <option value="in_person">In person</option>
            <option value="email">Email</option>
            <option value="referral_conversation">Referral conversation</option>
            <option value="other">Other</option>
          </SelectField>
          <RadioGroup
            label="Present interest in being contacted about auto insurance"
            name="presentInterest"
            options={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
            required
            className="sm:col-span-2"
          />
        </div>
      </Section>

      <Section title="Agreement">
        <AgreementCheckbox />
      </Section>

      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <input type="hidden" name="startedAt" value={startedAt} />

      {status === "error" ? (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-5 text-sm text-amber-950">
          <div className="font-semibold">Lead was not submitted</div>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {status === "success" ? (
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-5 text-sm text-emerald-950">
          <div className="font-semibold">Auto lead submitted</div>
          <p className="mt-1">The lead was saved for review.</p>
          {requestId ? <div className="mt-2 text-xs">Lead ID: {requestId}</div> : null}
        </div>
      ) : null}

      <div className="flex justify-end border-t border-[var(--rail-border)] pt-5">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={buttonClasses({ variant: "primary", size: "lg" })}
        >
          {status === "submitting" ? "Submitting..." : "Submit auto lead"}
        </button>
      </div>
    </form>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="min-w-0 border-t border-[var(--rail-border)] pt-5 first:border-t-0 first:pt-0">
      <h2 className="mb-4 text-xl font-semibold text-[var(--ink)]">{title}</h2>
      {children}
    </section>
  );
}

function TextField({
  label,
  name,
  className,
  ...props
}: {
  label: string;
  name: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={cn("grid min-w-0 gap-2 text-sm", className)}>
      <span className="min-w-0 font-medium text-[var(--ink)]">
        {label}
        {props.required ? <span className="text-[var(--brand-ink)]"> *</span> : null}
      </span>
      <input name={name} className={inputClass} {...props} />
    </label>
  );
}

function SelectField({
  label,
  name,
  className,
  children,
  required,
}: {
  label: string;
  name: string;
  className?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className={cn("grid min-w-0 gap-2 text-sm", className)}>
      <span className="min-w-0 font-medium text-[var(--ink)]">
        {label}
        {required ? <span className="text-[var(--brand-ink)]"> *</span> : null}
      </span>
      <select name={name} required={required} className={inputClass}>
        {children}
      </select>
    </label>
  );
}

function TextAreaField({
  label,
  name,
  className,
  ...props
}: {
  label: string;
  name: string;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className={cn("grid min-w-0 gap-2 text-sm", className)}>
      <span className="min-w-0 font-medium text-[var(--ink)]">{label}</span>
      <textarea name={name} rows={4} className={textareaClass} {...props} />
    </label>
  );
}

function AgreementCheckbox() {
  return (
    <label className="group grid cursor-pointer grid-cols-[auto_1fr] gap-3 rounded-lg border border-[var(--rail-border)] bg-[#f8f6ef] p-4 text-sm leading-6 text-[var(--muted)] transition hover:border-[var(--ink)]/35">
      <input name="autoLeadTermsAccepted" type="checkbox" required className="peer sr-only" />
      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-[var(--rail-border)] bg-white text-transparent shadow-sm transition peer-checked:border-[var(--ink)] peer-checked:bg-[var(--ink)] peer-checked:text-white">
        <Check className="size-4" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="font-semibold text-[var(--ink)]">I confirm and agree.</span>{" "}
        I have reviewed and agree to the{" "}
        <Link
          href="/auto-lead-intake/terms"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-[var(--ink)] underline decoration-[var(--brand-ink)] underline-offset-4"
        >
          Auto Lead Intake Terms
        </Link>
        .
      </span>
    </label>
  );
}

function RadioGroup({
  label,
  name,
  options,
  required,
  className,
}: {
  label: string;
  name: string;
  options: Array<[string, string]>;
  required?: boolean;
  className?: string;
}) {
  return (
    <fieldset className={cn("grid min-w-0 gap-2", className)}>
      <legend className="text-sm font-medium text-[var(--ink)]">
        {label}
        {required ? <span className="text-[var(--brand-ink)]"> *</span> : null}
      </legend>
      <div className="flex flex-wrap gap-4">
        {options.map(([value, optionLabel]) => (
          <label key={value} className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <input name={name} type="radio" value={value} required={required} />
            {optionLabel}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function appendSourceFields(formData: FormData) {
  const url = new URL(window.location.href);
  formData.set("sourceDomain", window.location.host);
  formData.set("sourcePath", `${window.location.pathname}${window.location.search}`);
  formData.set("referrer", document.referrer);
  formData.set("utmSource", url.searchParams.get("utm_source") ?? "");
  formData.set("utmMedium", url.searchParams.get("utm_medium") ?? "");
  formData.set("utmCampaign", url.searchParams.get("utm_campaign") ?? "");
  formData.set("utmTerm", url.searchParams.get("utm_term") ?? "");
  formData.set("utmContent", url.searchParams.get("utm_content") ?? "");

  const email = String(formData.get("submitterEmail") ?? "").trim().toLowerCase();
  const name = String(formData.get("submitterName") ?? "").trim().toLowerCase();
  formData.set("submitterId", email || name);
  formData.set(
    "campaignId",
    url.searchParams.get("campaign") ??
      url.searchParams.get("source") ??
      url.searchParams.get("utm_campaign") ??
      "",
  );
}

function appendCertificationFields(formData: FormData) {
  if (formData.get("autoLeadTermsAccepted")) {
    formData.set("informationAccurate", "true");
    formData.set("noFalseInformation", "true");
    formData.set("prospectConsented", "true");
    formData.set("prospectPresentInterest", "true");
    boundaryFields.forEach((field) => formData.set(field, "true"));
    formData.set("understandsRejection", "true");
    formData.set("consentCertified", "true");
  }
}

function getFormEventProps(formData: FormData) {
  return {
    submitter_id: String(formData.get("submitterId") ?? ""),
    campaign_id: String(formData.get("campaignId") ?? ""),
    source_domain: String(formData.get("sourceDomain") ?? ""),
    source_path: String(formData.get("sourcePath") ?? ""),
    utm_campaign: String(formData.get("utmCampaign") ?? ""),
  };
}
