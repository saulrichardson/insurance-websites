import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/ui/button";
import { getAdminAuthState } from "@/lib/admin-auth";
import {
  getIdentityCaptureAdminData,
  type IdentityMatchRow,
  type IdentityResolutionRequestRow,
} from "@/lib/identity-resolution-store";

export const metadata: Metadata = {
  title: "Contact Capture Admin",
  robots: { index: false, follow: false },
};

export default async function ContactCaptureAdminPage() {
  const auth = await getAdminAuthState();
  if (!auth.authorized) redirect("/admin/leads?login=required");

  const data = await getIdentityCaptureAdminData();
  const statusCounts = getStatusCounts(data.requests);
  const acceptedMatches = data.matches.filter((match) => match.status === "accepted");

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Container className="py-10">
        <div className="flex flex-col gap-4 border-b border-[var(--rail-border)] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase text-[var(--brand-ink)]">
              Admin
            </div>
            <h1 className="mt-2 font-[var(--font-serif)] text-4xl text-[var(--ink)]">
              Contact capture
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
              Visitor identity attempts, resolved people, and outbound-ready
              contact evidence from the website capture layer.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link className={buttonClasses({ variant: "secondary", size: "sm" })} href="/admin/leads">
              Lead inbox
            </Link>
            <Link
              className={buttonClasses({ variant: "secondary", size: "sm" })}
              href="/admin/auto-leads"
            >
              Auto leads
            </Link>
            <Link className={buttonClasses({ variant: "secondary", size: "sm" })} href="/">
              Back to site
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-4">
          <Metric label="Provider" value={data.provider.provider} detail={data.provider.endpointHost ?? "not connected"} />
          <Metric
            label="Resolution mode"
            value={data.provider.configured ? "webhook live" : "token + ledger"}
            detail={`min confidence ${formatConfidence(data.provider.minAcceptedConfidence)}`}
          />
          <Metric label="Accepted matches" value={String(acceptedMatches.length)} detail="recent window" />
          <Metric label="Requests" value={String(data.requests.length)} detail={formatStatusCounts(statusCounts)} />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="border border-[var(--rail-border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
            <SectionHeader
              kicker="Identity matches"
              title="Resolved contacts"
              detail="Accepted and candidate matches that can feed outbound review."
            />
            <div className="divide-y divide-[var(--rail-border)]">
              {data.matches.length > 0 ? (
                data.matches.map((match) => <MatchRow key={match.id} match={match} />)
              ) : (
                <EmptyState message="No resolved identity matches have been recorded yet." />
              )}
            </div>
          </section>

          <section className="border border-[var(--rail-border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
            <SectionHeader
              kicker="Resolution ledger"
              title="Recent attempts"
              detail="Every visit-level request, including skipped and no-match attempts."
            />
            <div className="divide-y divide-[var(--rail-border)]">
              {data.requests.length > 0 ? (
                data.requests.map((request) => (
                  <RequestRow key={request.id} request={request} />
                ))
              ) : (
                <EmptyState message="No visitor identity requests have been recorded yet." />
              )}
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="border border-[var(--rail-border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-sm)]">
      <div className="text-xs font-semibold uppercase text-[var(--brand-ink)]">{label}</div>
      <div className="mt-2 truncate text-2xl font-semibold text-[var(--ink)]">{value}</div>
      <div className="mt-1 truncate text-xs text-[var(--muted)]">{detail}</div>
    </div>
  );
}

function SectionHeader({
  kicker,
  title,
  detail,
}: {
  kicker: string;
  title: string;
  detail: string;
}) {
  return (
    <div className="border-b border-[var(--rail-border)] bg-[var(--background)] px-5 py-4">
      <div className="text-xs font-semibold uppercase text-[var(--brand-ink)]">{kicker}</div>
      <div className="mt-1 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-xl font-semibold text-[var(--ink)]">{title}</h2>
        <p className="max-w-sm text-xs leading-5 text-[var(--muted)]">{detail}</p>
      </div>
    </div>
  );
}

