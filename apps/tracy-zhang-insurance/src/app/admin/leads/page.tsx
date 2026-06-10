import type { Metadata } from "next";
import Link from "next/link";
import type { LeadStatus } from "@insurance-websites/lead-capture";

import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/ui/button";
import { getAdminAuthState } from "@/lib/admin-auth";
import { LeadStoreNotConfiguredError, getLeadDetail, listLeads } from "@/lib/lead-store";
import {
  addLeadNoteAction,
  loginAdminAction,
  logoutAdminAction,
  updateLeadStatusAction,
} from "@/app/admin/leads/actions";

export const metadata: Metadata = {
  title: "Leads Admin",
  robots: { index: false, follow: false },
};

const statuses: LeadStatus[] = ["new", "contacted", "closed", "spam"];

type PageProps = {
  searchParams: Promise<{ status?: string; leadId?: string; login?: string }>;
};

export default async function LeadsAdminPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const auth = await getAdminAuthState();
  if (!auth.authorized) {
    return <AdminLogin configured={auth.configured} loginState={params.login} />;
  }

  const status = statuses.includes(params.status as LeadStatus)
    ? (params.status as LeadStatus)
    : undefined;
  let data: {
    leads: Awaited<ReturnType<typeof listLeads>>;
    selected: Awaited<ReturnType<typeof getLeadDetail>>;
  };

  try {
    const [leads, selected] = await Promise.all([
      listLeads({ status, limit: 75 }),
      params.leadId ? getLeadDetail(params.leadId) : Promise.resolve(null),
    ]);
    data = { leads, selected };
  } catch (error) {
    if (error instanceof LeadStoreNotConfiguredError) {
      return <LeadStorageNotConfigured />;
    }

    throw error;
  }

  const { leads, selected } = data;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Container className="py-10">
        <div className="flex flex-col gap-4 border-b border-[var(--rail-border)] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase text-[var(--brand-ink)]">
              Admin
            </div>
            <h1 className="mt-2 font-[var(--font-serif)] text-4xl text-[var(--ink)]">
              Lead inbox
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
              Review quote requests, contact status, source attribution, and
              notification events.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              className={buttonClasses({ variant: "secondary", size: "sm" })}
              href="/admin/auto-leads"
            >
              Auto leads
            </Link>
            <Link className={buttonClasses({ variant: "secondary", size: "sm" })} href="/">
              Back to site
            </Link>
            <form action={logoutAdminAction}>
              <button className={buttonClasses({ variant: "secondary", size: "sm" })} type="submit">
                Sign out
              </button>
            </form>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link className={filterClass(!status)} href="/admin/leads">
            All
          </Link>
          {statuses.map((item) => (
            <Link
              key={item}
              className={filterClass(status === item)}
              href={`/admin/leads?status=${item}`}
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-3">
            {leads.length === 0 ? (
              <div className="border border-[var(--rail-border)] bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                No leads match this filter.
              </div>
            ) : (
              leads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/admin/leads?${new URLSearchParams({
                    ...(status ? { status } : {}),
                    leadId: lead.id,
                  })}`}
                  className="block border border-[var(--rail-border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-base font-semibold text-[var(--ink)]">
                        {lead.name}
                      </div>
                      <div className="mt-1 text-sm text-[var(--muted)]">
                        {lead.productInterest}
                      </div>
                    </div>
                    <span className="rounded-full border border-[var(--rail-border)] px-3 py-1 text-xs font-semibold uppercase text-[var(--brand-ink)]">
                      {lead.status}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-1 text-xs text-[var(--muted)]">
                    <div>{formatDate(lead.createdAt)}</div>
                    <div>
                      {lead.sourceDomain}
                      {lead.sourcePath}
                    </div>
                    <div>{[lead.phone, lead.email].filter(Boolean).join(" / ")}</div>
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className="border border-[var(--rail-border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]">
            {selected ? <LeadDetail selected={selected} /> : <EmptyDetail />}
          </div>
        </div>
      </Container>
    </div>
  );
}

function LeadStorageNotConfigured() {
  return (
    <Container className="py-16">
      <div className="border border-amber-300 bg-amber-50 p-6 text-amber-950">
        <h1 className="text-xl font-semibold">Lead storage is not configured</h1>
        <p className="mt-2 text-sm leading-6">
          Set DATABASE_URL and run{" "}
          <code>pnpm --filter @insurance-websites/tracy-zhang-insurance db:migrate:leads</code>{" "}
          before using the lead inbox.
        </p>
      </div>
    </Container>
  );
}

function AdminLogin({
  configured,
  loginState,
}: {
  configured: boolean;
  loginState?: string;
}) {
  const message = getLoginMessage(configured, loginState);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Container className="flex min-h-screen items-center py-16">
        <div className="mx-auto w-full max-w-md border border-[var(--rail-border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]">
          <div className="text-xs font-semibold uppercase text-[var(--brand-ink)]">
            Admin
          </div>
          <h1 className="mt-2 font-[var(--font-serif)] text-4xl text-[var(--ink)]">
            Lead inbox
          </h1>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Sign in to review quote requests, contact status, and source attribution.
          </p>

          {message ? (
            <div className="mt-5 border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
              {message}
            </div>
          ) : null}

          {configured ? (
            <form action={loginAdminAction} className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm font-medium text-[var(--ink)]">
                Username
                <input
                  autoComplete="username"
                  className="h-11 rounded-lg border border-[var(--rail-border)] bg-white px-3 text-sm"
                  name="username"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-[var(--ink)]">
                Password
                <input
                  autoComplete="current-password"
                  className="h-11 rounded-lg border border-[var(--rail-border)] bg-white px-3 text-sm"
                  name="password"
                  required
                  type="password"
                />
              </label>
              <button className={buttonClasses({ variant: "primary", size: "md" })} type="submit">
                Sign in
              </button>
            </form>
          ) : null}

          <Link
            className="mt-6 inline-flex text-sm font-semibold text-[var(--brand-ink)]"
            href="/"
          >
            Back to site
          </Link>
        </div>
      </Container>
    </div>
  );
}

function getLoginMessage(configured: boolean, loginState?: string) {
  if (!configured || loginState === "config") {
    return "Admin credentials are not configured.";
  }

  if (loginState === "failed") return "Those credentials did not match.";
  if (loginState === "required") return "Sign in to continue.";
  return null;
}

function LeadDetail({
  selected,
}: {
  selected: NonNullable<Awaited<ReturnType<typeof getLeadDetail>>>;
}) {
  const { lead, events } = selected;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase text-[var(--brand-ink)]">
            Selected lead
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--ink)]">{lead.name}</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">{lead.productInterest}</p>
        </div>
        <form action={updateLeadStatusAction} className="flex gap-2">
          <input type="hidden" name="leadId" value={lead.id} />
          <select
            name="status"
            defaultValue={lead.status}
            className="h-10 rounded-lg border border-[var(--rail-border)] bg-white px-3 text-sm"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button className={buttonClasses({ variant: "primary", size: "sm" })}>
            Save
          </button>
        </form>
      </div>

      <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
        {[
          ["Phone", lead.phone],
          ["Email", lead.email],
          ["Preferred contact", lead.preferredContact],
          ["Office", lead.officePreference],
          ["ZIP", lead.zip],
          ["Source", `${lead.sourceDomain}${lead.sourcePath}`],
          ["Campaign", lead.utmCampaign],
          ["Referrer", lead.referrer],
        ].map(([label, value]) => (
          <div key={label} className="border border-[var(--rail-border)] bg-[var(--background)] p-4">
            <dt className="text-xs font-semibold uppercase text-[var(--brand-ink)]">{label}</dt>
            <dd className="mt-1 break-words text-[var(--ink)]">{value || "Not provided"}</dd>
          </div>
        ))}
      </dl>

      {lead.message ? (
        <div className="mt-5 border border-[var(--rail-border)] bg-[var(--background)] p-4 text-sm leading-6 text-[var(--ink)]">
          <div className="text-xs font-semibold uppercase text-[var(--brand-ink)]">
            Message
          </div>
          <p className="mt-2 whitespace-pre-wrap">{lead.message}</p>
        </div>
      ) : null}

      <form action={addLeadNoteAction} className="mt-6 grid gap-3">
        <input type="hidden" name="leadId" value={lead.id} />
        <label className="grid gap-2 text-sm font-medium text-[var(--ink)]">
          Internal note
          <textarea
            name="note"
            rows={3}
            className="rounded-lg border border-[var(--rail-border)] bg-white px-3 py-2 text-sm"
            placeholder="Add follow-up context..."
          />
        </label>
        <div>
          <button className={buttonClasses({ variant: "secondary", size: "sm" })}>
            Add note
          </button>
        </div>
      </form>

      <div className="mt-8">
        <div className="text-xs font-semibold uppercase text-[var(--brand-ink)]">
          Events
        </div>
        <div className="mt-3 grid gap-3">
          {events.map((event) => (
            <div key={event.id} className="border-l-2 border-[var(--brand)] bg-[var(--background)] px-4 py-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm font-semibold text-[var(--ink)]">{event.eventType}</div>
                <div className="text-xs text-[var(--muted)]">{formatDate(event.createdAt)}</div>
              </div>
              {event.eventBody ? (
                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[var(--muted)]">
                  {event.eventBody}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyDetail() {
  return (
    <div className="grid min-h-80 place-items-center text-center">
      <div>
        <div className="font-[var(--font-serif)] text-3xl text-[var(--ink)]">
          Select a lead
        </div>
        <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--muted)]">
          Choose a request to review contact details, attribution, notes, and
          notification events.
        </p>
      </div>
    </div>
  );
}

function filterClass(active: boolean) {
  return [
    "rounded-full border px-4 py-2 text-sm font-semibold",
    active
      ? "border-[var(--ink)] bg-[var(--ink)] text-white"
      : "border-[var(--rail-border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--ink)]",
  ].join(" ");
}

function formatDate(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
