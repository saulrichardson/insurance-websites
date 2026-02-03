import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { careerRoles } from "@/lib/careers";
import { CareersJobsFilters } from "@/components/careers-jobs-filters";
import { CareersJobsList } from "@/components/careers-jobs-list";
import { site } from "@/lib/site";

export const metadata = {
  title: "Jobs",
  description: `Open roles at ${site.brand.shortName}.`,
};
export default function CareersJobsPage() {
  const teams = Array.from(new Set(careerRoles.map((role) => role.team))).sort((a, b) => a.localeCompare(b));
  const offices = Array.from(new Set(careerRoles.flatMap((role) => role.locations))).sort((a, b) =>
    a.localeCompare(b),
  );

  return (
    <main id="main" className="bg-background">
      <Container className="py-16 sm:py-20">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-sm text-foreground/75 underline underline-offset-4 hover:text-foreground"
        >
          <ChevronLeft className="size-4" aria-hidden />
          Back to Careers
        </Link>

        <div className="mt-8">
          <h1 className="font-serif text-[clamp(2.3rem,4.6vw,3.4rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
            Join our team
          </h1>
          <div className="mt-4 max-w-[70ch] text-pretty text-lg leading-8 text-foreground/75">
            Explore open roles at our San Marino agency. Filter by team, office, or search by title.
          </div>
        </div>

        <Suspense
          fallback={
            <div className="mt-6 grid gap-3 md:grid-cols-[260px_260px_1fr]">
              <div className="h-12 w-full border border-foreground/35 bg-background/80" />
              <div className="h-12 w-full border border-foreground/35 bg-background/80" />
              <div className="h-12 w-full border border-foreground/35 bg-background/80" />
            </div>
          }
        >
          <CareersJobsFilters teams={teams} offices={offices} />
        </Suspense>

        <Suspense
          fallback={
            <div className="mt-10 border border-foreground/20 bg-surface/40 px-6 py-10 text-sm text-foreground/75">
              Loading roles…
            </div>
          }
        >
          <CareersJobsList teams={teams} roles={careerRoles} />
        </Suspense>
      </Container>
    </main>
  );
}