function MatchRow({ match }: { match: IdentityMatchRow }) {
  const primary = match.fullName ?? match.contactName ?? match.company ?? "Unnamed match";
  const contactLines = [match.email, match.phone, match.company].filter(Boolean);

  return (
    <article className="grid gap-4 px-5 py-4 md:grid-cols-[1fr_10rem]">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className={statusClass(match.status)}>{match.status}</span>
          <span className="text-xs font-semibold uppercase text-[var(--brand-ink)]">
            {match.provider}
          </span>
          <span className="text-xs text-[var(--muted)]">
            {match.matchType} · {formatConfidence(match.confidence)}
          </span>
        </div>
        <h3 className="mt-2 truncate text-base font-semibold text-[var(--ink)]">{primary}</h3>
        <div className="mt-1 grid gap-1 text-sm text-[var(--muted)]">
          <div className="break-words">{contactLines.length > 0 ? contactLines.join(" / ") : "No direct identity value returned"}</div>
          <div className="break-words">
            {match.sourceDomain}
            {match.path}
          </div>
        </div>
      </div>
      <dl className="grid gap-1 text-xs text-[var(--muted)]">
        <Detail label="Contact" value={shortId(match.contactId)} />
        <Detail label="Visitor" value={shortId(match.visitorId)} />
        <Detail label="Session" value={shortId(match.sessionId)} />
        <Detail label="Created" value={formatDate(match.createdAt)} />
      </dl>
    </article>
  );
}

function RequestRow({ request }: { request: IdentityResolutionRequestRow }) {
  return (
    <article className="px-5 py-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className={statusClass(request.status)}>{request.status}</span>
        <span className="text-xs font-semibold uppercase text-[var(--brand-ink)]">
          {request.provider}
        </span>
        <span className="text-xs text-[var(--muted)]">{request.eventName}</span>
      </div>
      <div className="mt-2 break-words text-sm font-semibold text-[var(--ink)]">
        {request.sourceDomain}
        {request.path}
      </div>
      <dl className="mt-3 grid gap-1 text-xs text-[var(--muted)] sm:grid-cols-2">
        <Detail label="Request" value={shortId(request.id)} />
        <Detail label="Visitor" value={shortId(request.visitorId)} />
        <Detail label="Session" value={shortId(request.sessionId)} />
        <Detail label="Created" value={formatDate(request.createdAt)} />
      </dl>
      {request.errorMessage ? (
        <div className="mt-3 border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-950">
          {request.errorMessage}
        </div>
      ) : null}
    </article>
  );
}

function Detail({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="grid grid-cols-[4.5rem_1fr] gap-2">
      <dt className="font-semibold uppercase text-[var(--brand-ink)]">{label}</dt>
      <dd className="min-w-0 break-words text-[var(--muted)]">{value || "none"}</dd>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return <div className="px-5 py-8 text-sm text-[var(--muted)]">{message}</div>;
}

function statusClass(status: string) {
  const tone =
    status === "accepted" || status === "matched"
      ? "border-emerald-300 bg-emerald-50 text-emerald-950"
      : status === "candidate" || status === "queued"
        ? "border-amber-300 bg-amber-50 text-amber-950"
        : status === "error" || status === "rejected" || status === "suppressed"
          ? "border-red-300 bg-red-50 text-red-950"
          : "border-[var(--rail-border)] bg-white text-[var(--muted)]";
  return `rounded-full border px-2.5 py-1 text-xs font-semibold uppercase ${tone}`;
}

function getStatusCounts(requests: IdentityResolutionRequestRow[]) {
  return requests.reduce<Record<string, number>>((counts, request) => {
    counts[request.status] = (counts[request.status] ?? 0) + 1;
    return counts;
  }, {});
}

function formatStatusCounts(counts: Record<string, number>) {
  const entries = Object.entries(counts);
  if (entries.length === 0) return "no attempts";
  return entries.map(([status, count]) => `${status} ${count}`).join(" / ");
}

function formatConfidence(value: number | null | undefined) {
  return typeof value === "number" ? `${Math.round(value * 100)}%` : "unknown";
}

function shortId(value?: string | null) {
  if (!value) return null;
  return value.length > 18 ? `${value.slice(0, 10)}...${value.slice(-4)}` : value;
}

function formatDate(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
