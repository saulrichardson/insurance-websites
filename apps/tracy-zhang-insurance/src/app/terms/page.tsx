import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { getRequestMarketOffice } from "@/lib/market";
import { getRouteMetadata } from "@/lib/seo";

export const metadata = getRouteMetadata("/terms");

export default async function TermsPage() {
  const { office } = await getRequestMarketOffice();

  return (
    <div className="bg-white">
      <PageHero
        eyebrow="Terms"
        title="Website terms"
        subtitle="General terms for using this website and submitting insurance inquiries."
      />

      <Container className="py-16">
        <div className="mx-auto max-w-3xl space-y-8 text-sm leading-6 text-slate-600">
          <section>
            <h2 className="text-lg font-semibold text-slate-900">General information</h2>
            <p className="mt-2">
              This website provides general insurance information and inquiry
              paths. It does not provide legal, tax, financial, or binding
              insurance advice.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-900">No coverage bound online</h2>
            <p className="mt-2">
              Submitting a form, sending a message, leaving a voicemail, or
              using this website does not bind, change, renew, or cancel any
              insurance coverage. Coverage is effective only after carrier
              approval and written confirmation.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Availability</h2>
            <p className="mt-2">
              Products, carriers, eligibility, underwriting, and pricing vary
              by product, risk, location, and current market conditions.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Contact</h2>
            <p className="mt-2">
              For urgent changes or coverage questions, call {office.phoneDisplay}
              instead of relying only on a website submission.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
