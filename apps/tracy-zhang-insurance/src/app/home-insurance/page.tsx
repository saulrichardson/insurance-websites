import Link from "next/link";

import { Container } from "@/components/Container";
import { PageCTA } from "@/components/PageCTA";
import { PageHero } from "@/components/PageHero";
import { ProductDecisionGuide } from "@/components/ProductDecisionGuide";
import { Card } from "@/components/ui/Card";
import { getProductMetadata } from "@/lib/seo";

export const metadata = getProductMetadata("home-insurance");

export default function HomeInsurancePage() {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="California insurance guidance"
        title="Home & condo insurance with clear guidance"
        subtitle="We’ll help you balance price and protection—especially around replacement cost, deductibles, liability, and special items."
      />

      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Decisions that matter
            </h2>
            <p className="text-base leading-7 text-slate-600">
              Home insurance can be confusing because the most important
              numbers aren’t always obvious. We’ll help you understand what
              you’re buying.
            </p>
            <div className="grid gap-3">
              {[
                "Dwelling / replacement cost (what it costs to rebuild)",
                "Personal property and special limits for valuables",
                "Personal liability and medical payments",
                "Deductibles and how they impact real claims",
                "Additional living expenses (loss of use)",
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
                To quote, we’ll typically ask for
              </div>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">
                <li>Property address</li>
                <li>Year built + square footage</li>
                <li>Roof type/age (if known)</li>
                <li>Any prior claims (if applicable)</li>
                <li>Current declarations page (if currently insured)</li>
              </ul>
            </Card>

            <Card className="p-7">
              <div className="text-base font-semibold text-slate-900">
                Need help with California market complexity?
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                If the standard market isn’t an option, we can help you
                understand next steps and specialty options (including the CA
                FAIR Plan).
              </p>
              <div className="mt-4">
                <Link
                  className="text-sm font-medium text-slate-900 hover:underline"
                  href="/fair-plan"
                >
                  Learn about CA FAIR Plan guidance →
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </Container>

      <ProductDecisionGuide product="home-insurance" />

      <PageCTA title="Get a home quote" />
    </div>
  );
}
