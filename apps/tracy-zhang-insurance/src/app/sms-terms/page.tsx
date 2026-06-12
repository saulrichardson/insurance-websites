import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { getRequestMarketOffice } from "@/lib/market";
import { getRouteMetadata } from "@/lib/seo";

export const metadata = getRouteMetadata("/sms-terms");

export default async function SmsTermsPage() {
  const { office } = await getRequestMarketOffice();

  return (
    <div className="bg-white">
      <PageHero
        eyebrow="SMS terms"
        title="Text message terms"
        subtitle="Terms for text message communications from Tracy Zhang Insurance."
      />

      <Container className="py-16">
        <div className="mx-auto max-w-3xl space-y-8 text-sm leading-6 text-slate-600">
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Program description</h2>
            <p className="mt-2">
              Tracy Zhang Insurance may send text messages related to insurance
              inquiries, quote follow-up, appointment coordination, document
              requests, service updates, and separately consented marketing
              communications.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Message frequency</h2>
            <p className="mt-2">
              Message frequency varies by request and communication type. You
              may receive multiple messages while we respond to an active
              inquiry or service request.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Rates and support</h2>
            <p className="mt-2">
              Message and data rates may apply. Reply HELP for help or call{" "}
              {office.phoneDisplay}.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Opt out</h2>
            <p className="mt-2">
              Reply STOP to opt out of text messages. Carriers are not liable
              for delayed or undelivered messages.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Privacy</h2>
            <p className="mt-2">
              See the privacy policy for how information is collected and used.
              Mobile information is not shared with third parties for their
              marketing or promotional purposes.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
