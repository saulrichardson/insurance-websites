import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { PageCTA } from "@/components/PageCTA";
import { PageHero } from "@/components/PageHero";
import { ProductDecisionGuide } from "@/components/ProductDecisionGuide";
import { Card } from "@/components/ui/Card";
export const metadata: Metadata = {
  title: "Auto Insurance",
  description:
    "Auto insurance quotes and guidance in California. Coverage options for drivers, families, and multi-car households.",
  alternates: { canonical: "/auto-insurance" },
};

export default function AutoInsurancePage() {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="California insurance guidance"
        title="Auto insurance that’s easy to compare"
        subtitle="We’ll help you choose coverage, deductibles, and limits that match your needs—then make it easy to bind and keep updated."
      />

      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              What we review
            </h2>
            <p className="text-base leading-7 text-slate-600">
              Good auto insurance isn’t just “the cheapest price.” We’ll walk
              you through the decisions that matter so you can protect your
              family and assets.
            </p>

            <div className="grid gap-3">
              {[
                "Liability limits that match your risk",
                "Collision and comprehensive deductibles",
                "Uninsured/underinsured motorist coverage",
                "Rental reimbursement and roadside assistance",
                "Multi-car and bundling opportunities",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm"
                >
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-[var(--brand)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <Card className="p-7">
              <div className="text-base font-semibold text-slate-900">
                To quote accurately, we’ll typically need
              </div>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">
                <li>Driver names + dates of birth</li>
                <li>Driver’s license numbers (if available)</li>
                <li>Vehicle VINs, plus year/make/model if available</li>
                <li>Current carrier + limits (if currently insured)</li>
                <li>Address where vehicles are garaged</li>
              </ul>
            </Card>

            <Card className="p-7">
              <div className="text-base font-semibold text-slate-900">
                Want us to review your current policy?
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Send your declarations page and we’ll identify where coverage
                is strong and where gaps may exist.
              </p>
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                Tip: If you have teen drivers, we can help you structure limits
                and deductibles with that risk in mind.
              </div>
            </Card>
          </div>
        </div>
      </Container>

      <ProductDecisionGuide product="auto-insurance" />

      <PageCTA
        title="Get an auto quote"
        body="Call, text, or request a quote online. We’ll ask only what we need to quote accurately, then present options you can compare."
      />
    </div>
  );
}
