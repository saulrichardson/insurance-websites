import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { PageCTA } from "@/components/PageCTA";
import { PageHero } from "@/components/PageHero";
import { ProductDecisionGuide } from "@/components/ProductDecisionGuide";
import { Card } from "@/components/ui/Card";
export const metadata: Metadata = {
  title: "Motorcycle Insurance",
  description:
    "Motorcycle insurance quotes and guidance in California. Coverage options for bikes, liability, accessories, and more.",
  alternates: { canonical: "/motorcycle-insurance" },
};

export default function MotorcycleInsurancePage() {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="California insurance guidance"
        title="Motorcycle coverage that fits your ride"
        subtitle="We’ll help you balance price and protection—so you’re not surprised by deductibles, limits, or accessory coverage."
      />

      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              What we review
            </h2>
            <p className="text-base leading-7 text-slate-600">
              Motorcycle policies can differ in the details. We focus on what
              changes your outcome in a real claim.
            </p>

            <div className="grid gap-3">
              {[
                "Liability limits and injury protection",
                "Collision and comprehensive (with deductibles)",
                "Uninsured/underinsured motorist coverage",
                "Accessory/gear coverage (where applicable)",
                "Towing/roadside options",
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
                <li>Rider info (name/DOB) + license status</li>
                <li>Motorcycle VIN, plus year/make/model if available</li>
                <li>How it’s used (commute/recreation)</li>
                <li>Where it’s stored (garage/driveway)</li>
                <li>Current coverage (if insured today)</li>
              </ul>
            </Card>

            <Card className="p-7">
              <div className="text-base font-semibold text-slate-900">
                Bundling can help
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                If you also need auto or home coverage, we can review bundling
                opportunities so you can compare total cost.
              </p>
            </Card>
          </div>
        </div>
      </Container>

      <ProductDecisionGuide product="motorcycle-insurance" />

      <PageCTA
        title="Get a motorcycle quote"
        body="Call, text, or request a quote online. We’ll respond quickly with next steps."
      />
    </div>
  );
}
