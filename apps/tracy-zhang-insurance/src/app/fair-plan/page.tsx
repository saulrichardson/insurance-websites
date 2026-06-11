import { Container } from "@/components/Container";
import { PageCTA } from "@/components/PageCTA";
import { PageHero } from "@/components/PageHero";
import { ProductDecisionGuide } from "@/components/ProductDecisionGuide";
import { Card } from "@/components/ui/Card";
import { getProductMetadata } from "@/lib/seo";

export const metadata = getProductMetadata("fair-plan");

export default function FairPlanPage() {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="California insurance guidance"
        title="CA FAIR Plan guidance (and next steps)"
        subtitle="When the standard market isn’t available, you still have options. We’ll help you understand the path forward and what information is needed."
      />

      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              When this comes up
            </h2>
            <p className="text-base leading-7 text-slate-600">
              In California, underwriting and availability can change depending
              on location, property characteristics, and prior loss history. If
              your risk can’t be placed in the standard market, we can help you
              understand specialty options and timelines.
            </p>
            <div className="grid gap-3">
              {[
                "New purchase where standard options are limited",
                "Non-renewals and availability challenges",
                "Hard-to-place risks and unique property characteristics",
                "A need to pair a specialty property policy with separate liability coverage",
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
                To help quickly, we’ll usually ask for
              </div>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">
                <li>Property address</li>
                <li>Any current/past insurance details</li>
                <li>Year built + square footage</li>
                <li>Roof type/age (if known)</li>
                <li>Prior loss history (if applicable)</li>
              </ul>
            </Card>

            <Card className="p-7">
              <div className="text-base font-semibold text-slate-900">
                What we’ll do
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We’ll explain the path forward, identify what information is
                missing, and help you compare available options clearly.
              </p>
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                Note: Availability, eligibility, and timelines vary. We’ll set
                expectations up front.
              </div>
            </Card>
          </div>
        </div>
      </Container>

      <ProductDecisionGuide product="fair-plan" />

      <PageCTA title="Talk through your options" />
    </div>
  );
}
