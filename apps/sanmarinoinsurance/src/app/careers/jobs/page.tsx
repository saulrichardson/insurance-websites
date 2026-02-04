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
            Explore open roles at our San Marino agency.
          </div>
        </div>

        <CareersJobsList roles={careerRoles} />
      </Container>
    </main>
  );
}
