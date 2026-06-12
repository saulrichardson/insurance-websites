import Image from "next/image";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  Languages,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";

import {
  EmailAnchor,
  EmailButton,
  ScheduleButton,
} from "@/components/contact-actions";
import { TrackedAnchor } from "@/components/marketing-events";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

const businessSite = "https://tracyzhanginsurance.com";
const quoteHref = `${businessSite}/contact#quote`;

const advisorPrinciples = [
  {
    title: "Start with what changed",
    body: "A renewal, a new driver, a lender request, a certificate, a move, or a family decision changes what needs to be reviewed.",
    icon: ClipboardCheck,
  },
  {
    title: "Make the tradeoff visible",
    body: "Tracy helps separate premium, limits, deductibles, exclusions, timing, and document needs before the next step is chosen.",
    icon: ShieldCheck,
  },
  {
    title: "Leave with a next step",
    body: "If the answer is a quote, document, review, or follow-up call, Tracy helps route it without making you decode coverage language alone.",
    icon: CalendarCheck,
  },
];

const callMoments = [
  {
    label: "Household review",
    title: "Home, auto, condo, renters, or umbrella questions",
    href: `${businessSite}/products#household`,
  },
  {
    label: "Property pressure",
    title: "California renewal, FAIR Plan, lender, or coverage-gap concerns",
    href: `${businessSite}/california-property-insurance`,
  },
  {
    label: "Family planning",
    title: "Life insurance, new dependents, mortgage, or long-term protection",
    href: `${businessSite}/life-insurance`,
  },
  {
    label: "Business need",
    title: "Certificates, contracts, liability, property, or business auto",
    href: `${businessSite}/business-insurance`,
  },
];

const proofStats = [
  {
    value: `${site.agent.rating.score}`,
    label: `${site.agent.rating.sourceLabel} rating`,
  },
  {
    value: `${site.agent.rating.reviewCount}+`,
    label: "public reviews on the San Marino profile",
  },
  {
    value: String(site.agent.languages.length),
    label: "languages supported by the agency team",
  },
];

const latestGuidance = {
  title: "Why You Should Consider the CA FAIR Plan",
  description:
    "A practical look at when the FAIR Plan can create a better structure than accepting the first painful specialty-market quote.",
  href: `${businessSite}/stories/why-you-should-consider-the-ca-fair-plan`,
};

