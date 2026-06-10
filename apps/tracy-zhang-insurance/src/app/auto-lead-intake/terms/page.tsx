import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/ui/button";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Auto Lead Intake Terms",
  description: "Submitter terms for Tracy Zhang Insurance auto lead intake.",
  alternates: { canonical: "/auto-lead-intake/terms" },
  robots: {
    index: false,
    follow: false,
  },
};

const confirmations = [
  "The information submitted is accurate to the submitter's knowledge based on facts provided by the prospect.",
  "The prospect gave permission to be contacted by Tracy Zhang Insurance about auto insurance.",
  "The prospect has present interest in being contacted about auto insurance.",
  "The submitter did not quote premiums, advise on coverage, compare products, explain policy terms, complete an application, bind coverage, or promise that coverage is available.",
  "The lead may be rejected, marked duplicate or invalid, revoked after review, or require additional follow-up.",
];

export default function AutoLeadIntakeTermsPage() {
  return (
    <div data-auto-lead-intake-terms className="min-h-screen bg-[#f4f6f1]">
      <style>
        {`
          body:has([data-auto-lead-intake-terms]) > header,
          body:has([data-auto-lead-intake-terms]) > footer {
            display: none;
          }
        `}
      </style>
      <Container className="py-5 sm:py-8">
        <div className="mx-auto max-w-3xl">
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
                <div className="text-sm text-[var(--muted)]">Auto lead intake terms</div>
              </div>
            </div>
          </header>

          <main className="py-7 sm:py-9">
            <div className="max-w-2xl">
              <h1 className="font-[var(--font-serif)] text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
                Auto lead intake terms
              </h1>
              <p className="mt-3 text-base leading-7 text-[var(--muted)]">
                These terms apply when a submitter sends one VIN-based auto lead to
                Tracy Zhang Insurance for review.
              </p>
            </div>

            <article className="mt-8 border border-[var(--rail-border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-md)] sm:p-7">
              <section>
                <h2 className="text-xl font-semibold text-[var(--ink)]">Submitter confirmation</h2>
                <ul className="mt-4 grid gap-3 text-sm leading-6 text-[var(--muted)]">
                  {confirmations.map((confirmation) => (
                    <li key={confirmation} className="grid grid-cols-[auto_1fr] gap-3">
                      <span className="mt-2 size-1.5 rounded-full bg-[var(--brand-ink)]" />
                      <span>{confirmation}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-7 border-t border-[var(--rail-border)] pt-6">
                <h2 className="text-xl font-semibold text-[var(--ink)]">Submission boundary</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  Submission is for factual lead intake only. It does not create a quote,
                  recommendation, application, binder, policy, coverage, or payment approval.
                </p>
              </section>

              <section className="mt-7 border-t border-[var(--rail-border)] pt-6">
                <h2 className="text-xl font-semibold text-[var(--ink)]">Source and review record</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  Tracy Zhang Insurance may store the submitted facts, campaign parameters,
                  referrer, request metadata, review status, and follow-up history for
                  attribution and lead review.
                </p>
              </section>

              <div className="mt-8 flex justify-start border-t border-[var(--rail-border)] pt-6">
                <Link href="/auto-lead-intake" className={buttonClasses({ variant: "primary" })}>
                  Back to intake
                </Link>
              </div>
            </article>
          </main>
        </div>
      </Container>
    </div>
  );
}
