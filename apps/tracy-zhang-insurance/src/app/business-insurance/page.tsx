import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { PageCTA } from "@/components/PageCTA";
import { PageHero } from "@/components/PageHero";
import { ProductDecisionGuide } from "@/components/ProductDecisionGuide";
import { Card } from "@/components/ui/Card";
export const metadata: Metadata = {
  title: "Business Insurance",
  description:
    "Business insurance guidance and quotes in California. General liability, property, workers’ comp, and coverage built around your operations.",
  alternates: { canonical: "/business-insurance" },
};

export default function BusinessInsurancePage() {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="California insurance guidance"
        title="Business insurance built around your work"
        subtitle="We help small businesses choose coverage that fits how you operate—especially when contracts and certificates are involved."
      />

      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Common coverage needs
            </h2>
            <p className="text-base leading-7 text-slate-600">
              The right business policy depends on your industry, job sites,
              payroll, property, and contracts. We’ll help you structure a
              package that matches your reality.
            </p>
            <div className="grid gap-3">
              {[
                "General liability",
                "Commercial property",
                "Workers’ compensation",
                "Commercial auto",
                "Umbrella / excess liability",
                "Certificates of insurance (COIs)",
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
                To quote, we’ll typically need
              </div>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">
                <li>Business name + entity type</li>
                <li>Industry / operations description</li>
                <li>Revenue and payroll (approx. is fine to start)</li>
                <li>Locations and job-site details (if applicable)</li>
                <li>Any contract requirements</li>
              </ul>
            </Card>

            <Card className="p-7">
              <div className="text-base font-semibold text-slate-900">
                Need a certificate fast?
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Once you’re a client, we can help streamline routine requests
                like COIs and policy updates.
              </p>
            </Card>
          </div>
        </div>
      </Container>

      <ProductDecisionGuide product="business-insurance" />

      <PageCTA title="Get a business quote" />
    </div>
  );
}
