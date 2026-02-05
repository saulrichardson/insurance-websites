import { Briefcase, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { careerRoles } from "@/lib/careers";
import { getFullAddressLine, getOffice, site } from "@/lib/site";

export const metadata = {
  title: "Careers",
  description: `Explore careers in ${site.agent.location}.`,
};

export default function CareersPage() {
  const sanMarino = getOffice("san-marino");
  const laPalma = getOffice("la-palma");

  return (
    <main id="main" className="bg-background">
      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-[920px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-surface/70 px-4 py-2 text-xs font-medium text-accent shadow-sm shadow-black/5">
            <span className="size-1.5 rounded-full bg-brand" aria-hidden />
            Careers • {site.agent.location}
          </div>

          <h1 className="mt-7 text-balance font-serif text-[clamp(2.5rem,5.2vw,4.25rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
            Join the team
          </h1>

          <section className="mt-7 rounded-3xl border border-accent/15 bg-surface p-6 shadow-sm shadow-black/5 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/70">
                  Open roles
                </div>
                <div className="mt-2 text-lg font-semibold tracking-tight text-accent">
                  {careerRoles.length} open {careerRoles.length === 1 ? "role" : "roles"}
                </div>
                <div className="mt-2 text-sm text-foreground/75">
                  Explore roles at our San Marino office. We care about clarity, follow‑through, and calm service.
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <ButtonLink href="/careers/jobs" variant="primary" size="md" className="gap-2">
                  <Briefcase className="size-4" aria-hidden />
                  View open roles
                </ButtonLink>
                <ButtonLink href="/about" variant="outline" size="md">
                  About the agency
                </ButtonLink>
              </div>
            </div>
          </section>

          <div className="mt-6 space-y-5 text-pretty text-lg leading-8 text-foreground/75">
            <p>
              We’re a service-first insurance agency with offices in San Marino and La Palma. Our work is simple to
              explain but meaningful in practice: help people protect what they’ve built, understand their options,
              and feel supported when life changes.
            </p>
            <p>
              That means we care about the details — the right limits, the right deductibles, clear follow‑ups, and a
              customer experience that feels calm and organized.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-accent/15 bg-surface p-6 shadow-sm shadow-black/5 sm:p-7">
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">Where we work</div>
              <div className="mt-4 space-y-4 text-sm leading-7 text-foreground/75">
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
                    {sanMarino.location}
                  </div>
                  <div className="mt-2">{getFullAddressLine("san-marino")}</div>
                </div>
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
                    {laPalma.location}
                  </div>
                  <div className="mt-2">{getFullAddressLine("la-palma")}</div>
                </div>
              </div>
              <div className="mt-6">
                <ButtonLink href="/locations" variant="outline" size="sm" className="gap-2">
                  <MapPin className="size-4" aria-hidden />
                  View locations
                </ButtonLink>
              </div>
            </div>

            <div className="rounded-3xl border border-accent/15 bg-surface p-6 shadow-sm shadow-black/5 sm:p-7">
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">What we value</div>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-foreground/75">
                <li className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>Clear, honest coverage conversations</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>Fast follow‑up and reliable service</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>Respect for the customer’s time and budget</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>Consistency — not pressure</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 space-y-10">
            <section className="rounded-3xl border border-accent/15 bg-surface/70 p-6 shadow-sm shadow-black/5 sm:p-7">
              <h2 className="font-serif text-2xl tracking-[-0.03em] text-foreground">What we do</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-foreground/75">
                <p>
                  We help families and business owners make decisions across auto, home, renters, condo, life, and
                  financial products — and we stay involved after the sale with policy changes, reviews, and claims
                  guidance.
                </p>
                <p>
                  Our goal is to build long-term relationships in the community. The best outcomes come from doing the
                  basics well, every time: clear documentation, accurate information, and dependable follow‑up.
                </p>
              </div>
            </section>

            <section className="rounded-3xl border border-accent/15 bg-surface/70 p-6 shadow-sm shadow-black/5 sm:p-7">
              <h2 className="font-serif text-2xl tracking-[-0.03em] text-foreground">How we work</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-foreground/75">
                <p>
                  We keep things structured: we ask good questions, set expectations upfront, and communicate in plain
                  language. Customers should always know what’s happening next.
                </p>
                <p>
                  Internally, we value teamwork and ownership. If something needs attention, we don’t let it linger —
                  we handle it or we hand it off clearly.
                </p>
              </div>
            </section>

            <section className="rounded-3xl border border-accent/15 bg-surface/70 p-6 shadow-sm shadow-black/5 sm:p-7">
              <h2 className="font-serif text-2xl tracking-[-0.03em] text-foreground">Who thrives here</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-foreground/75">
                <p>
                  You’ll do well here if you’re detail-oriented, calm under pressure, and you enjoy helping people make
                  decisions without pushing them. Insurance is a relationship business — the follow‑up matters.
                </p>
                <p>
                  Some roles require licensing. If you’re early in your career and motivated to learn, we’re still
                  happy to talk and point you toward the best next step.
                </p>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}
