import { Container } from "@/components/Container";
import { PageCTA } from "@/components/PageCTA";
import { PageHero } from "@/components/PageHero";
import { ProductDecisionGuide } from "@/components/ProductDecisionGuide";
import { Card } from "@/components/ui/Card";
import { getProductMetadata } from "@/lib/seo";

export const metadata = getProductMetadata("boat-insurance");

export default function BoatInsurancePage() {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="California insurance guidance"
        title="Boat & watercraft coverage, simplified"
        subtitle="We’ll help you compare liability and physical-damage options, then tailor coverage to how and where you use your boat."
      />

      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              What we review
            </h2>
            <p className="text-base leading-7 text-slate-600">
              Watercraft coverage can vary a lot by vessel type and usage. We
              focus on the choices that materially change protection.
            </p>

            <div className="grid gap-3">
              {[
                "Liability limits (and who operates the boat)",
                "Hull coverage options (deductibles and settlement)",
                "Personal property/gear coverage (where available)",
                "Towing/assistance options",
                "Storage and usage details",
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
                <li>Boat details (year/make/model, length, horsepower)</li>
                <li>Where it’s stored (marina/driveway/covered)</li>
                <li>How it’s used (recreation/fishing/other)</li>
                <li>Primary operator details</li>
              </ul>
            </Card>

            <Card className="p-7">
              <div className="text-base font-semibold text-slate-900">
                Also need umbrella coverage?
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                If your assets warrant it, we can review umbrella options for
                additional liability protection.
              </p>
            </Card>
          </div>
        </div>
      </Container>

      <ProductDecisionGuide product="boat-insurance" />

      <PageCTA
        title="Get a boat quote"
        body="Call, text, or request a quote online. We’ll follow up quickly."
      />
    </div>
  );
}
