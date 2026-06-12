import { Container } from "@/components/Container";
import { ScheduleButton } from "@/components/ContactActions";
import { TrackedAnchor, TrackedLink } from "@/components/marketing-events";
import { buttonClasses } from "@/components/ui/button";
import { site } from "@/config/site";
import { getOfficeById, type Office } from "@insurance-websites/domain";
import { getRequestMarket } from "@/lib/market";

export async function PageHero({
  eyebrow,
  title,
  subtitle,
  office,
  quoteHref = "/contact#quote",
  quoteLabel = "Get a quote",
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
  const marketOffice = office ?? getOfficeById((await getRequestMarket()).primaryOfficeId);
  const phoneDisplay = marketOffice.phoneDisplay ?? site.phoneDisplay;
  const phoneE164 = marketOffice.phoneE164 ?? site.phoneE164;
  const locale = quoteHref.startsWith("/zh") ? "zh" : "en";
  const defaultCallLabel = quoteHref.startsWith("/zh")
    ? `致电 ${phoneDisplay}`
    : `Call ${phoneDisplay}`;

  return (
    <section className="border-b border-[var(--rail-border)] bg-[var(--background)]">
      <Container className="py-16 sm:py-20">
        <div className="max-w-3xl space-y-6">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase text-[var(--brand-ink)]">
            <span className="inline-block size-2 rounded-[2px] bg-[var(--brand)]" />
            {eyebrow}
          </div>
          <h1 className="text-pretty font-[var(--font-serif)] text-5xl font-normal leading-[1.02] text-[var(--ink)] sm:text-6xl">
            {title}
          </h1>
          <p className="text-pretty text-base leading-7 text-[var(--muted)] sm:text-lg">
            {subtitle}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <TrackedLink
              className={buttonClasses({ variant: "primary", size: "md" })}
              href={quoteHref}
              eventName="quote_click"
              eventProps={{ source: "tracy_zhang_insurance_page_hero", page_title: title }}
            >
              {quoteLabel}
            </TrackedLink>
            <TrackedAnchor
              className={buttonClasses({ variant: "secondary", size: "md" })}
              href={`tel:${phoneE164}`}
              eventName="phone_click"
              eventProps={{
                source: "tracy_zhang_insurance_page_hero",
                page_title: title,
                phone: phoneDisplay,
              }}
            >
              {callLabel ?? defaultCallLabel}
            </TrackedAnchor>
            <ScheduleButton
              locale={locale}
              source="tracy_zhang_insurance_page_hero"
              eventProps={{ page_title: title }}
              variant="outline"
              size="md"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