export default function Home() {
  return (
    <main id="main" className="bg-background text-foreground">
      <section className="overflow-hidden border-b border-accent/10">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.63fr_0.37fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-accent/12 bg-surface px-4 py-2 text-xs font-semibold uppercase text-muted shadow-sm shadow-black/5">
                <span className="size-2 rounded-full bg-brand" />
                California insurance advisor
              </div>

              <h1 className="mt-7 max-w-4xl font-serif text-6xl font-semibold leading-[0.9] text-accent sm:text-8xl lg:text-[7.5rem]">
                Tracy Zhang
              </h1>

              <p className="mt-7 max-w-2xl text-pretty text-xl leading-8 text-foreground/76">
                Clear insurance guidance for California households, property
                owners, families, and business owners who want the next step to
                make sense before they choose it.
              </p>

              <p className="mt-4 max-w-2xl text-base leading-7 text-foreground/66">
                Start with the real-life change in front of you. Tracy helps
                separate the coverage question, the document need, and the
                tradeoff worth reviewing.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <ButtonLink
                  href={quoteHref}
                  variant="primary"
                  size="md"
                  eventName="cross_site_click"
                  eventProps={{
                    source: "tracy_hero_quote",
                    destination: quoteHref,
                  }}
                >
                  Get insurance help
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
                <ScheduleButton
                  source="tracy_hero"
                  variant="outline"
                  size="md"
                  icon
                />
                <TrackedAnchor
                  href={`tel:${site.agent.phone.e164}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-accent/25 bg-surface px-5 text-sm font-medium text-accent shadow-sm shadow-black/5 hover:bg-background/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
                  eventName="phone_click"
                  eventProps={{
                    source: "tracy_hero",
                    phone: site.agent.phone.display,
                  }}
                >
                  <Phone className="size-4" aria-hidden />
                  Call {site.agent.phone.display}
                </TrackedAnchor>
              </div>
            </div>

            <aside className="lg:justify-self-end" aria-label="Tracy Zhang profile">
              <div className="max-w-md border border-accent/12 bg-surface shadow-2xl shadow-accent/12">
                <div className="grid grid-cols-[128px_1fr] gap-5 p-5 sm:grid-cols-[150px_1fr]">
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-background">
                    <Image
                      src={site.agent.images.headshot}
                      alt={site.agent.name}
                      fill
                      className="object-cover object-center"
                      sizes="150px"
                      priority
                    />
                  </div>
                  <div className="min-w-0 self-center">
                    <div className="text-xs font-semibold uppercase text-muted">
                      Direct line
                    </div>
                    <div className="mt-2 whitespace-nowrap text-xl font-semibold leading-tight text-accent sm:text-2xl">
                      {site.agent.phone.display}
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm text-foreground/62">
                      <Star className="size-4 text-brand" aria-hidden />
                      {site.agent.rating.score} rating, {site.agent.rating.reviewCount}+ reviews
                    </div>
                  </div>
                </div>

                <div className="border-t border-accent/10 p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted">
                    <Languages className="size-4 text-brand" aria-hidden />
                    Languages
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {site.agent.languages.map((language) => (
                      <span
                        key={language}
                        className="rounded-full border border-accent/12 bg-background px-3 py-1 text-xs text-foreground/70"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                <TrackedAnchor
                  href={site.agent.links.allstateProfile}
                  className="flex items-center justify-between border-t border-accent/10 px-5 py-4 text-sm font-semibold text-accent hover:bg-background/75"
                  eventName="profile_click"
                  eventProps={{
                    source: "tracy_profile_panel",
                    destination: site.agent.links.allstateProfile,
                  }}
                >
                  View public profile
                  <ArrowRight className="size-4" aria-hidden />
                </TrackedAnchor>
                <EmailAnchor
                  source="tracy_profile_panel"
                  className="flex items-center justify-between border-t border-accent/10 px-5 py-4 text-sm font-semibold text-accent hover:bg-background/75"
                >
                  Email {site.agent.contact.email}
                  <ArrowRight className="size-4" aria-hidden />
                </EmailAnchor>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section id="approach" className="bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <div className="text-xs font-semibold uppercase text-muted">
                How Tracy helps
              </div>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-accent sm:text-5xl">
                Clear guidance starts with a calm first call.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-foreground/70">
                The goal is not more insurance language. It is a clearer
                decision: what changed, what needs protection, and what should
                happen next.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {advisorPrinciples.map((card) => {
                const Icon = card.icon;

                return (
                  <div
                    key={card.title}
                    className="border border-accent/10 bg-background p-6 shadow-sm shadow-black/5"
                  >
                    <span className="grid size-11 place-items-center rounded-lg border border-accent/15 bg-surface text-brand">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-base font-semibold text-accent">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-foreground/72">
                      {card.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section
        id="coverage-help"
        className="border-y border-accent/10 bg-background"
      >
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <div className="text-xs font-semibold uppercase text-muted">
                When to call
              </div>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-accent sm:text-5xl">
                Start from the moment, not the product menu.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-foreground/70">
                The question may become a quote, a document request, or a
                policy review. The first step is choosing the path that matches
                what changed.
              </p>
            </div>

            <div className="grid gap-3">
              {callMoments.map((moment, index) => (
                <TrackedAnchor
                  key={moment.label}
                  href={moment.href}
                  eventName="cross_site_click"
                  eventProps={{
                    source: "tracy_call_moment",
                    destination: moment.href,
                    moment: moment.label,
                  }}
                  className="group grid gap-4 border border-accent/10 bg-surface p-5 shadow-sm shadow-black/5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/10 sm:grid-cols-[96px_1fr_auto] sm:items-center"
                >
                  <div className="font-mono text-xs text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase text-muted">
                      {moment.label}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold leading-snug text-accent">
                      {moment.title}
                    </h3>
                  </div>
                  <ArrowRight
                    className="size-5 text-accent/45 transition group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden
                  />
                </TrackedAnchor>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-accent text-accent-foreground">
        <Container className="py-14 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-xs font-semibold uppercase text-accent-foreground/65">
                Ready to talk
              </div>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                Bring the question. Tracy can help turn it into a coverage next
                step.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-accent-foreground/74">
                Call directly for a conversation, or start the online help
                request when the next step is a quote, document, or review.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink
                href={quoteHref}
                variant="secondary"
                size="md"
                className="border-accent-foreground/20 bg-accent-foreground text-accent hover:bg-accent-foreground/90"
                eventName="cross_site_click"
                eventProps={{
                  source: "tracy_midpage_quote",
                  destination: quoteHref,
                }}
              >
                Get insurance help
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ScheduleButton
                source="tracy_midpage"
                variant="secondary"
                size="md"
                className="border-accent-foreground/25 bg-transparent text-accent-foreground hover:bg-accent-foreground/8"
                icon
              />
              <TrackedAnchor
                href={`tel:${site.agent.phone.e164}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-accent-foreground/25 px-5 text-sm font-semibold text-accent-foreground hover:bg-accent-foreground/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-foreground"
                eventName="phone_click"
                eventProps={{
                  source: "tracy_midpage_phone",
                  phone: site.agent.phone.display,
                }}
              >
                <Phone className="size-4" aria-hidden />
                Call Tracy
              </TrackedAnchor>
              <EmailButton
                source="tracy_midpage"
                variant="ghost"
                size="md"
                className="text-accent-foreground hover:bg-accent-foreground/8"
                icon
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-accent/10 bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <div className="text-xs font-semibold uppercase text-muted">
                Latest guidance
              </div>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-accent sm:text-5xl">
                Clear thinking for hard California insurance decisions.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-foreground/70">
                When a renewal, nonrenewal, lender deadline, or wildfire-area
                question gets stressful, start with the issue in front of you
                and compare the real options.
              </p>
            </div>

            <TrackedAnchor
              href={latestGuidance.href}
              eventName="cross_site_click"
              eventProps={{
                source: "tracy_latest_guidance",
                destination: latestGuidance.href,
              }}
              className="group border border-accent/10 bg-background p-7 shadow-sm shadow-black/5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/10"
            >
              <div className="text-xs font-semibold uppercase text-muted">
                CA FAIR Plan
              </div>
              <h3 className="mt-3 text-2xl font-semibold leading-tight text-accent">
                {latestGuidance.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-foreground/70">
                {latestGuidance.description}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Read the post
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden />
              </div>
            </TrackedAnchor>
          </div>
        </Container>
      </section>

      <section id="offices" className="bg-background">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <div className="text-xs font-semibold uppercase text-muted">
                Offices and proof
              </div>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-accent sm:text-5xl">
                Two local offices. California guidance.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-foreground/70">
                Existing clients and new visitors can call, get directions, or
                route the next insurance step through the office that fits them
                best.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {proofStats.map((signal) => (
                <div
                  key={signal.label}
                  className="border border-accent/10 bg-surface p-5 shadow-sm shadow-black/5"
                >
                  <div className="font-serif text-4xl font-semibold leading-none text-accent">
                    {signal.value}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-foreground/70">
                    {signal.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {site.offices.map((office) => (
              <div
                key={office.id}
                className="border border-accent/10 bg-surface p-7 shadow-sm shadow-black/5"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-xs font-semibold uppercase text-muted">
                      {office.label}
                    </div>
                    <div className="mt-3 text-xl font-semibold text-accent">
                      {office.address.street}
                    </div>
                    <div className="mt-1 text-sm text-foreground/70">
                      {office.address.city}, {office.address.region}{" "}
                      {office.address.postalCode}
                    </div>
                  </div>
                  <MapPin className="size-5 text-brand" aria-hidden />
                </div>

                <div className="mt-6 flex flex-wrap gap-3 text-sm">
                  <TrackedAnchor
                    href={`tel:${office.phone.e164}`}
                    className="rounded-full border border-accent/15 bg-background px-4 py-2 font-medium text-accent"
                    eventName="phone_click"
                    eventProps={{
                      source: "tracy_office_card",
                      office: office.id,
                      phone: office.phone.display,
                    }}
                  >
                    {office.phone.display}
                  </TrackedAnchor>
                  <TrackedAnchor
                    href={office.links.mapCid}
                    className="rounded-full border border-accent/15 bg-background px-4 py-2 font-medium text-accent"
                    eventName="directions_click"
                    eventProps={{
                      source: "tracy_office_card",
                      office: office.id,
                    }}
                  >
                    Directions
                  </TrackedAnchor>
                  <ScheduleButton
                    source="tracy_office_card"
                    eventProps={{ office: office.id }}
                    variant="outline"
                    size="sm"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 border border-accent/10 bg-surface p-5 shadow-sm shadow-black/5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 size-5 shrink-0 text-brand" aria-hidden />
                <p className="max-w-2xl text-sm leading-6 text-foreground/70">
                  Not sure which office or coverage path fits? Start with the
                  direct line and the team will route the next step.
                </p>
              </div>
              <ButtonLink
                href={quoteHref}
                variant="outline"
                size="sm"
                eventName="cross_site_click"
                eventProps={{
                  source: "tracy_footer_note_quote",
                  destination: quoteHref,
                }}
              >
                Start help
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
