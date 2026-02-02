import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getSql } from "@/lib/db";

export const metadata = {
  title: "Admin • Careers",
  description: "View and manage job applications.",
};

type ApplicationStatus = "new" | "screening" | "interview" | "offer" | "rejected" | "hired";

const statusOptions: { value: ApplicationStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "screening", label: "Screening" },
  { value: "interview", label: "Interview" },
  { value: "offer", label: "Offer" },
  { value: "hired", label: "Hired" },
  { value: "rejected", label: "Rejected" },
];

type ApplicationRow = {
  id: string;
  received_at: string | Date;
  status: ApplicationStatus;
  assigned_to: string | null;
  role_title: string;
  name: string;
  email: string;
  phone: string | null;
  resume_key: string | null;
  resume_filename: string | null;
  message: string | null;
  notes: string | null;
};

async function listApplications(filterStatus?: string) {
  const sql = getSql();
  if (!sql) {
    return {
      ok: false as const,
      error: "DATABASE_URL is not configured.",
      rows: [] as ApplicationRow[],
      summary: [] as { status: ApplicationStatus; count: number }[],
    };
  }

  try {
    const where =
      filterStatus && statusOptions.some((s) => s.value === filterStatus)
        ? sql`where status = ${filterStatus}`
        : sql``;

    const rows = await sql<ApplicationRow[]>`
      select
        id,
        received_at,
        status,
        role_title,
        assigned_to,
        name,
        email,
        phone,
        resume_key,
        resume_filename,
        message,
        notes
      from careers_applications
      ${where}
      order by received_at desc
      limit 200
    `;

    const summaryRows = await sql<{ status: ApplicationStatus; count: number }[]>`
      select status, count(*)::int as count
      from careers_applications
      group by status
    `;

    return { ok: true as const, error: "", rows, summary: summaryRows };
  } catch (error) {
    return {
      ok: false as const,
      error: error instanceof Error ? error.message : "Unable to load applications.",
      rows: [] as ApplicationRow[],
      summary: [] as { status: ApplicationStatus; count: number }[],
    };
  }
}

async function updateApplication(formData: FormData) {
  "use server";

  const id = String(formData.get("id") || "").trim();
  const status = String(formData.get("status") || "").trim();
  const assignedTo = String(formData.get("assignedTo") || "").trim();
  const notes = String(formData.get("notes") || "").trim();

  if (!id) return;

  const sql = getSql();
  if (!sql) return;

  const validStatus = statusOptions.some((s) => s.value === status);
  if (!validStatus) return;

  await sql`
    update careers_applications
      set status = ${status},
          assigned_to = ${assignedTo || null},
          notes = ${notes || null},
          updated_at = now()
    where id = ${id}
  `;

  revalidatePath("/admin/careers");
}

