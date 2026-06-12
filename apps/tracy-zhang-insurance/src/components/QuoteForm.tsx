"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import type { Office } from "@insurance-websites/domain";
import { consentCopy } from "@insurance-websites/lead-capture";

import { trackMarketingEvent } from "@/components/marketing-events";
import { buttonClasses } from "@/components/ui/button";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/routing";

type FormStatus = "idle" | "submitting" | "success" | "error";

const formCopy = {
  en: {
    nextSteps: [
      {
        label: "Share the change",
        body: "A renewal, purchase, driver, certificate, or coverage question.",
      },
      {
        label: "We review the fit",
        body: "Office, product, timing, and carrier path are checked before follow-up.",
      },
      {
        label: "Leave with a next step",
        body: "Quote path, document help, policy review, or a phone conversation.",
      },
    ],
    labels: {
      name: "Name",
      businessName: "Business name",
      productInterest: "What do you need?",
      selectOne: "Select one...",
      email: "Email",
      phone: "Phone",
      contactRequirement:
        "Provide either a valid phone number or email address so the office can follow up.",
      preferredOffice: "Preferred office",
      noPreference: "No preference",
      zip: "ZIP",
      preferredContact: "Preferred contact",
      details: "Details",
      consentErrorTitle: "Could not send your request",
      successTitle: "Request received",
      submitDisclaimer:
        "Submitting does not bind coverage. We confirm details before any quote, recommendation, or carrier submission.",
      submitIdle: "Send request",
      submitBusy: "Sending...",
      call: "Call",
      textUs: "Text us",
      businessPlaceholder: "If applicable",
      namePlaceholder: "Your name",
      messagePlaceholder:
        "Current policy, new home or vehicle, drivers, business certificate need, renewal date, or anything unusual.",
    },
    contactOptions: [
      { value: "phone", label: "Phone" },
      { value: "text", label: "Text" },
      { value: "email", label: "Email" },
    ],
    consent: consentCopy,
    errorFallback:
      "We could not send your request. Please call or text the office directly.",
    successBody: (phone: string) =>
      `We saved your request and will follow up. If your matter is urgent, call or text ${phone}.`,
    interestOptions: [
      ...site.offerings.map((o) => ({ value: o.title, label: o.title })),
      { value: "Umbrella insurance", label: "Umbrella insurance" },
      { value: "California property / FAIR Plan", label: "California property / FAIR Plan" },
      { value: "Workers compensation", label: "Workers compensation" },
      { value: "Bonds", label: "Bonds" },
      { value: "Certificate request", label: "Certificate request" },
      { value: "Coverage review", label: "Coverage review" },
      { value: "Other", label: "Other" },
    ],
  },
  zh: {
    nextSteps: [
      {
        label: "说明变化",
        body: "续保、新车、新房、司机、证书、贷款或保障问题。",
      },
      {
        label: "确认适合路径",
        body: "我们会看办公室、产品、时间和承保路径，再决定如何跟进。",
      },
      {
        label: "得到下一步",
        body: "可能是报价、文件协助、保单审查或电话沟通。",
      },
    ],
    labels: {
      name: "姓名",
      businessName: "公司名称",
      productInterest: "你需要哪方面帮助？",
      selectOne: "请选择...",
      email: "电子邮箱",
      phone: "电话",
      contactRequirement: "请提供有效电话或电子邮箱，方便办公室跟进。",
      preferredOffice: "偏好办公室",
      noPreference: "无偏好",
      zip: "邮编",
      preferredContact: "偏好联系方式",
      details: "详细说明",
      consentErrorTitle: "请求未能发送",
      successTitle: "已收到请求",
      submitDisclaimer:
        "提交表格不会绑定保险。任何报价、建议或提交承保公司之前，我们都会先确认细节。",
      submitIdle: "发送请求",
      submitBusy: "发送中...",
      call: "致电",
      textUs: "发短信",
      businessPlaceholder: "如适用",
      namePlaceholder: "你的姓名",
      messagePlaceholder:
        "现有保单、新房或车辆、司机、商业证书、续保日期，或任何特殊情况。",
    },
    contactOptions: [
      { value: "phone", label: "电话" },
      { value: "text", label: "短信" },
      { value: "email", label: "电子邮件" },
    ],
    consent: {
      contact:
        "提交此请求即表示你授权 Tracy Zhang Insurance 使用你提供的联系方式，就你的保险咨询与你联系。提交此表格不会绑定保险。",
      sms:
        "如果你选择短信，你同意接收 Tracy Zhang Insurance 就你的咨询发送的短信。可能产生短信和数据费用。回复 STOP 可退订，回复 HELP 可获得帮助。",
      marketing:
        "可选营销信息需要单独明确同意；不同意营销信息也可以提交保险咨询。",
    },
    errorFallback: "请求未能发送。请直接致电或发送短信给办公室。",
    successBody: (phone: string) =>
      `我们已保存你的请求，并会跟进。如事项紧急，请致电或发送短信至 ${phone}。`,
    interestOptions: [
      { value: "Auto Insurance", label: "车险" },
      { value: "Home Insurance", label: "房屋保险" },
      { value: "Condo Insurance", label: "公寓保险" },
      { value: "Renters Insurance", label: "租客保险" },
      { value: "Life Insurance", label: "人寿保险" },
      { value: "Umbrella Insurance", label: "伞险 / 额外责任险" },
      { value: "Business Insurance", label: "商业保险" },
      { value: "Motorcycle Insurance", label: "摩托车保险" },
      { value: "ATV Insurance", label: "ATV / 越野车保险" },
      { value: "Boat Insurance", label: "船只保险" },
      { value: "California property / FAIR Plan", label: "加州财产保险 / FAIR Plan" },
      { value: "Certificate request", label: "保险证书 / COI" },
      { value: "Coverage review", label: "保单审查" },
      { value: "Other", label: "其他" },
    ],
  },
} as const;

