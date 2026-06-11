import { Container } from "@/components/Container";
import { PageCTA } from "@/components/PageCTA";
import { PageHero } from "@/components/PageHero";
import { ProductDecisionGuide } from "@/components/ProductDecisionGuide";
import { Card } from "@/components/ui/Card";
import { getProductMetadata } from "@/lib/seo";

export const metadata = getProductMetadata("atv-insurance");

export default function ATVInsurancePage() {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="California insurance guidance"
        title="ATV coverage for off-road life"
        subtitle="We’ll help you choose liability and physical-damage options that make sense for how you ride and where you store your ATV."
      />

      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              What we review
            </h2>
            <p className="text-base leading-7 text-slate-600">
              Off-road vehicles often have different risk than on-road autos.
              We focus on liability, storage, and realistic claim scenarios.
            </p>

            <div className="grid gap-3">
              {[
                "Liability coverage for injuries/property damage",
                "Comprehensive/collision options (if available)",
                "Coverage for trailers and transport considerations",
                "Where you ride (private land vs. parks/trails)",
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
                <li>ATV details (VIN if available)</li>
                <li>Where it’s stored</li>
                <li>Primary operator info</li>
                <li>Any existing policies we should coordinate with</li>
              </ul>
            </Card>

            <Card className="p-7">
              <div className="text-base font-semibold text-slate-900">
                Not sure what you need?
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Tell us what you have and how it’s used. We’ll guide you to the
                best next step.
              </p>
            </Card>
          </div>
        </div>
      </Container>

      <ProductDecisionGuide product="atv-insurance" />

      <PageCTA
        title="Get an ATV quote"
        body="Call, text, or request a quote online. We’ll keep the process simple."
      />
    </div>
  );
}
