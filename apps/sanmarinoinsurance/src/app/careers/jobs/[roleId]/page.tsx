import Link from "next/link";
import type { Metadata } from "next";
import { ChevronLeft, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { CareersApplicationForm } from "@/components/careers-application-form";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { careerRoles } from "@/lib/careers";

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
        <div className="mx-auto max-w-[920px]">
          <Link
            href="/careers/jobs"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
          >
            <ChevronLeft className="size-4" aria-hidden />
            Back to jobs
          </Link>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-surface/70 px-4 py-2 text-xs font-medium text-accent shadow-sm shadow-black/5">
                <span className="size-1.5 rounded-full bg-brand" aria-hidden />
                Open role
              </div>

              <h1 className="mt-6 text-balance font-serif text-[clamp(2.5rem,5.2vw,4.1rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
                {role.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-background px-3 py-1 text-xs font-medium text-accent shadow-sm shadow-black/5">
                  <MapPin className="size-4" aria-hidden />
                  {role.locations.join(" | ")}
                </span>
                <span className="inline-flex items-center rounded-full border border-accent/15 bg-background px-3 py-1 text-xs font-medium text-accent shadow-sm shadow-black/5">
                  {role.team}
                </span>
                <span className="inline-flex items-center rounded-full border border-accent/15 bg-background px-3 py-1 text-xs font-medium text-accent shadow-sm shadow-black/5">
                  {role.type}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:items-end">
              <ButtonLink href="#apply" variant="primary" size="md" className="min-w-[180px] justify-center">
                Apply
              </ButtonLink>
            </div>
          </div>

          <div className="mt-12 space-y-10">
            <section className="rounded-3xl border border-accent/15 bg-surface/70 p-6 shadow-sm shadow-black/5 sm:p-7">
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

            <section className="rounded-3xl border border-accent/15 bg-surface/70 p-6 shadow-sm shadow-black/5 sm:p-7">
              <h2 className="font-serif text-2xl tracking-[-0.03em] text-foreground">About the role</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-foreground/75">
                {role.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-accent/15 bg-surface/70 p-6 shadow-sm shadow-black/5 sm:p-7">
              <h2 className="font-serif text-2xl tracking-[-0.03em] text-foreground">Responsibilities</h2>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-foreground/75">
                {role.focus.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border border-accent/15 bg-surface/70 p-6 shadow-sm shadow-black/5 sm:p-7">
              <h2 className="font-serif text-2xl tracking-[-0.03em] text-foreground">
                You may be a good fit if you:
              </h2>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-foreground/75">
                {role.goodFor.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>{item}</span>
                  </li>
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
        </div>
      </Container>
    </main>
  );
}
