import { Briefcase, MapPin, Phone } from "lucide-react";
import { CareersApplicationForm } from "@/components/careers-application-form";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { careerRoles } from "@/lib/careers";
import { getFullAddressLine, site } from "@/lib/site";

export const metadata = {
  title: "Careers",
  description: `Explore careers in ${site.agent.location}.`,
};

export default function CareersPage() {
  return (
    <main id="main" className="bg-background">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 border border-foreground/25 bg-surface/50 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/80">
              Careers • {site.agent.location}
            </div>

            <h1 className="mt-7 text-balance font-serif text-[clamp(2.5rem,5.2vw,4.25rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
              Join the team
            </h1>

            <div className="mt-6 space-y-5 text-pretty text-lg leading-8 text-foreground/75">
              <p>
                We’re a local insurance agency serving San Marino and nearby communities. Our work is simple to
                describe but meaningful in practice: help people protect what they’ve built, understand their options,
                and feel confident when life changes.
              </p>
              <p>
                If you care about service, clarity, and long‑term relationships — and you like building real trust with
                customers — you’ll fit in here.
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" variant="primary" size="md" className="gap-2">
                <Briefcase className="size-4" aria-hidden />
                Ask about openings
              </ButtonLink>
              <ButtonLink href={`tel:${site.agent.phone.e164}`} variant="outline" size="md" className="gap-2">
                <Phone className="size-4" aria-hidden />
                Call {site.agent.phone.display}
              </ButtonLink>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="border border-foreground/20 bg-surface/60 p-5">
                <div className="text-sm font-semibold text-foreground">Where we work</div>
                <div className="mt-2 text-sm text-foreground/75">{getFullAddressLine()}</div>
                <div className="mt-4">
                  <ButtonLink href={site.agent.links.mapCid} variant="outline" size="sm" className="gap-2">
                    <MapPin className="size-4" aria-hidden />
                    Directions
                  </ButtonLink>
                </div>
              </div>
              <div className="border border-foreground/20 bg-surface/60 p-5">
                <div className="text-sm font-semibold text-foreground">What we value</div>
                <ul className="mt-3 space-y-2 text-sm text-foreground/75">
                  <li>Clear, honest coverage conversations</li>
                  <li>Fast follow‑up and reliable service</li>
                  <li>Respect for the customer’s time and budget</li>
                  <li>Consistency — not pressure</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-foreground/20 bg-surface/60 p-6 sm:p-7">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                Open roles
              </div>
              <div className="mt-2 text-sm text-foreground/70">
                We’re always interested in great people. If one of these roles fits, reach out.
              </div>
            </div>

            {careerRoles.map((role) => (
              <section key={role.id} className="border border-foreground/20 bg-background/30 p-6 sm:p-7">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h2 className="text-balance font-serif text-2xl tracking-[-0.03em] text-foreground">
                    {role.title}
                  </h2>
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
                    {role.type}
                  </div>
                </div>

                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  <div>
                    <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
                      What you’ll do
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-foreground/75">
                      {role.focus.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
                      You’ll thrive if
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-foreground/75">
                      {role.goodFor.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            ))}

            <div className="border border-foreground/20 bg-surface/60 p-6 sm:p-7">
              <div className="text-sm font-semibold text-foreground">How to apply</div>
              <div className="mt-3 space-y-3 text-sm leading-7 text-foreground/75">
                <p>
                  Submit the form below or contact the office and tell us which role you’re interested in. We’ll
                  confirm next steps and what licensing (if any) is needed for the position.
                </p>
                <p>
                  Prefer a quick call? Reach us at{" "}
                  <a className="text-foreground underline underline-offset-4" href={`tel:${site.agent.phone.e164}`}>
                    {site.agent.phone.display}
                  </a>
                  .
                </p>
              </div>
              <div className="mt-6">
                <ButtonLink href="/contact" variant="primary" size="sm" className="gap-2">
                  <Briefcase className="size-4" aria-hidden />
                  Contact the office
                </ButtonLink>
              </div>
            </div>

            <CareersApplicationForm roles={[...careerRoles]} />
          </div>
        </div>
      </Container>
    </main>
  );
}
