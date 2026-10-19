import { Container } from "@/components/Container";
import { EmailButton, TextButton } from "@/components/ContactActions";
import { TrackedAnchor } from "@/components/marketing-events";
import { buttonClasses } from "@/components/ui/button";
import { getOfficeById, type Office } from "@insurance-websites/domain";
import { getRequestMarket } from "@/lib/market";

export async function PageCTA({
  title = "Let’s talk about what matters to you.",
  body = "A question, a change, a new chapter. We’re here to talk it through.",
  office,
  quoteHref = "/contact",
  callLabel,
}: {
  title?: string;
  body?: string;
  office?: Office;
  quoteHref?: string;
  quoteLabel?: string;
  callLabel?: string;
}) {
  const contact =
    office ?? getOfficeById((await getRequestMarket()).primaryOfficeId);
  const locale = quoteHref.startsWith("/zh") ? "zh" : "en";
  return (
    <section className="page-cta">
      <Container>
        <p className="page-eyebrow">
          {locale === "zh"
            ? "下一步，从聊一聊开始"
            : "YOUR NEXT STEP IS A CONVERSATION"}
        </p>
        <div className="page-cta-grid">
          <div>
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
          <div className="direct-actions">
            <TrackedAnchor
              className={buttonClasses({ size: "lg" })}
              href={`tel:${contact.phoneE164}`}
              eventName="phone_click"
              eventProps={{
                source: "page_cta",
                office: contact.id,
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
              source="page_cta"
              eventProps={{ office: contact.id }}
              variant="ghost"
            />
            <EmailButton
              locale={locale}
              source="page_cta"
              eventProps={{ office: contact.id }}
              variant="ghost"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
