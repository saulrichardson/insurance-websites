import { Container } from "@/components/Container";
import { PageCTA } from "@/components/PageCTA";
import { PageHero } from "@/components/PageHero";
import { ProductDecisionGuide } from "@/components/ProductDecisionGuide";
import { Card } from "@/components/ui/Card";
import { getProductMetadata } from "@/lib/seo";

export const metadata = getProductMetadata("california-property-insurance");

export default function CaliforniaPropertyInsurancePage() {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="California property guidance"
        title="A practical path when property insurance gets harder"
        subtitle="We help property owners review renewal changes, lender deadlines, hard-to-place homes, FAIR Plan questions, and companion coverage needs."
      />

      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Start with the constraint
            </h2>
            <p className="text-base leading-7 text-slate-600">
              California property coverage is often about what is realistically
              available, what a lender requires, and what gaps need a separate
              conversation.
            </p>
            <div className="grid gap-3">
              {[
                "Renewal premium or deductible changed",
                "Carrier nonrenewal or limited market availability",
                "Escrow or lender proof deadline",
                "FAIR Plan plus companion coverage questions",
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
              To review options, we typically need
            </div>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">
              <li>Property address and occupancy</li>
              <li>Current declarations page or renewal notice</li>
              <li>Nonrenewal or underwriting communication if any</li>
              <li>Any lender, escrow, or renewal deadline</li>
            </ul>
          </Card>
        </div>
      </Container>

      <ProductDecisionGuide product="california-property-insurance" />
      <PageCTA />
    </div>
  );
}
