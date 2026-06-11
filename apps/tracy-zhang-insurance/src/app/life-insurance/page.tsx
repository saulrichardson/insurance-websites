import { Container } from "@/components/Container";
import { PageCTA } from "@/components/PageCTA";
import { PageHero } from "@/components/PageHero";
import { ProductDecisionGuide } from "@/components/ProductDecisionGuide";
import { Card } from "@/components/ui/Card";
import { getProductMetadata } from "@/lib/seo";

export const metadata = getProductMetadata("life-insurance");

export default function LifeInsurancePage() {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="California insurance guidance"
        title="Life insurance sized for real life"
        subtitle="We’ll help you right-size coverage for income replacement, family protection, and long-term goals—without overcomplicating it."
      />

      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Start with the why
            </h2>
            <p className="text-base leading-7 text-slate-600">
              Life insurance is easiest when you begin with the outcome you’re
              protecting: your family’s lifestyle, debt payoff, education
              funding, business continuity, or legacy planning.
            </p>
            <div className="grid gap-3">
              {[
                "Term life for affordable, high-impact protection",
                "Permanent life for long-range planning (when it fits)",
                "Coverage amounts and how to think about them",
                "Beneficiaries, ownership, and updates over time",
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
                To get started, we’ll typically ask
              </div>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">
                <li>Age and general health background</li>
                <li>Coverage goal (we can help estimate)</li>
                <li>Timeline (how long you want protection)</li>
                <li>Budget range</li>
              </ul>
            </Card>

            <Card className="p-7">
              <div className="text-base font-semibold text-slate-900">
                Keep it simple
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We’ll focus on the options that fit your goal and avoid
                unnecessary complexity. If a product doesn’t fit, we’ll say so
                plainly.
              </p>
            </Card>
          </div>
        </div>
      </Container>

      <ProductDecisionGuide product="life-insurance" />

      <PageCTA title="Talk through life coverage" />
    </div>
  );
}
