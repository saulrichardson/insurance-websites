import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { PageCTA } from "@/components/PageCTA";
import { PageHero } from "@/components/PageHero";
import { ProductDecisionGuide } from "@/components/ProductDecisionGuide";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Umbrella Insurance",
  description:
    "Umbrella insurance guidance for California households and business owners who want additional liability protection.",
  alternates: { canonical: "/umbrella-insurance" },
};

export default function UmbrellaInsurancePage() {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="California insurance guidance"
        title="Umbrella coverage for the liability claim you hope never happens"
        subtitle="We help review whether higher liability limits make sense across home, auto, rental property, boat, and business exposures."
      />

      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              When umbrella coverage is worth a conversation
            </h2>
            <p className="text-base leading-7 text-slate-600">
              Umbrella coverage is not just for unusual situations. It is often
              a practical review for households with drivers, property,
              savings, rental exposure, or business obligations.
            </p>
            <div className="grid gap-3">
              {[
                "Teen or multiple household drivers",
                "Home, rental property, or higher asset exposure",
                "Boat, motorcycle, or recreational vehicles",
                "Contracts or business exposure that raises liability questions",
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

          <Card className="p-7">
            <div className="text-base font-semibold text-slate-900">
              To review umbrella fit, we typically need
            </div>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">
              <li>Current auto and home limits</li>
              <li>Driver, property, and vehicle context</li>
              <li>Any rental, watercraft, or business exposure</li>
              <li>Questions about exclusions or required underlying limits</li>
            </ul>
          </Card>
        </div>
      </Container>

      <ProductDecisionGuide product="umbrella-insurance" />
      <PageCTA />
    </div>
  );
}