export function QuoteForm({
  officeOptions = site.offices,
  defaultOfficePreference,
  contactOffice,
  locale = "en",
}: {
  officeOptions?: Office[];
  defaultOfficePreference?: Office["slug"];
  contactOffice?: Office;
  locale?: Locale;
}) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [startedAt] = useState(() => String(Date.now()));
  const hasTrackedStart = useRef(false);

  const hasMultipleOffices = officeOptions.length > 1;
  const singleOfficePreference =
    !hasMultipleOffices
      ? (defaultOfficePreference ?? officeOptions[0]?.slug)
      : undefined;
  const copy = formCopy[locale];
  const nextSteps = copy.nextSteps;
  const selectedContactOffice =
    contactOffice ??
    officeOptions.find((option) => option.slug === defaultOfficePreference) ??
    (officeOptions.length === 1 ? officeOptions[0] : undefined);
  const contactPhoneDisplay = selectedContactOffice?.phoneDisplay ?? site.phoneDisplay;
  const contactPhoneE164 = selectedContactOffice?.phoneE164 ?? site.phoneE164;
  const contactSmsE164 = selectedContactOffice?.smsE164 ?? site.smsE164;

  const interestOptions = useMemo(
    () => copy.interestOptions,
    [copy.interestOptions],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);
    setRequestId(null);
    const submitStartedAt = Date.now();

    const form = event.currentTarget;
    const formData = new FormData(form);
    appendSourceFields(formData);
    const eventProps = getFormEventProps(formData);

    trackMarketingEvent("lead_submit_attempt", {
      ...eventProps,
      source: "tracy_zhang_insurance_quote_form",
    });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; requestId?: string; errors?: string[]; error?: string }
        | null;

      if (!response.ok || !payload?.ok) {
        setStatus("error");
        setError(
          (locale === "en" ? payload?.errors?.join(" ") : undefined) ||
            payload?.error ||
            copy.errorFallback,
        );
        trackMarketingEvent("lead_error", {
          ...eventProps,
          source: "tracy_zhang_insurance_quote_form",
          status: response.status,
          duration_ms: Date.now() - submitStartedAt,
        });
        return;
      }

      setStatus("success");
      setRequestId(payload.requestId ?? null);
      trackMarketingEvent("generate_lead", {
        ...eventProps,
        source: "tracy_zhang_insurance_quote_form",
        request_id: payload.requestId ?? "",
        duration_ms: Date.now() - submitStartedAt,
      });
      form.reset();
    } catch {
      setStatus("error");
      setError(copy.errorFallback);
      trackMarketingEvent("lead_error", {
        ...eventProps,
        source: "tracy_zhang_insurance_quote_form",
        status: "network",
        duration_ms: Date.now() - submitStartedAt,
      });
    }
  }

  function handleFormStart() {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;

    const url = new URL(window.location.href);
    trackMarketingEvent("form_start", {
      source: "tracy_zhang_insurance_quote_form",
      source_domain: window.location.host,
      source_path: `${window.location.pathname}${window.location.search}`,
      campaign: url.searchParams.get("campaign") ?? "",
      utm_campaign: url.searchParams.get("utm_campaign") ?? "",
    });
  }

  return (
    <form className="grid gap-4" onFocusCapture={handleFormStart} onSubmit={handleSubmit}>
      <div className="grid gap-2 rounded-lg border border-[var(--rail-border)] bg-[#f8f6ef] p-3 sm:grid-cols-3">
        {nextSteps.map((step, index) => (
          <div key={step.label} className="min-w-0 border-[var(--rail-border)] py-1 sm:border-l sm:first:border-l-0 sm:pl-3 sm:first:pl-0">
            <div className="font-[var(--font-mono)] text-[10px] uppercase text-[var(--brand-ink)]">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="mt-1 text-sm font-semibold text-[var(--ink)]">{step.label}</div>
            <div className="mt-1 text-xs leading-5 text-[var(--muted)]">{step.body}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-[var(--ink)]">{copy.labels.name}</span>
          <input
            name="name"
            required
            className="h-11 rounded-lg border border-[var(--rail-border)] bg-white px-4 text-sm text-[var(--ink)] shadow-sm outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[var(--ink)]/20"
            placeholder={copy.labels.namePlaceholder}
            autoComplete="name"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium text-[var(--ink)]">{copy.labels.businessName}</span>
          <input
            name="businessName"
            className="h-11 rounded-lg border border-[var(--rail-border)] bg-white px-4 text-sm text-[var(--ink)] shadow-sm outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[var(--ink)]/20"
            placeholder={copy.labels.businessPlaceholder}
            autoComplete="organization"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm">
        <span className="font-medium text-[var(--ink)]">{copy.labels.productInterest}</span>
        <select
          name="productInterest"
          required
          className="h-11 rounded-lg border border-[var(--rail-border)] bg-white px-4 text-sm text-[var(--ink)] shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]/20"
          defaultValue=""
        >
          <option value="" disabled>
            {copy.labels.selectOne}
          </option>
          {interestOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-[var(--ink)]">{copy.labels.email}</span>
          <input
            name="email"
            type="email"
            className="h-11 rounded-lg border border-[var(--rail-border)] bg-white px-4 text-sm text-[var(--ink)] shadow-sm outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[var(--ink)]/20"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium text-[var(--ink)]">{copy.labels.phone}</span>
          <input
            name="phone"
            type="tel"
            className="h-11 rounded-lg border border-[var(--rail-border)] bg-white px-4 text-sm text-[var(--ink)] shadow-sm outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[var(--ink)]/20"
            placeholder="(###) ###-####"
            autoComplete="tel"
          />
        </label>
      </div>
      <p className="-mt-2 text-xs leading-5 text-[var(--muted)]">
        {copy.labels.contactRequirement}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {hasMultipleOffices ? (
          <label className="grid gap-2 text-sm">
            <span className="font-medium text-[var(--ink)]">{copy.labels.preferredOffice}</span>
            <select
              name="officePreference"
              className="h-11 rounded-lg border border-[var(--rail-border)] bg-white px-4 text-sm text-[var(--ink)] shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]/20"
              defaultValue=""
            >
              <option value="">{copy.labels.noPreference}</option>
              {officeOptions.map((office) => (
                <option key={office.slug} value={office.slug}>
                  {office.label}, {office.address.addressRegion}
                </option>
              ))}
            </select>
          </label>
        ) : singleOfficePreference ? (
          <input type="hidden" name="officePreference" value={singleOfficePreference} />
        ) : null}

        <label className="grid gap-2 text-sm">
          <span className="font-medium text-[var(--ink)]">{copy.labels.zip}</span>
          <input
            name="zip"
            inputMode="numeric"
            className="h-11 rounded-lg border border-[var(--rail-border)] bg-white px-4 text-sm text-[var(--ink)] shadow-sm outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[var(--ink)]/20"
            placeholder="91108"
            autoComplete="postal-code"
          />
        </label>

        <fieldset
          className={`grid gap-2 text-sm ${hasMultipleOffices ? "sm:col-span-2" : ""}`}
        >
          <legend className="font-medium text-[var(--ink)]">{copy.labels.preferredContact}</legend>
          <div className="flex flex-wrap gap-3 rounded-lg border border-[var(--rail-border)] bg-white px-4 py-2 shadow-sm">
            {copy.contactOptions.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="preferredContact"
                  value={opt.value}
                  defaultChecked={opt.value === "phone"}
                />
                <span className="text-sm text-[var(--muted)]">{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <label className="grid gap-2 text-sm">
        <span className="font-medium text-[var(--ink)]">{copy.labels.details}</span>
        <textarea
          name="message"
          rows={5}
          className="rounded-lg border border-[var(--rail-border)] bg-white px-4 py-3 text-sm text-[var(--ink)] shadow-sm outline-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[var(--ink)]/20"
          placeholder={copy.labels.messagePlaceholder}
        />
      </label>

      <div className="grid gap-3 rounded-lg border border-[var(--rail-border)] bg-white/70 p-4 text-xs leading-5 text-[var(--muted)]">
        <label className="flex items-start gap-3">
          <input name="consentAccepted" type="checkbox" required className="mt-1" />
          <span>{copy.consent.contact}</span>
        </label>
        <label className="flex items-start gap-3">
          <input name="smsConsentAccepted" type="checkbox" className="mt-1" />
          <span>{copy.consent.sms}</span>
        </label>
        <div>{copy.consent.marketing}</div>
      </div>

      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <input type="hidden" name="startedAt" value={startedAt} />

      {status === "error" ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <div className="font-semibold">{copy.labels.consentErrorTitle}</div>
          <div className="mt-1">{error}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              className={buttonClasses({ variant: "primary", size: "sm" })}
              href={`tel:${contactPhoneE164}`}
              onClick={() =>
                trackMarketingEvent("phone_click", {
                  source: "tracy_zhang_insurance_quote_error",
                  phone: contactPhoneDisplay,
                })
              }
            >
              {copy.labels.call} {contactPhoneDisplay}
            </a>
            <a
              className={buttonClasses({ variant: "outline", size: "sm" })}
              href={`sms:${contactSmsE164}`}
              onClick={() =>
                trackMarketingEvent("sms_click", {
                  source: "tracy_zhang_insurance_quote_error",
                  phone: contactPhoneDisplay,
                })
              }
            >
              {copy.labels.textUs}
            </a>
          </div>
        </div>
      ) : null}

      {status === "success" ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">
          <div className="font-semibold">{copy.labels.successTitle}</div>
          <div className="mt-1">
            {copy.successBody(contactPhoneDisplay)}
          </div>
          {requestId ? <div className="mt-2 text-xs">Reference: {requestId}</div> : null}
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs leading-5 text-[var(--muted)]">
          {copy.labels.submitDisclaimer}
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className={buttonClasses({ variant: "primary", size: "md" })}
        >
          {status === "submitting" ? copy.labels.submitBusy : copy.labels.submitIdle}
        </button>
      </div>
    </form>
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
  formData.set("campaignSlug", url.searchParams.get("campaign") ?? "");
}

function getFormEventProps(formData: FormData) {
  return {
    interest: String(formData.get("productInterest") ?? ""),
    office: String(formData.get("officePreference") ?? "no_preference"),
    preferred_contact: String(formData.get("preferredContact") ?? ""),
    campaign: String(formData.get("campaignSlug") ?? ""),
    utm_campaign: String(formData.get("utmCampaign") ?? ""),
    source_domain: String(formData.get("sourceDomain") ?? ""),
    source_path: String(formData.get("sourcePath") ?? ""),
  };
}
