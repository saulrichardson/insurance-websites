import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { PageCTA } from "@/components/PageCTA";
import { PageHero } from "@/components/PageHero";
import { ProductDecisionGuide } from "@/components/ProductDecisionGuide";
import { Card } from "@/components/ui/Card";
export const metadata: Metadata = {
  title: "Condo Insurance",
  description:
    "Condo (HO-6) insurance guidance and quotes in California. Coordinate unit coverage with your HOA master policy and avoid common gaps.",
  alternates: { canonical: "/condo-insurance" },
};

export default function CondoInsurancePage() {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="California insurance guidance"
        title="Condo insurance that’s easy to understand"
        subtitle="We’ll help you match your HO-6 coverage to your HOA master policy so your unit, belongings, and liability are actually protected."
      />

      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              What we review
            </h2>
            <p className="text-base leading-7 text-slate-600">
              Condo coverage is all about coordination: what the HOA covers vs.
              what you need to cover inside the unit.
            </p>

            <div className="grid gap-3">
              {[
                "Personal property coverage (your belongings)",
                "Personal liability + medical payments",
                "Loss assessment coverage (HOA assessments)",
                "Improvements and betterments (unit upgrades)",
                "Deductibles and common exclusions",
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
                <li>Unit address + HOA/community name</li>
                <li>Owner-occupied vs. rental status</li>
                <li>Approx. personal property amount</li>
                <li>Any unit upgrades (if known)</li>
                <li>HOA master policy summary (if available)</li>
              </ul>
            </Card>

            <Card className="p-7">
              <div className="text-base font-semibold text-slate-900">
                A common high-value add-on
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Many condo owners pair HO-6 with an umbrella policy for added
                liability protection.
              </p>
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                If it fits, we’ll recommend it. If it doesn’t, we won’t push it.
              </div>
            </Card>
          </div>
        </div>
      </Container>

      <ProductDecisionGuide product="condo-insurance" />

      <PageCTA
        title="Get a condo quote"
        body="Call, text, or request a quote online. We’ll make the HOA coordination simple."
      />
    </div>
  );
}
