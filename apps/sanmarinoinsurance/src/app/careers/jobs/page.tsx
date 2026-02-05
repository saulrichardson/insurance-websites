import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { careerRoles } from "@/lib/careers";
import { CareersJobsList } from "@/components/careers-jobs-list";
import { site } from "@/lib/site";

export const metadata = {
  title: "Jobs",
  description: `Open roles at ${site.brand.shortName}.`,
};
export default function CareersJobsPage() {
  return (
    <main id="main" className="bg-background">
      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-[920px]">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/60"
          >
            <ChevronLeft className="size-4" aria-hidden />
            Back to Careers
          </Link>

          <div className="mt-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-surface/70 px-4 py-2 text-xs font-medium text-accent shadow-sm shadow-black/5">
              <span className="size-1.5 rounded-full bg-brand" aria-hidden />
              Open roles • {site.agent.location}
            </div>

            <h1 className="mt-7 font-serif text-[clamp(2.3rem,4.6vw,3.4rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
              {careerRoles.length} open {careerRoles.length === 1 ? "role" : "roles"}
            </h1>
            <div className="mt-4 max-w-[70ch] text-pretty text-lg leading-8 text-foreground/75">
              Browse the roles below. If something fits, you can apply in a few minutes — we’ll follow up by email with
              next steps.
            </div>
          </div>

          <CareersJobsList roles={careerRoles} />
        </div>
      </Container>
    </main>
  );
}
