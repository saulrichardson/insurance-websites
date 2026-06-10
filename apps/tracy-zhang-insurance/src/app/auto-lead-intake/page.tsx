import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/Container";
import { AutoLeadForm } from "@/components/AutoLeadForm";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Auto Lead Intake",
  description: "One-car auto lead submission for review.",
  alternates: { canonical: "/auto-lead-intake" },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AutoLeadIntakePage() {
  return (
    <div data-auto-lead-intake className="min-h-screen bg-[#f4f6f1]">
      <style>
        {`
          body:has([data-auto-lead-intake]) > header,
          body:has([data-auto-lead-intake]) > footer {
            display: none;
          }
        `}
      </style>
      <Container className="py-5 sm:py-8">
        <div className="mx-auto max-w-4xl">
          <header className="border-b border-[var(--rail-border)] pb-5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-lg border border-[#0e1941]/15 bg-white shadow-[0_8px_18px_rgba(8,38,40,0.12)]">
                <Image
                  src="/tz-logo-cropped.png"
                  alt=""
                  width={96}
                  height={96}
                  className="size-full object-cover"
                  priority
                />
              </span>
              <div className="min-w-0">
                <div className="text-base font-semibold text-[var(--ink)]">{site.name}</div>
                <div className="text-sm text-[var(--muted)]">Auto lead intake</div>
              </div>
            </div>
          </header>

          <section className="py-7 sm:py-9">
            <div className="max-w-2xl">
              <h1 className="font-[var(--font-serif)] text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
                Auto lead intake
              </h1>
              <p className="mt-3 text-base leading-7 text-[var(--muted)]">
                Submit one vehicle at a time with VIN, garaging ZIP, driver full legal name,
                and consent. The review team will handle the next step.
              </p>
            </div>
          </section>

          <section className="border border-[var(--rail-border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-md)] sm:p-6">
            <AutoLeadForm />
          </section>
        </div>
      </Container>
    </div>
  );
}
