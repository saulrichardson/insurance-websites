import type { Metadata } from "next";
import Link from "next/link";
import {
  autoLeadStatuses,
  type AutoLeadStatus,
} from "@insurance-websites/lead-capture";

import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/ui/button";
import { getAdminAuthState } from "@/lib/admin-auth";
import {
  AutoLeadStoreNotConfiguredError,
  getAutoLeadDetail,
  listAutoLeads,
} from "@/lib/auto-lead-store";
import {
  addAutoLeadNoteAction,
  loginAutoLeadAdminAction,
  logoutAutoLeadAdminAction,
  updateAutoLeadStatusAction,
} from "@/app/admin/auto-leads/actions";

export const metadata: Metadata = {
  title: "Auto Leads Admin",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ status?: string; leadId?: string; login?: string }>;
};

export default async function AutoLeadsAdminPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const auth = await getAdminAuthState();
  if (!auth.authorized) {
    return <AdminLogin configured={auth.configured} loginState={params.login} />;
  }

  const status = autoLeadStatuses.includes(params.status as AutoLeadStatus)
    ? (params.status as AutoLeadStatus)
    : undefined;

  let data: {
    leads: Awaited<ReturnType<typeof listAutoLeads>>;
    selected: Awaited<ReturnType<typeof getAutoLeadDetail>>;
  };

  try {
    const [leads, selected] = await Promise.all([
      listAutoLeads({ status, limit: 100 }),
      params.leadId ? getAutoLeadDetail(params.leadId) : Promise.resolve(null),
    ]);
    data = { leads, selected };
  } catch (error) {
    if (error instanceof AutoLeadStoreNotConfiguredError) {
      return <LeadStorageNotConfigured />;
    }

    throw error;
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Container className="py-10">
        <div className="flex flex-col gap-4 border-b border-[var(--rail-border)] pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase text-[var(--brand-ink)]">
              Admin
            </div>
            <h1 className="mt-2 font-[var(--font-serif)] text-4xl text-[var(--ink)]">
              Auto leads
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
              Review one-vehicle auto lead submissions, consent evidence,
              status, and fee eligibility.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link className={buttonClasses({ variant: "secondary", size: "sm" })} href="/admin/leads">
              Quote leads
            </Link>
            <Link className={buttonClasses({ variant: "secondary", size: "sm" })} href="/">
              Back to site
            </Link>
            <form action={logoutAutoLeadAdminAction}>
              <button className={buttonClasses({ variant: "secondary", size: "sm" })} type="submit">
                Sign out
              </button>
            </form>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link className={filterClass(!status)} href="/admin/auto-leads">
            All
          </Link>
          {autoLeadStatuses.map((item) => (
            <Link
              key={item}
              className={filterClass(status === item)}
              href={`/admin/auto-leads?status=${item}`}
            >
              {formatStatus(item)}
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="grid gap-3">
            {data.leads.length === 0 ? (
              <div className="border border-[var(--rail-border)] bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
                No auto leads match this filter.
              </div>
            ) : (
              data.leads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/admin/auto-leads?${new URLSearchParams({
                    ...(status ? { status } : {}),
                    leadId: lead.id,
                  })}`}
                  className="block border border-[var(--rail-border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-base font-semibold text-[var(--ink)]">
                        {lead.prospectName}
                      </div>
                      <div className="mt-1 text-sm text-[var(--muted)]">
                        {[lead.vehicleYear, lead.vehicleMake, lead.vehicleModel]
                          .filter(Boolean)
                          .join(" ") || "Vehicle not named"}
                      </div>
                    </div>
                    <span className="rounded-full border border-[var(--rail-border)] px-3 py-1 text-xs font-semibold uppercase text-[var(--brand-ink)]">
                      {formatStatus(lead.status)}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-1 text-xs text-[var(--muted)]">
                    <div>{formatDate(lead.createdAt)}</div>
                    <div>Submitter: {lead.submitterName}</div>
                    <div>{[lead.prospectPhone, lead.prospectEmail].filter(Boolean).join(" / ")}</div>
                    <div>
                      Payment: {formatStatus(lead.paymentStatus)}
                      {lead.qualifiedLeadFeeCents
                        ? ` (${formatMoney(lead.qualifiedLeadFeeCents)})`
                        : ""}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className="border border-[var(--rail-border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]">
            {data.selected ? <LeadDetail selected={data.selected} /> : <EmptyDetail />}
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
        <h1 className="text-xl font-semibold">Auto lead storage is not configured</h1>
        <p className="mt-2 text-sm leading-6">
          Set DATABASE_URL and run{" "}
          <code>pnpm --filter @insurance-websites/tracy-zhang-insurance db:migrate:leads</code>{" "}
          before using auto lead intake.
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
            Auto leads
          </h1>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Sign in to review auto lead submissions and audit events.
          </p>

          {message ? (
            <div className="mt-5 border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
              {message}
            </div>
          ) : null}

          {configured ? (
            <form action={loginAutoLeadAdminAction} className="mt-6 grid gap-4">
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
  selected: NonNullable<Awaited<ReturnType<typeof getAutoLeadDetail>>>;
}) {
  const { lead, events } = selected;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase text-[var(--brand-ink)]">
            Selected auto lead
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--ink)]">
            {lead.prospectName}
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {[lead.vehicleYear, lead.vehicleMake, lead.vehicleModel, lead.vehicleTrim]
              .filter(Boolean)
              .join(" ") || "Vehicle not named"}
          </p>
        </div>
        <form action={updateAutoLeadStatusAction} className="grid gap-2 sm:min-w-80">
          <input type="hidden" name="leadId" value={lead.id} />
          <select
            name="status"
            defaultValue={lead.status}
            className="h-10 rounded-lg border border-[var(--rail-border)] bg-white px-3 text-sm"
          >
            {autoLeadStatuses.map((status) => (
              <option key={status} value={status}>
                {formatStatus(status)}
              </option>
            ))}
          </select>
          <textarea
            name="note"
            rows={2}
            className="rounded-lg border border-[var(--rail-border)] bg-white px-3 py-2 text-sm"
            placeholder="Reason note for status changes, especially acceptance, rejection, or revocation..."
          />
          <button className={buttonClasses({ variant: "primary", size: "sm" })}>
            Save status
          </button>
        </form>
      </div>

      <div className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
        <Info label="Status" value={formatStatus(lead.status)} />
        <Info label="Payment" value={formatStatus(lead.paymentStatus)} />
        <Info label="Qualified fee" value={lead.qualifiedLeadFeeCents ? formatMoney(lead.qualifiedLeadFeeCents) : "Not eligible yet"} />
        <Info label="Ladder position" value={lead.ladderPosition ? String(lead.ladderPosition) : "Not set"} />
        <Info label="Submitter" value={`${lead.submitterName} (${lead.submitterId})`} />
        <Info label="Submitter email" value={lead.submitterEmail} />
        <Info label="Prospect phone" value={lead.prospectPhone} />
        <Info label="Prospect email" value={lead.prospectEmail} />
        <Info
          label="Prospect address"
          value={[lead.residentialAddress, lead.city, lead.state, lead.zip].filter(Boolean).join(", ")}
        />
        <Info label="Preferred contact" value={lead.preferredContactMethod} />
        <Info label="Consent obtained" value={lead.consentObtainedAt} />
        <Info label="Consent method" value={lead.consentMethod} />
        <Info label="VIN" value={lead.vin} />
        <Info label="Garaging ZIP" value={lead.garagingZip} />
        <Info label="Primary driver" value={lead.primaryDriverName} />
        <Info label="License status" value={lead.primaryDriverLicenseStatus} />
        <Info label="Currently insured" value={lead.currentlyInsured} />
        <Info label="Current carrier" value={lead.currentCarrier} />
        <Info label="Desired timing" value={lead.desiredTiming} />
        <Info label="Coverage preference" value={lead.coveragePreference} />
        <Info label="Source" value={`${lead.sourceDomain}${lead.sourcePath}`} />
        <Info label="Campaign/source ID" value={lead.campaignId || lead.utmCampaign} />
      </div>

      {[
        ["Consent proof notes", lead.consentProofNotes],
        ["Information disclosed by prospect", lead.drivingHistoryDisclosure],
        ["Other stated coverage preference", lead.coveragePreferenceOther],
        ["Rejection reason", lead.rejectionReason],
        ["Revocation reason", lead.revocationReason],
      ].map(([label, value]) =>
        value ? (
          <div key={label} className="mt-5 border border-[var(--rail-border)] bg-[var(--background)] p-4 text-sm leading-6 text-[var(--ink)]">
            <div className="text-xs font-semibold uppercase text-[var(--brand-ink)]">
              {label}
            </div>
            <p className="mt-2 whitespace-pre-wrap">{value}</p>
          </div>
        ) : null,
      )}

      <form action={addAutoLeadNoteAction} className="mt-6 grid gap-3">
        <input type="hidden" name="leadId" value={lead.id} />
        <label className="grid gap-2 text-sm font-medium text-[var(--ink)]">
          Internal note
          <textarea
            name="note"
            rows={3}
            className="rounded-lg border border-[var(--rail-border)] bg-white px-3 py-2 text-sm"
            placeholder="Add review, correction, compliance, or payment context..."
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
          Audit events
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

function Info({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="border border-[var(--rail-border)] bg-[var(--background)] p-4">
      <dt className="text-xs font-semibold uppercase text-[var(--brand-ink)]">{label}</dt>
      <dd className="mt-1 break-words text-[var(--ink)]">{value || "Not provided"}</dd>
    </div>
  );
}

function EmptyDetail() {
  return (
    <div className="grid min-h-80 place-items-center text-center">
      <div>
        <div className="font-[var(--font-serif)] text-3xl text-[var(--ink)]">
          Select an auto lead
        </div>
        <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--muted)]">
          Choose a submission to review consent, vehicle data, status, payment eligibility, and audit events.
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

function formatStatus(value: string) {
  return value.replaceAll("_", " ");
}

function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

function formatDate(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
