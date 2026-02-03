import Link from "next/link";
import type { Metadata } from "next";
import { ChevronLeft, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { CareersApplicationForm } from "@/components/careers-application-form";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { careerRoles } from "@/lib/careers";
import { getFullAddressLine, site } from "@/lib/site";

type Params = { roleId: string };

function getRole(roleId: string) {
  return careerRoles.find((role) => role.id === roleId) || null;
}

async function resolveParams(input: Params | Promise<Params>) {
  return await Promise.resolve(input);
}

export async function generateMetadata({
  params,
}: {
  params: Params | Promise<Params>;
}): Promise<Metadata> {
  const resolved = await resolveParams(params);
  const role = getRole(resolved.roleId);
  if (!role) return { title: "Job" };

  return {
    title: role.title,
    description: role.intro,
  };
}

export default async function CareersJobPage({ params }: { params: Params | Promise<Params> }) {
  const resolved = await resolveParams(params);
  const role = getRole(resolved.roleId);
  if (!role) notFound();

  return (
    <main id="main" className="bg-background">
      <Container className="py-16 sm:py-20">
        <Link
          href="/careers/jobs"
          className="inline-flex items-center gap-2 text-sm text-foreground/75 underline underline-offset-4 hover:text-foreground"
        >
          <ChevronLeft className="size-4" aria-hidden />
          Back to jobs
        </Link>

        <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 border border-foreground/25 bg-surface/50 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/80">
              Open role
            </div>

            <h1 className="mt-6 text-balance font-serif text-[clamp(2.5rem,5.2vw,4.1rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
              {role.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-foreground/75">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4" aria-hidden />
                {role.locations.join(" | ")}
              </span>
              <span className="text-foreground/40">•</span>
              <span>{role.team}</span>
              <span className="text-foreground/40">•</span>
              <span>{role.type}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
            <ButtonLink href="#apply" variant="primary" size="md" className="min-w-[180px] justify-center">
              Apply
            </ButtonLink>
            <ButtonLink href={`tel:${site.agent.phone.e164}`} variant="outline" size="md" className="min-w-[180px] justify-center">
              Call {site.agent.phone.display}
            </ButtonLink>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start">
          <div className="space-y-10">
            <section className="border border-foreground/20 bg-surface/50 p-6 sm:p-7">
              <h2 className="font-serif text-2xl tracking-[-0.03em] text-foreground">About our agency</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-foreground/75">
                <p>
                  Tracy Zhang is an Allstate agency owner based in San Marino. We serve families and business owners
                  across the area with a service-first approach: clear coverage conversations, fast follow‑up, and
                  consistent support over time.
                </p>
                <p>
                  If you’re the kind of person who takes pride in doing the details correctly — and you care about the
                  customer experience — you’ll feel at home here.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl tracking-[-0.03em] text-foreground">About the role</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-foreground/75">
                {role.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl tracking-[-0.03em] text-foreground">Responsibilities</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-foreground/75">
                {role.focus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl tracking-[-0.03em] text-foreground">
                You may be a good fit if you:
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-foreground/75">
                {role.goodFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section id="apply" className="scroll-mt-[var(--header-offset)]">
              <CareersApplicationForm
                roles={[role]}
                lockedRoleId={role.id}
                source={`careers-job:${role.id}`}
              />
            </section>
          </div>

          <aside className="border border-foreground/20 bg-background/30 p-6 sm:p-7 lg:sticky lg:top-[calc(var(--header-offset)+24px)]">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
              Role details
            </div>

            <div className="mt-5 grid gap-4 text-sm text-foreground/75">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">Team</div>
                <div className="mt-1 text-foreground">{role.team}</div>
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">Location</div>
                <div className="mt-1 text-foreground">{role.locations.join(" | ")}</div>
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">Type</div>
                <div className="mt-1 text-foreground">{role.type}</div>
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">Office</div>
                <div className="mt-1 text-foreground">{getFullAddressLine()}</div>
              </div>
            </div>

            <div className="mt-8 grid gap-3">
              <ButtonLink href="#apply" variant="primary" size="md" className="w-full justify-center">
                Apply
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" size="md" className="w-full justify-center">
                Contact the office
              </ButtonLink>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
