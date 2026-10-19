import { Container } from "@/components/Container";
import { EmailButton, TextButton } from "@/components/ContactActions";
import { TrackedAnchor, TrackedLink } from "@/components/marketing-events";
import { buttonClasses } from "@/components/ui/button";
import { getOfficeById, type Office } from "@insurance-websites/domain";
import { getRequestMarket } from "@/lib/market";

export async function PageHero({
  eyebrow,
  title,
  subtitle,
  office,
  quoteHref = "/contact",
  quoteLabel = "Contact us",
  callLabel,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  office?: Office;
  quoteHref?: string;
  quoteLabel?: string;
  callLabel?: string;
}) {
  const contact =
    office ?? getOfficeById((await getRequestMarket()).primaryOfficeId);
  const locale = quoteHref.startsWith("/zh") ? "zh" : "en";
  return (
    <section className="page-hero">
      <Container>
        <div className="page-hero-grid">
          <div>
            <p className="page-eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
          </div>
          <div className="page-hero-copy">
            <p>{subtitle}</p>
            <div className="direct-actions">
              <TrackedAnchor
                className={buttonClasses({ size: "lg" })}
                href={`tel:${contact.phoneE164}`}
                eventName="phone_click"
                eventProps={{
                  source: "page_hero",
                  office: contact.id,
                  page_title: title,
                  phone: contact.phoneDisplay,
                }}
              >
                {callLabel ??
                  `${locale === "zh" ? "致电" : "Call"} ${contact.phoneDisplay}`}{" "}
                <span aria-hidden>↗</span>
              </TrackedAnchor>
              <TextButton
                phone={contact.smsE164}
                locale={locale}
                source="page_hero"
                eventProps={{ office: contact.id, page_title: title }}
                variant="ghost"
              />
              <EmailButton
                locale={locale}
                source="page_hero"
                eventProps={{ office: contact.id, page_title: title }}
                variant="ghost"
              />
            </div>
            <TrackedLink
              className="page-contact-link"
              href={quoteHref}
              eventName="contact_click"
              eventProps={{ source: "page_hero" }}
            >
              {quoteLabel} <span aria-hidden>↗</span>
            </TrackedLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
