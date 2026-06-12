import { Container } from "@/components/Container";
import { ScheduleButton } from "@/components/ContactActions";
import { TrackedAnchor, TrackedLink } from "@/components/marketing-events";
import { buttonClasses } from "@/components/ui/button";
import { site } from "@/config/site";
import { getOfficeById, type Office } from "@insurance-websites/domain";
import { getRequestMarket } from "@/lib/market";

export async function PageCTA({
  title = "Ready to talk?",
  body = "Call, text, or request a quote online. We will respond quickly and help you compare the next step.",
  office,
  quoteHref = "/contact#quote",
  quoteLabel = "Get a quote",
  callLabel,
}: {
  title?: string;
  body?: string;
  office?: Office;
  quoteHref?: string;
  quoteLabel?: string;
  callLabel?: string;
}) {
  const marketOffice = office ?? getOfficeById((await getRequestMarket()).primaryOfficeId);
  const phoneDisplay = marketOffice.phoneDisplay ?? site.phoneDisplay;
  const phoneE164 = marketOffice.phoneE164 ?? site.phoneE164;
  const locale = quoteHref.startsWith("/zh") ? "zh" : "en";
  const defaultCallLabel = quoteHref.startsWith("/zh")
    ? `致电 ${phoneDisplay}`
    : `Call ${phoneDisplay}`;

  return (
    <section className="border-t border-[var(--rail-border)] bg-[var(--ink)]">
      <Container className="py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 text-base leading-7 text-white/70">{body}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
            <TrackedAnchor
              className={buttonClasses({
                variant: "secondary",
                size: "lg",
                className:
                  "bg-white text-[var(--ink)] hover:bg-[var(--surface)] border border-white/10",
              })}
              href={`tel:${phoneE164}`}
              eventName="phone_click"
              eventProps={{
                source: "tracy_zhang_insurance_page_cta",
                phone: phoneDisplay,
              }}
            >
              {callLabel ?? defaultCallLabel}
            </TrackedAnchor>
            <ScheduleButton
              locale={locale}
              source="tracy_zhang_insurance_page_cta"
              variant="secondary"
              size="lg"
              className="border border-white/50 bg-transparent text-white hover:bg-white hover:text-[var(--ink)]"
            />
            <TrackedLink
              className={buttonClasses({
                variant: "secondary",
                size: "lg",
                className:
                  "bg-transparent text-white hover:bg-white hover:text-[var(--ink)] border border-white/50",
              })}
              href={quoteHref}
              eventName="quote_click"
              eventProps={{ source: "tracy_zhang_insurance_page_cta" }}
            >
              {quoteLabel}
            </TrackedLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