export default async function AdminCareersPage({
  searchParams,
}: {
  searchParams?: { status?: string };
}) {
  const status = searchParams?.status?.trim();
  const result = await listApplications(status);
  const summaryByStatus = result.ok
    ? statusOptions.map((opt) => ({
        ...opt,
        count: result.summary.find((s) => s.status === opt.value)?.count || 0,
      }))
    : [];

  return (
    <main id="main" className="bg-background">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">Admin</div>
            <h1 className="mt-2 font-serif text-4xl tracking-[-0.03em] text-foreground">Careers inbox</h1>
            <div className="mt-3 text-sm text-foreground/75">
              View applications, update status, and download resumes.
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Link className="underline underline-offset-4 hover:text-foreground" href="/careers">
              View careers page
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            href="/admin/careers"
            className={[
              "border px-3 py-2 text-xs font-medium uppercase tracking-[0.18em]",
              !status ? "border-foreground bg-foreground text-white" : "border-foreground/25 bg-surface/50 text-foreground",
            ].join(" ")}
          >
            All
          </Link>
          {statusOptions.map((s) => (
            <Link
              key={s.value}
              href={`/admin/careers?status=${encodeURIComponent(s.value)}`}
              className={[
                "border px-3 py-2 text-xs font-medium uppercase tracking-[0.18em]",
                status === s.value
                  ? "border-foreground bg-foreground text-white"
                  : "border-foreground/25 bg-surface/50 text-foreground",
              ].join(" ")}
            >
              {s.label}
            </Link>
          ))}
        </div>

        {result.ok ? (
          <div className="mt-6 grid gap-3 border border-foreground/20 bg-surface/60 p-5 sm:grid-cols-3 sm:gap-4">
            <div className="text-sm text-foreground/75">
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
                Total
              </div>
              <div className="mt-1 font-serif text-2xl tracking-[-0.03em] text-foreground">
                {result.summary.reduce((acc, s) => acc + s.count, 0)}
              </div>
            </div>
            <div className="sm:col-span-2">
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
                By status
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {summaryByStatus.map((s) => (
                  <div
                    key={s.value}
                    className="border border-foreground/20 bg-background/40 px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-foreground"
                  >
                    {s.label} • {s.count}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-8">
          {!result.ok ? (
            <div className="border border-red-500/40 bg-red-500/10 p-5 text-sm text-foreground">
              <div className="font-semibold">Unable to load applications</div>
              <div className="mt-2 text-foreground/75">{result.error}</div>
              <div className="mt-3 text-xs text-foreground/70">
                If you just enabled Postgres, ensure the `careers_applications` table exists and `DATABASE_URL` is set.
              </div>
            </div>
          ) : null}

          {result.ok && result.rows.length === 0 ? (
            <div className="border border-foreground/20 bg-surface/60 p-6 text-sm text-foreground/75">
              No applications found.
            </div>
          ) : null}

          <div className="mt-6 grid gap-6">
            {result.rows.map((row) => (
              <section key={row.id} className="border border-foreground/20 bg-background/30 p-6 sm:p-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
                      {row.role_title}
                    </div>
                    <h2 className="mt-2 text-balance font-serif text-2xl tracking-[-0.03em] text-foreground">
                      {row.name}
                    </h2>
                    <div className="mt-2 text-sm text-foreground/75">
                      <a className="underline underline-offset-4 hover:text-foreground" href={`mailto:${row.email}`}>
                        {row.email}
                      </a>
                      {row.phone ? (
                        <>
                          {" "}
                          •{" "}
                          <a className="underline underline-offset-4 hover:text-foreground" href={`tel:${row.phone}`}>
                            {row.phone}
                          </a>
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
                    {(row.received_at instanceof Date
                      ? row.received_at
                      : new Date(row.received_at)
                    ).toLocaleString()}
                  </div>
                </div>

                {row.message ? (
                  <div className="mt-6 border border-foreground/15 bg-surface/50 p-5 text-sm leading-7 text-foreground/80">
                    {row.message}
                  </div>
                ) : null}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-foreground/75">
                    {row.resume_key ? (
                      <a
                        className="underline underline-offset-4 hover:text-foreground"
                        href={`/api/admin/careers/resume?id=${encodeURIComponent(row.id)}`}
                      >
                        Download resume{row.resume_filename ? ` • ${row.resume_filename}` : ""}
                      </a>
                    ) : (
                      <span>No resume uploaded</span>
                    )}
                  </div>

                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/70">
                    Current status: {statusOptions.find((s) => s.value === row.status)?.label || row.status}
                  </div>
                </div>

                <form action={updateApplication} className="mt-6 grid gap-4 border-t border-foreground/15 pt-6">
                  <input type="hidden" name="id" value={row.id} />
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <label className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/75" htmlFor={`status-${row.id}`}>
                        Status
                      </label>
                      <select
                        id={`status-${row.id}`}
                        name="status"
                        defaultValue={row.status}
                        className="h-11 w-full rounded-none border border-foreground/40 bg-background/80 px-4 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid gap-2">
                      <label className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/75" htmlFor={`assigned-${row.id}`}>
                        Assigned to (optional)
                      </label>
                      <input
                        id={`assigned-${row.id}`}
                        name="assignedTo"
                        defaultValue={row.assigned_to || ""}
                        className="h-11 w-full rounded-none border border-foreground/40 bg-background/80 px-4 text-sm text-foreground placeholder:text-foreground/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
                      />
                      <div className="text-xs leading-6 text-foreground/70">Use a name (e.g. “Tracy”).</div>
                    </div>

                    <div className="grid gap-2 sm:col-span-2">
                      <label className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/75" htmlFor={`notes-${row.id}`}>
                        Internal notes (optional)
                      </label>
                      <textarea
                        id={`notes-${row.id}`}
                        name="notes"
                        rows={3}
                        defaultValue={row.notes || ""}
                        className="w-full rounded-none border border-foreground/40 bg-background/80 px-4 py-3 text-sm leading-7 text-foreground placeholder:text-foreground/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex h-12 items-center justify-center rounded-none border border-foreground bg-foreground px-6 text-xs font-medium uppercase tracking-[0.18em] text-white shadow-sm shadow-black/15 transition-colors hover:bg-foreground/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/60 sm:w-fit"
                  >
                    Save
                  </button>
                </form>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
