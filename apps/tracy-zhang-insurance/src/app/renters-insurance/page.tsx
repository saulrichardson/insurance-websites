import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { PageCTA } from "@/components/PageCTA";
import { PageHero } from "@/components/PageHero";
import { ProductDecisionGuide } from "@/components/ProductDecisionGuide";
import { Card } from "@/components/ui/Card";
export const metadata: Metadata = {
  title: "Renters Insurance",
  description:
    "Renters insurance quotes and guidance in California. Protect your belongings and add liability coverage with a simple policy.",
  alternates: { canonical: "/renters-insurance" },
};

export default function RentersInsurancePage() {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="California insurance guidance"
        title="Renters insurance that’s easy to say yes to"
        subtitle="A simple way to protect your personal property and add liability coverage for apartments, rentals, and roommates."
      />

      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              What renters insurance can do
            </h2>
            <p className="text-base leading-7 text-slate-600">
              Renters insurance is often more about liability than “stuff.” We
              help you choose coverage amounts that match how you live.
            </p>

            <div className="grid gap-3">
              {[
                "Personal property (electronics, furniture, clothing)",
                "Personal liability (injury/property damage to others)",
                "Loss of use (temporary living expenses after a covered claim)",
                "Optional valuables coverage for higher-value items",
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
                <li>Rental address + unit type</li>
                <li>Approx. personal property amount</li>
                <li>Any pets (type/breed if applicable)</li>
                <li>Preferred deductible</li>
                <li>Landlord requirements (if you have them)</li>
              </ul>
            </Card>

            <Card className="p-7">
              <div className="text-base font-semibold text-slate-900">
                Want a fast start?
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Text us your address and we’ll reply with the next best step.
              </p>
            </Card>
          </div>
        </div>
      </Container>

      <ProductDecisionGuide product="renters-insurance" />

      <PageCTA
        title="Get a renters quote"
        body="Call, text, or request a quote online. We’ll keep it simple."
      />
    </div>
  );
}
