"use client";

import { useMemo, useState } from "react";
import { site } from "@/lib/site";

type QuoteStatus = "idle" | "submitting" | "success" | "error";

const coverageOptions = [
  { value: "auto", label: "Auto & vehicles" },
  { value: "home", label: "Home & property" },
  { value: "condo", label: "Condo" },
  { value: "renters", label: "Renters" },
  { value: "life", label: "Life insurance" },
  { value: "long-term-care", label: "Long‑term care" },
  { value: "financial", label: "Financial products" },
  { value: "business", label: "Business insurance" },
  { value: "not_sure", label: "Not sure yet" },
] as const;

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

function FieldHint({ children }: { children: string }) {
  return <div className="text-xs leading-6 text-foreground/70">{children}</div>;
}

type CoverageValue = (typeof coverageOptions)[number]["value"];

type QuoteRequestFormProps = {
  defaultCoverage?: CoverageValue;
  source?: string;
  className?: string;
};

export function QuoteRequestForm(props: QuoteRequestFormProps = {}) {
  return <QuoteRequestFormInner {...props} />;
}

function QuoteRequestFormInner({
  defaultCoverage = "not_sure",
  source = "insurance-page",
  className = "",
}: QuoteRequestFormProps = {}) {
  const [status, setStatus] = useState<QuoteStatus>("idle");
  const [message, setMessage] = useState<string>("");
  const [lastSubmittedAt, setLastSubmittedAt] = useState<string | null>(null);
  const [startedAt] = useState(() => Date.now().toString());

  const statusCopy = useMemo(() => {
    if (status === "success") {
      return "Request received. We’ll reach out as soon as possible.";
    }
    if (status === "error") {
      return "Something went wrong. Please call us and we’ll help right away.";
    }
    return "";
  }, [status]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/quote", {
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
      setLastSubmittedAt(new Date().toISOString());
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to submit form.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={["border border-foreground/20 bg-background/35 p-6 sm:p-7", className].join(" ")}
    >
      <div className="text-sm font-semibold text-foreground">Your information</div>
      <div className="mt-2 text-sm text-foreground/75">
        Prefer to talk? Call{" "}
        <a className="underline underline-offset-4 hover:text-foreground" href={`tel:${site.agent.phone.e164}`}>
          {site.agent.phone.display}
        </a>
        .
      </div>

      <div className="mt-6 grid gap-4">
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
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <input
              id="phone"
              name="phone"
              required
              inputMode="tel"
              autoComplete="tel"
              className="h-11 w-full rounded-none border border-foreground/40 bg-background/80 px-4 text-sm text-foreground placeholder:text-foreground/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
            />
          </div>

          <div className="grid gap-2">
            <FieldLabel htmlFor="email">Email (optional)</FieldLabel>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="h-11 w-full rounded-none border border-foreground/40 bg-background/80 px-4 text-sm text-foreground placeholder:text-foreground/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
            />
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="grid gap-2">
            <FieldLabel htmlFor="coverage">Coverage</FieldLabel>
            <select
              id="coverage"
              name="coverage"
              defaultValue={defaultCoverage}
              className="h-11 w-full rounded-none border border-foreground/40 bg-background/80 px-4 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
            >
              {coverageOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <FieldLabel htmlFor="zip">ZIP code (optional)</FieldLabel>
            <input
              id="zip"
              name="zip"
              inputMode="numeric"
              autoComplete="postal-code"
              className="h-11 w-full rounded-none border border-foreground/40 bg-background/80 px-4 text-sm text-foreground placeholder:text-foreground/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <FieldLabel htmlFor="notes">What should we know? (optional)</FieldLabel>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            className="w-full rounded-none border border-foreground/40 bg-background/80 px-4 py-3 text-sm leading-7 text-foreground placeholder:text-foreground/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
          />
          <FieldHint>
            If you have an existing policy, include the carrier and renewal date if available.
          </FieldHint>
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
        {lastSubmittedAt ? <input type="hidden" name="submittedAt" value={lastSubmittedAt} /> : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-none border border-foreground bg-foreground px-6 text-xs font-medium uppercase tracking-[0.18em] text-white shadow-sm shadow-black/15 transition-colors hover:bg-foreground/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60 disabled:pointer-events-none disabled:opacity-70"
        >
          {status === "submitting" ? "Sending..." : "Request quote"}
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
