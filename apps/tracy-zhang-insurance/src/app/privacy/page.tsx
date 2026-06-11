import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { site } from "@/config/site";
import { getRouteMetadata } from "@/lib/seo";

export const metadata = getRouteMetadata("/privacy");

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="Privacy"
        title="Privacy policy"
        subtitle="How Tracy Zhang Insurance handles inquiry, quote, contact, and communication information."
      />

      <Container className="py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          <PolicySection title="Information we collect">
            When you request insurance help, we may collect your name, phone
            number, email address, ZIP code, preferred office, coverage
            interest, message details, source page, referral/campaign
            information, IP address, user agent, and consent records.
          </PolicySection>

          <PolicySection title="How we use information">
            We use information to respond to your request, prepare quote or
            coverage conversations, route your inquiry to the right office,
            document consent, improve marketing attribution, and service
            insurance-related requests.
          </PolicySection>

          <PolicySection title="How information may be shared">
            We may share information with insurance carriers, agency service
            providers, technology vendors, and other parties needed to quote,
            issue, service, or support insurance products and customer
            communications.
          </PolicySection>

          <PolicySection title="Mobile information">
            Mobile phone information collected for text messaging will not be
            shared with third parties or affiliates for their marketing or
            promotional purposes. It may be shared with service providers that
            help deliver messages and support the requested communication.
          </PolicySection>

          <PolicySection title="Your choices">
            You can ask us to stop marketing communications. For text messages,
            reply STOP to opt out or HELP for help. You can also call the office
            directly.
          </PolicySection>

          <PolicySection title="Questions">
            Questions about this policy can be directed to{" "}
            <a
              className="font-medium text-slate-900 hover:underline"
              href={`tel:${site.phoneE164}`}
            >
              {site.phoneDisplay}
            </a>
            .
          </PolicySection>
        </div>
      </Container>
    </div>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <p className="text-sm leading-6 text-slate-600">{children}</p>
    </section>
  );
}
