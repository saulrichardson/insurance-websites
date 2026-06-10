import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { PageCTA } from "@/components/PageCTA";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/ui/Card";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the team behind Tracy Zhang Insurance. Fast response, plain-English recommendations, and support after the sale.",
  alternates: { canonical: "/team" },
};

const teamRoles = [
  {
    title: "Agency leadership",
    body: "Handles complex cases, coverage strategy, and making sure every recommendation makes sense.",
  },
  {
    title: "Licensed agents",
    body: "Quotes, compares options, and explains the tradeoffs that matter so you can choose confidently.",
  },
  {
    title: "Client service team",
    body: "Policy changes, additions, certificates, and follow-through—so you’re not stuck in limbo.",
  },
  {
    title: "Specialty-market support",
    body: "Guidance when the standard market isn’t available, including next steps for California-specific scenarios.",
  },
];

export default function TeamPage() {
  const languagesLabel =
    site.languages.length > 0 ? site.languages.join(", ") : "";

  return (
    <div className="bg-white">
      <PageHero
        eyebrow="Team"
        title="Fast response, plain-English coverage"
        subtitle={`We’re a local team based in ${site.address.addressLocality}. Reach out for a quote or a quick policy review. ${
          languagesLabel ? `Languages: ${languagesLabel}.` : ""
        }`}
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="space-y-5">
            <Card className="p-7">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Allstate Insurance Agent
              </div>
              <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                {site.name}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Based in {site.address.addressLocality}, {site.address.addressRegion}
                . Call or text for the fastest response.
              </p>
              {site.reviews ? (
                <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-700">
                  <span className="font-semibold text-slate-950">
                    {site.reviews.rating}★
                  </span>
                  <span className="text-slate-400">•</span>
                  <span>{site.reviews.count} reviews</span>
                </div>
              ) : null}
              {site.languages.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {site.languages.map((lang) => (
                    <span
                      key={lang}
                      className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs text-slate-700 shadow-sm"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              ) : null}
            </Card>

            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              How we work
            </h2>
            <p className="text-base leading-7 text-slate-600 sm:text-lg">
              We’re not here to overwhelm you with forms. We ask what’s needed
              to quote accurately, then present options you can actually
              compare.
            </p>
            <div className="grid gap-3">
              {[
                "We respond quickly (call or text)",
                "We explain coverage in plain English",
                "We document decisions so you can reference them later",
                "We support changes and annual reviews after you bind",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-sm"
                >
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-[var(--brand)]" />
                  <span className="text-sm leading-6 text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Card className="p-7">
              <div className="text-base font-semibold text-slate-950">
                What we believe
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Insurance should feel calm: clear choices, fast next steps, and
                no surprises.
              </p>
            </Card>
          </div>

          <div className="grid gap-4">
            {teamRoles.map((role) => (
              <Card key={role.title} className="p-7">
                <div className="text-base font-semibold text-slate-950">
                  {role.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {role.body}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Container>

      <PageCTA />
    </div>
  );
}
