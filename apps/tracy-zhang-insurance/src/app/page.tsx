import { TracysHome } from "@/components/TracysHome";
import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  CarFront,
  ClipboardCheck,
  FileText,
  Home as HomeIcon,
  MapPin,
  Phone,
  ShieldCheck,
  Store,
} from "lucide-react";
import {
  getOfficeById,
  products,
  type MarketProfile,
  type Product,
  type ProductId,
} from "@insurance-websites/domain";

import { Container } from "@/components/Container";
import { EmailAnchor, EmailButton, ScheduleAnchor, TextButton } from "@/components/ContactActions";
import { TrackedAnchor, TrackedLink } from "@/components/marketing-events";
import { buttonClasses } from "@/components/ui/button";
import { site } from "@/config/site";
import { stories, type Story } from "@/content/stories";
import { cn } from "@/lib/cn";
import { getMarketUrl, getRequestMarket } from "@/lib/market";
import { localizedAlternates } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const market = await getRequestMarket();
  const url = getMarketUrl(market.id);
  const title = market.localSeo.title;
  const description = market.localSeo.description;

  return {
    title,
    description,
    ...(market.domainRole === "canonical" ? { icons: { icon: "/homepage-assets/mark.svg", shortcut: "/homepage-assets/mark.svg" } } : {}),
    alternates: localizedAlternates("/", url),
    openGraph: {
      type: "website",
      locale: site.locale,
      url,
      title,
      description,
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const localMoments: Partial<
  Record<
    MarketProfile["id"],
    Array<{
      title: string;
      body: string;
      icon: typeof HomeIcon;
    }>
  >
> = {
  "san-marino": [
    {
      title: "Established homes",
      body: "Home, umbrella, auto, and life coverage reviewed around real household exposure.",
      icon: HomeIcon,
    },
    {
      title: "Property pressure",
      body: "Renewal changes, lender requirements, FAIR Plan questions, and condo gaps handled without drama.",
      icon: Building2,
    },
    {
      title: "Business errands",
      body: "Certificates, contract requirements, commercial auto, and liability questions routed quickly.",
      icon: ClipboardCheck,
    },
  ],
  "la-palma": [
    {
      title: "Family households",
      body: "Auto, home, renters, life, and umbrella decisions for La Palma families and nearby households.",
      icon: HomeIcon,
    },
    {
      title: "New milestones",
      body: "New drivers, first homes, moves, renewals, and life-planning decisions turned into next steps.",
      icon: CarFront,
    },
    {
      title: "Small business needs",
      body: "Certificates, contracts, property, business auto, and liability questions from the nearby office.",
      icon: Store,
    },
  ],
  cerritos: [
    {
      title: "Cerritos households",
      body: "Auto, home, renters, condo, and umbrella reviews for families using the nearby La Palma office.",
      icon: HomeIcon,
    },
    {
      title: "Business certificates",
      body: "Commercial liability, auto, vendor forms, and contract requests handled with practical routing.",
      icon: ClipboardCheck,
    },
    {
      title: "Coverage reviews",
      body: "Renewal changes, new property, young drivers, and higher liability exposure checked together.",
      icon: ShieldCheck,
    },
  ],
};

export default async function Home() {
  const market = await getRequestMarket();
  const office = getOfficeById(market.primaryOfficeId);
  const featuredStories = getFeaturedStories(market);

  if (market.domainRole === "local") {
    return (
      <LocalMarketHome
        market={market}
        office={office}
        featuredStories={featuredStories}
      />
    );
  }

  return <TracysHome />;
}

function LocalMarketHome({
  market,
  office,
  featuredStories,
}: {
  market: MarketProfile;
  office: ReturnType<typeof getOfficeById>;
  featuredStories: Story[];
}) {
  const moments = localMoments[market.id] ?? localMoments["la-palma"] ?? [];

  return (
    <div className="bg-[#f4f6f0] text-[var(--ink)]">
      <section className="overflow-hidden border-b border-[#284036]/15 bg-[#f4f6f0]">
        <Container className="py-12 sm:py-16 lg:py-18">
          <div className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-[#284036]/15 bg-white px-4 py-2 text-xs font-semibold uppercase text-[#52645b] shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
                <span className="size-2 rounded-full bg-[var(--brand)]" />
                {market.label} local office
              </div>

              <h1 className="mt-8 max-w-3xl text-balance font-[var(--font-serif)] text-4xl leading-[0.98] text-[#173f3b] sm:text-5xl lg:text-[4.1rem] xl:text-[4.35rem]">
                {market.heroTitle}
              </h1>

              <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-[#52645b] sm:text-xl">
                {market.heroSubtitle}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {market.proofPoints.map((item) => (
                  <div
                    key={item}
                    className="border-l-2 border-[var(--brand)] bg-white px-4 py-3 text-sm text-[#52645b] shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <TrackedAnchor
                  className={buttonClasses({
                    variant: "secondary",
                    size: "lg",
                    className: "rounded-lg bg-white text-[#173f3b]",
                  })}
                  href={`tel:${office.phoneE164}`}
                  eventName="phone_click"
                  eventProps={{ source: `${market.id}_local_hero`, phone: office.phoneDisplay }}
                >
                  <Phone className="size-4" aria-hidden />
                  Call {office.phoneDisplay}
                </TrackedAnchor>
                <TextButton phone={office.smsE164} source={`${market.id}_local_hero`} eventProps={{ office: office.id }} size="lg" />
                <EmailButton source={`${market.id}_local_hero`} eventProps={{ office: office.id }} size="lg" />
              </div>
            </div>

            <div className="grid gap-4">
              <LocalLandmarkPanel market={market} />
              <LocalOfficeBoard market={market} office={office} />
            </div>
          </div>
        </Container>
      </section>

      <LatestCoverageNote market={market} story={stories[0]} local />

      <section id="coverage" className="bg-white">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <div className="text-xs font-semibold uppercase text-[var(--brand-ink)]">
                Local coverage paths
              </div>
              <h2 className="mt-4 font-[var(--font-serif)] text-4xl leading-tight text-[#173f3b] sm:text-5xl">
                Start with the reason you are calling.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#52645b]">
                Home purchase, renewal change, new driver, lender request,
                lease, certificate, or business deadline: the local office helps
                sort the path before the quote conversation gets noisy.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {moments.map((moment) => {
                const Icon = moment.icon;
                return (
                  <div
                    key={moment.title}
                    className="min-h-[230px] border border-[#284036]/15 bg-[#f4f6f0] p-5 shadow-[0_10px_30px_rgba(23,63,59,0.08)]"
                  >
                    <span className="grid size-11 place-items-center border border-[#284036]/15 bg-white text-[var(--brand)]">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-6 text-xl font-semibold text-[#173f3b]">
                      {moment.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#52645b]">
                      {moment.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-12 grid gap-4">
            {market.merchandising.map((group, index) => (
              <LocalMerchandisingGroup
                key={group.title}
                group={group}
                index={index}
                market={market}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-[#284036]/15 bg-[#173f3b] text-white">
        <Container className="py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <div className="text-xs font-semibold uppercase text-white/60">
                Local reach
              </div>
              <h2 className="mt-4 font-[var(--font-serif)] text-4xl leading-tight sm:text-5xl">
                One nearby office for the first call, with California coverage
                options behind it.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {market.serviceArea.map((area) => (
                <span
                  key={area}
                  className="border border-white/18 bg-white/7 px-3 py-2 text-sm text-white/78"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <GuidanceSection market={market} stories={featuredStories} local />
      <ContactSection market={market} office={office} tone="local" />
    </div>
  );
}

function LatestCoverageNote({
  market,
  story,
  local = false,
}: {
  market: MarketProfile;
  story?: Story;
  local?: boolean;
}) {
  if (!story) return null;

  const dateLabel = formatStoryDate(story.dateISO);
  const source = `${market.id}_home_latest_note`;

  return (
    <section className={local ? "bg-[#f4f6f0]" : "bg-[var(--surface)]"}>
      <Container className="relative z-10 -mt-7 pb-10 sm:-mt-8 sm:pb-12">
        <TrackedLink
          href={`/stories/${story.slug}`}
          eventName="guidance_click"
          eventProps={{
            source,
            story: story.slug,
          }}
          className={cn(
            "group block overflow-hidden border bg-white shadow-[0_24px_70px_rgba(15,23,42,0.10)] outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--ink)]/20 focus-visible:ring-offset-2",
            local
              ? "border-[#284036]/15 focus-visible:ring-offset-[#f4f6f0]"
              : "border-[var(--rail-border)] focus-visible:ring-offset-[var(--surface)]",
          )}
        >
          <div className="grid lg:grid-cols-[150px_1fr_260px_148px]">
            <div
              className={cn(
                "flex flex-row items-center justify-between gap-4 border-b p-4 lg:flex-col lg:items-start lg:border-b-0 lg:border-r lg:p-5",
                local ? "border-[#284036]/12 bg-[#f9faf5]" : "border-[var(--rail-border)] bg-[#fffdf8]",
              )}
            >
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--brand-ink)]">
                  Latest note
                </div>
                <div className="mt-2 font-[var(--font-mono)] text-xs text-[var(--muted)]">
                  {dateLabel}
                </div>
              </div>
              <FileText className="size-5 text-[var(--brand)]" aria-hidden />
            </div>

            <div className="p-5 sm:p-6">
              <div className="max-w-2xl">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                  From the coverage desk
                </div>
                <h2 className="mt-3 text-2xl font-semibold leading-tight text-[var(--ink)] sm:text-3xl">
                  {story.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--muted)]">
                  {story.description}
                </p>
              </div>
            </div>

            {story.image ? (
              <div className="relative min-h-[180px] border-y border-[var(--rail-border)] bg-[#eef2ec] lg:border-y-0 lg:border-l">
                <Image
                  src={story.image.src}
                  alt={story.image.alt}
                  fill
                  sizes="(min-width: 1024px) 260px, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02),rgba(8,38,40,0.08))]" />
              </div>
            ) : null}

            <div
              className={cn(
                "flex items-center justify-between gap-4 p-5 text-sm font-semibold text-[var(--ink)] lg:flex-col lg:items-start lg:justify-end lg:border-l",
                local ? "border-[#284036]/12" : "border-[var(--rail-border)]",
              )}
            >
              <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--brand-ink)]">
                Open note
              </span>
              <ArrowRight
                className="size-5 transition group-hover:translate-x-1"
                aria-hidden
              />
            </div>
          </div>
        </TrackedLink>
      </Container>
    </section>
  );
}

function LocalLandmarkPanel({ market }: { market: MarketProfile }) {
  if (!market.localImage) return null;

  return (
    <figure className="group relative min-h-[300px] overflow-hidden border border-[#284036]/15 bg-[#173f3b] shadow-[0_24px_70px_rgba(23,63,59,0.16)]">
      <Image
        src={market.localImage.src}
        alt={market.localImage.alt}
        fill
        sizes="(min-width: 1024px) 48vw, 100vw"
        className="object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
        style={{ objectPosition: market.localImage.objectPosition ?? "center" }}
        priority={market.id === "san-marino" || market.id === "la-palma"}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,35,34,0.04)_0%,rgba(10,35,34,0.28)_58%,rgba(10,35,34,0.72)_100%)]" />
      <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
        <div className="max-w-xl font-[var(--font-serif)] text-3xl leading-none sm:text-4xl">
          {market.localImage.caption}
        </div>
      </figcaption>
    </figure>
  );
}

function LocalOfficeBoard({
  market,
  office,
}: {
  market: MarketProfile;
  office: ReturnType<typeof getOfficeById>;
}) {
  return (
    <div className="grid gap-4">
      <div className="border border-[#284036]/15 bg-white p-5 shadow-[0_24px_70px_rgba(23,63,59,0.16)] sm:p-6">
        <div className="flex items-start justify-between gap-5">
          <div>
            <div className="text-xs font-semibold uppercase text-[#52645b]">
              Local office
            </div>
            <h2 className="mt-3 font-[var(--font-serif)] text-4xl leading-tight text-[#173f3b]">
              {office.label}
            </h2>
            <div className="mt-4 text-sm leading-6 text-[#52645b]">
              <div>{office.address.streetAddress}</div>
              <div>
                {office.address.addressLocality}, {office.address.addressRegion}{" "}
                {office.address.postalCode}
              </div>
            </div>
          </div>
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#e7efe7] text-[#173f3b]">
            <MapPin className="size-5" aria-hidden />
          </span>
        </div>

        <div className="mt-7 grid gap-3 border-y border-[#284036]/12 py-5 sm:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase text-[#52645b]">
              Hours
            </div>
            <div className="mt-2 text-sm leading-6 text-[#173f3b]">
              <div>{office.hours.mondayFriday}</div>
              <div>{office.hours.saturday}</div>
              <div>{office.hours.sunday}</div>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase text-[#52645b]">
              Languages
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {office.languages.slice(0, 5).map((language) => (
                <span
                  key={language}
                  className="rounded-full border border-[#284036]/15 bg-[#f4f6f0] px-3 py-1 text-xs text-[#52645b]"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <TrackedAnchor
            href={office.links.googleMaps}
            eventName="directions_click"
            eventProps={{ source: `${market.id}_office_board`, office: office.slug }}
            className="inline-flex h-11 items-center justify-center gap-2 border border-[#284036]/20 px-5 text-sm font-semibold text-[#173f3b] hover:bg-[#f4f6f0]"
          >
            Directions
            <ArrowRight className="size-4" aria-hidden />
          </TrackedAnchor>
          <TrackedAnchor
            href={office.links.appointment}
            eventName="appointment_click"
            eventProps={{ source: `${market.id}_office_board`, office: office.slug }}
            className="inline-flex h-11 items-center justify-center gap-2 bg-[var(--brand)] px-5 text-sm font-semibold text-white hover:bg-[var(--brand-strong)]"
          >
            Appointment
            <ClipboardCheck className="size-4" aria-hidden />
          </TrackedAnchor>
        </div>
      </div>

      <div className="grid grid-cols-3 border border-[#284036]/15 bg-[#173f3b] text-white">
        {market.merchandising.slice(0, 3).map((group, index) => (
          <TrackedLink
            key={group.title}
            href={group.href}
            eventName="product_click"
            eventProps={{
              source: `${market.id}_local_quick_lens`,
              group: group.title,
              destination: group.href,
            }}
            className="min-h-[126px] border-r border-white/12 p-4 last:border-r-0 hover:bg-white/8"
          >
            <div className="font-[var(--font-mono)] text-[11px] text-[var(--gold)]">
              0{index + 1}
            </div>
            <div className="mt-6 text-sm font-semibold leading-tight text-white">
              {group.title}
            </div>
          </TrackedLink>
        ))}
      </div>
    </div>
  );
}

function LocalMerchandisingGroup({
  group,
  index,
  market,
}: {
  group: MarketProfile["merchandising"][number];
  index: number;
  market: MarketProfile;
}) {
  const groupProducts = getProducts(group.productIds);

  return (
    <div className="grid gap-5 border border-[#284036]/15 bg-[#f4f6f0] p-5 shadow-[0_10px_30px_rgba(23,63,59,0.07)] md:grid-cols-[0.34fr_0.66fr]">
      <div>
        <div className="font-[var(--font-mono)] text-xs text-[var(--brand)]">
          {String(index + 1).padStart(2, "0")}
        </div>
        <h3 className="mt-3 text-2xl font-semibold text-[#173f3b]">
          {group.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-[#52645b]">{group.intro}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {groupProducts.map((product) => (
          <TrackedLink
            key={product.id}
            href={product.href}
            eventName="product_click"
            eventProps={{
              source: `${market.id}_local_merchandising_product`,
              product: product.title,
              destination: product.href,
            }}
            className="group border border-[#284036]/12 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(23,63,59,0.12)]"
          >
            <div className="text-sm font-semibold text-[#173f3b]">
              {product.shortTitle}
            </div>
            <p className="mt-2 text-xs leading-5 text-[#52645b]">
              {product.description}
            </p>
            <div className="mt-4 text-xs font-semibold text-[var(--brand-ink)]">
              Open page{" "}
              <span className="inline-block transition group-hover:translate-x-0.5">
                -&gt;
              </span>
            </div>
          </TrackedLink>
        ))}
      </div>
    </div>
  );
}

function GuidanceSection({
  market,
  stories: featuredStories,
  local = false,
}: {
  market: MarketProfile;
  stories: Story[];
  local?: boolean;
}) {
  return (
    <section id="guidance" className={local ? "bg-[#f4f6f0]" : "bg-[var(--background)]"}>
      <Container className="py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <div className="text-xs font-semibold uppercase text-[var(--brand-ink)]">
              Practical guidance
            </div>
            <h2 className="mt-4 font-[var(--font-serif)] text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
              Short notes for the questions people actually call about.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted)]">
              These guides explain common decisions before a visitor reaches the
              office conversation.
            </p>
          </div>
          <div className="flex lg:justify-end">
            <TrackedLink
              href="/stories"
              className="group inline-flex items-center gap-3 border-b border-[var(--ink)]/35 pb-1 text-sm font-semibold text-[var(--ink)] hover:border-[var(--ink)]"
              eventName="guidance_click"
              eventProps={{ source: `${market.id}_home_guidance_all` }}
            >
              Guidance archive
              <ArrowRight
                className="size-4 transition group-hover:translate-x-0.5"
                aria-hidden
              />
            </TrackedLink>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {featuredStories.map((story, index) => (
            <TrackedLink
              key={story.slug}
              href={`/stories/${story.slug}`}
              eventName="guidance_click"
              eventProps={{
                source: `${market.id}_home_guidance_card`,
                story: story.slug,
              }}
              className="group border border-[var(--rail-border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
            >
              <div className="font-[var(--font-mono)] text-xs text-[var(--brand)]">
                {String(index + 1).padStart(2, "0")}
              </div>
              <FileText className="mt-8 size-5 text-[var(--brand)]" aria-hidden />
              <h3 className="mt-4 text-xl font-semibold leading-tight text-[var(--ink)]">
                {story.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                {story.description}
              </p>
              <div className="mt-8 text-sm font-semibold text-[var(--ink)]">
                Read note{" "}
                <span className="inline-block transition group-hover:translate-x-0.5">
                  -&gt;
                </span>
              </div>
            </TrackedLink>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ContactSection({
  market,
  office,
  tone,
}: {
  market: MarketProfile;
  office: ReturnType<typeof getOfficeById>;
  tone: "statewide" | "local";
}) {
  return (
    <section className={tone === "local" ? "bg-[#173f3b] text-white" : "bg-[var(--ink)] text-white"}>
      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <div className="text-xs font-semibold uppercase text-white/60">
              Direct office contact
            </div>
            <h2 className="mt-4 font-[var(--font-serif)] text-4xl leading-tight sm:text-5xl">
              Call, text, email, or schedule when the timing matters.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/70">
              New driver, new home, business contract, renewal, life change, or
              a property that has become harder to insure: the office can route
              the next step directly.
            </p>
            <div className="mt-7 flex flex-col gap-3 text-sm sm:flex-row">
              <TrackedAnchor
                href={`tel:${office.phoneE164}`}
                className="inline-flex h-11 items-center justify-center border border-white/25 px-5 font-medium text-white hover:bg-white/10"
                eventName="phone_click"
                eventProps={{
                  source: `${market.id}_contact_section`,
                  phone: office.phoneDisplay,
                }}
              >
                Call {office.phoneDisplay}
              </TrackedAnchor>
              <TrackedAnchor
                href={`sms:${office.smsE164}`}
                className="inline-flex h-11 items-center justify-center border border-white/25 px-5 font-medium text-white hover:bg-white/10"
                eventName="sms_click"
                eventProps={{
                  source: `${market.id}_contact_section`,
                  phone: office.phoneDisplay,
                }}
              >
                Text the office
              </TrackedAnchor>
            </div>
          </div>

          <div className="bg-[var(--surface)] p-5 text-[var(--ink)] shadow-[var(--shadow-lg)] sm:p-7">
            <div className="mb-6">
              <div className="text-xs font-semibold uppercase text-[var(--brand-ink)]">
                Contact paths
              </div>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Use a direct channel so the office can confirm context before
                moving forward.
              </p>
            </div>
            <div className="grid gap-3">
              <TrackedAnchor
                href={`tel:${office.phoneE164}`}
                className={buttonClasses({ variant: "primary", size: "md" })}
                eventName="phone_click"
                eventProps={{
                  source: `${market.id}_contact_section`,
                  phone: office.phoneDisplay,
                }}
              >
                Call {office.phoneDisplay}
              </TrackedAnchor>
              {office.smsE164 ? (
                <TrackedAnchor
                  href={`sms:${office.smsE164}`}
                  className={buttonClasses({ variant: "secondary", size: "md" })}
                  eventName="sms_click"
                  eventProps={{
                    source: `${market.id}_contact_section`,
                    phone: office.phoneDisplay,
                  }}
                >
                  Text the office
                </TrackedAnchor>
              ) : null}
              <EmailAnchor
                source={`${market.id}_contact_section`}
                eventProps={{ office: office.slug }}
                className={buttonClasses({ variant: "outline", size: "md" })}
              >
                Email {site.contact.email}
              </EmailAnchor>
              <ScheduleAnchor
                source={`${market.id}_contact_section`}
                eventProps={{ office: office.slug }}
                className={buttonClasses({ variant: "outline", size: "md" })}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function getFeaturedStories(market: MarketProfile) {
  const latest = stories[0];
  const preferred = market.featuredGuideSlugs
    .map((slug) => stories.find((story) => story.slug === slug))
    .filter(isStory);
  const ordered = latest
    ? [latest, ...preferred.filter((story) => story.slug !== latest.slug)]
    : preferred;

  return (ordered.length > 0 ? ordered : stories).slice(0, 3);
}

function isStory(story: Story | undefined): story is Story {
  return Boolean(story);
}

function formatStoryDate(dateISO: string) {
  const [year, month, day] = dateISO.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat(site.locale, {
    month: "short",
    day: "2-digit",
  }).format(date);
}

function getProducts(productIds: ProductId[]): Product[] {
  return productIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));
}
