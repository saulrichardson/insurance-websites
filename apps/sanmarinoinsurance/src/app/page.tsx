import Image from "next/image";
import {
  MapPin,
  Phone,
} from "lucide-react";
import { StarRating } from "@/components/star-rating";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { getFullAddressLine, site } from "@/lib/site";

export default function Home() {
  const coverages = site.offerings.map((o) => o.name);
  const tickerItems = [...coverages, ...coverages];

  return (
    <main id="main" className="bg-background">
      <section className="relative">
        <Container className="py-12 sm:py-16 lg:py-20">
          <h1 className="text-balance font-serif text-[clamp(3rem,6.6vw,6.25rem)] leading-[0.8] tracking-[-0.04em] text-foreground">
            Making coverage{" "}
            <span className="italic">frictionless</span> <MarkDoubleArrow />
            <br />
            Insurance <MarkTriangle /> for the families
            <br />
            and business owners shaping <MarkDiamond /> our
            <br />
            San Marino <MarkPhoto /> community.
          </h1>

          <div className="mt-8 max-w-3xl text-pretty text-lg leading-8 text-foreground/75">
            Based in {site.agent.location}, we help you compare options for auto, home, renters, condo,
            life, and small business coverage—and keep your policies aligned as life changes.
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/contact" variant="primary" size="md">
              Contact
            </ButtonLink>
            <ButtonLink href="/insurance" variant="outline" size="md">
              View products
            </ButtonLink>
            <ButtonLink href={`tel:${site.agent.phone.e164}`} variant="ghost" size="md" className="gap-2">
              <Phone className="size-4" aria-hidden />
              Call {site.agent.phone.display}
            </ButtonLink>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="border border-foreground/20 bg-surface/60 p-4">
              <div className="flex items-center gap-2">
                <StarRating rating={site.agent.rating.score} outOf={site.agent.rating.outOf} />
              </div>
              <div className="mt-2 text-sm text-foreground/70">
                {site.agent.rating.reviewCount} reviews • {site.agent.rating.sourceLabel}
              </div>
            </div>
            <div className="border border-foreground/20 bg-surface/60 p-4">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                Languages
              </div>
              <div className="mt-2 text-sm text-foreground/70">{site.agent.languages.join(", ")}</div>
            </div>
            <div className="border border-foreground/20 bg-surface/60 p-4">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                Office
              </div>
              <div className="mt-2 text-sm text-foreground/70">{getFullAddressLine()}</div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-foreground/20 bg-surface/50">
        <div className="relative overflow-hidden py-4">
          <div
            className="flex w-max animate-[ticker_34s_linear_infinite] items-center gap-6 pr-6 text-sm text-foreground/70"
            aria-label="Coverage ticker"
          >
            {tickerItems.map((item, idx) => (
              <span key={`${item}-${idx}`} className="inline-flex items-center gap-6">
                <span className="text-foreground">{item}</span>
                <span className="text-foreground/35" aria-hidden>
                  •
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Insurance options, explained clearly
              </h2>
              <p className="mt-3 max-w-2xl text-pretty text-muted">
                Whether you’re buying your first policy or reviewing coverage you’ve had
                for years, we’ll help you understand tradeoffs and choose what fits.
              </p>
            </div>
            <ButtonLink href="/insurance" variant="outline" size="md">
              Browse insurance
            </ButtonLink>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {site.offerings.map((o) => (
              <div key={o.id} className="border border-foreground/20 bg-surface/60 p-6">
                <div className="flex items-baseline justify-between gap-6">
                  <div className="text-xl font-semibold text-foreground">{o.name}</div>
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
                    {site.agent.location}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-foreground/75">{o.shortDescription}</p>
                <ul className="mt-5 space-y-2 text-sm text-foreground/75">
                  {o.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="mt-1 size-1.5 shrink-0 bg-foreground" aria-hidden />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="about" className="bg-background">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Meet {site.agent.name}
              </h2>

              <p className="mt-4 text-pretty leading-8 text-muted">
                I’m an Allstate agent based in San Marino, and I’ve had the chance to work with
                many local families and small business owners. My goal is simple: help you feel
                confident in your coverage—without confusing jargon or pressure.
              </p>
              <p className="mt-4 text-pretty leading-8 text-muted">
                If you’re new to insurance, we’ll start from the basics. If you’re already covered,
                we can review your policy for changes like a new car, a move, home updates, or a growing
                business—and adjust so it still fits your life.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" variant="primary" size="md">
                  Talk with the office
                </ButtonLink>
                <ButtonLink
                  href={site.agent.links.allstateProfile}
                  variant="outline"
                  size="md"
                >
                  See profile & reviews
                </ButtonLink>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden border border-foreground/20 bg-surface/60 p-6">
                <Image
                  src={site.agent.images.portrait}
                  alt={`Photo of ${site.agent.name}`}
                  width={700}
                  height={720}
                  className="w-full object-cover"
                />
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="border border-foreground/20 bg-background/40 p-4">
                    <div className="text-sm font-semibold text-foreground">Languages</div>
                    <div className="mt-2 text-sm text-foreground/70">{site.agent.languages.join(", ")}</div>
                  </div>
                  <div className="border border-foreground/20 bg-background/40 p-4">
                    <div className="text-sm font-semibold text-foreground">Reviews</div>
                    <div className="mt-2 text-sm text-foreground/70">
                      Rated {site.agent.rating.score.toFixed(1)} / {site.agent.rating.outOf} from{" "}
                      {site.agent.rating.reviewCount} reviews
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-foreground/65">
                  Review count and rating are shown as listed on the Allstate agent profile.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="office" className="bg-background">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Visit or call the office
              </h2>
              <p className="mt-3 text-pretty text-foreground/75">
                Located at {getFullAddressLine()}. Walk-ins are welcome during office hours—after-hours
                appointments are also available.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="border border-foreground/20 bg-surface/60 p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Phone className="size-4" aria-hidden />
                    Call
                  </div>
                  <div className="mt-2 text-sm text-foreground/75">
                    <a className="hover:text-foreground" href={`tel:${site.agent.phone.e164}`}>
                      {site.agent.phone.display}
                    </a>
                  </div>
                  <div className="mt-2 text-sm text-foreground/75">{site.agent.notes.join(" ")}</div>
                </div>

                <div className="border border-foreground/20 bg-surface/60 p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <MapPin className="size-4" aria-hidden />
                    Directions
                  </div>
                  <div className="mt-2 text-sm text-foreground/75">{getFullAddressLine()}</div>
                  <div className="mt-3">
                    <ButtonLink href={site.agent.links.mapCid} variant="outline" size="sm">
                      Open in Google Maps
                    </ButtonLink>
                  </div>
                </div>

                <div className="border border-foreground/20 bg-surface/60 p-5 sm:col-span-2">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                    Hours
                  </div>
                  <div className="mt-3 grid gap-2 text-sm text-foreground/75 sm:grid-cols-2">
                    {site.agent.hours.map((h) => (
                      <div key={h.day} className="flex items-center justify-between gap-4">
                        <span className="text-foreground">{h.day}</span>
                        {"note" in h ? <span>{h.note}</span> : <span>{h.open} – {h.close}</span>}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-foreground/75">
                      Fax: <span className="text-foreground">{site.agent.fax.display}</span>
                    </div>
                    <ButtonLink href="/contact" variant="primary" size="sm">
                      Contact the office
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden border border-foreground/20 bg-surface/60">
              <div className="aspect-[4/3] w-full">
                <iframe
                  title={`Map to ${site.brand.shortName} in ${site.agent.location}`}
                  src={site.agent.links.mapEmbed}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="border-t border-foreground/20 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-foreground">Office address</div>
                    <div className="mt-1 text-sm text-foreground/75">{getFullAddressLine()}</div>
                  </div>
                  <ButtonLink href={site.agent.links.mapCid} variant="outline" size="sm">
                    Directions
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface/40">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 border border-foreground/20 bg-background/35 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Ready for a quote or coverage review?
              </h2>
              <p className="mt-3 text-pretty text-foreground/75">
                Call during office hours, or reach out anytime. We can help you compare options for new
                coverage or review what you already have.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={`tel:${site.agent.phone.e164}`} variant="primary" size="md" className="gap-2">
                  <Phone className="size-4" aria-hidden />
                  Call {site.agent.phone.display}
                </ButtonLink>
                <ButtonLink href="/contact" variant="outline" size="md">
                  Contact details
                </ButtonLink>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-foreground/20 bg-surface/60 p-5">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                  What we focus on
                </div>
                <div className="mt-3 text-sm text-foreground/75">
                  Clear coverage explanations, responsive service, and long-term policy reviews.
                </div>
              </div>
              <div className="border border-foreground/20 bg-surface/60 p-5">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                  Languages
                </div>
                <div className="mt-3 text-sm text-foreground/75">
                  {site.agent.languages.join(", ")}
                </div>
              </div>
              <div className="border border-foreground/20 bg-surface/60 p-5 sm:col-span-2">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                  Local office
                </div>
                <div className="mt-3 text-sm text-foreground/75">
                  {getFullAddressLine()}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

function MarkDoubleArrow() {
  return (
    <span className="inline-block align-[0.05em]" aria-hidden>
      <svg
        width="46"
        height="26"
        viewBox="0 0 46 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0H14L28 13L14 26H0L14 13L0 0Z" fill="currentColor" />
        <path d="M18 0H32L46 13L32 26H18L32 13L18 0Z" fill="currentColor" />
      </svg>
    </span>
  );
}

function MarkTriangle() {
  return (
    <span className="inline-block align-[0.05em]" aria-hidden>
      <svg
        width="34"
        height="26"
        viewBox="0 0 34 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17 0L34 26H0L17 0Z" fill="currentColor" />
        <rect x="0" y="22" width="34" height="4" fill="currentColor" />
      </svg>
    </span>
  );
}

function MarkDiamond() {
  return (
    <span className="inline-block align-[0.05em]" aria-hidden>
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13 0L26 13L13 26L0 13L13 0Z" fill="currentColor" />
      </svg>
    </span>
  );
}

function MarkPhoto() {
  return (
    <span className="inline-block align-[0.08em] px-2" aria-hidden>
      <span className="inline-block overflow-hidden border border-foreground/25 bg-surface">
        <Image
          src={site.agent.images.portrait}
          alt=""
          width={140}
          height={44}
          className="h-8 w-28 object-cover"
        />
      </span>
    </span>
  );
}
