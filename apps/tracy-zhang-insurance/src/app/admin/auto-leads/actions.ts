"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  autoLeadStatuses,
  type AutoLeadStatus,
} from "@insurance-websites/lead-capture";

import { clearAdminSession, getAdminAuthState, startAdminSession } from "@/lib/admin-auth";
import {
  addAutoLeadNote,
  updateAutoLeadStatus,
} from "@/lib/auto-lead-store";

export async function loginAutoLeadAdminAction(formData: FormData) {
  const user = String(formData.get("username") ?? "").trim();
  const pass = String(formData.get("password") ?? "");
  const result = await startAdminSession({ user, pass });

  if (result.ok) redirect("/admin/auto-leads");

  redirect(
    `/admin/auto-leads?login=${
      result.reason === "not-configured" ? "config" : "failed"
    }`,
  );
}

export async function logoutAutoLeadAdminAction() {
  await clearAdminSession();
  redirect("/admin/auto-leads");
}

export async function updateAutoLeadStatusAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("leadId") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim() as AutoLeadStatus;
  const note = String(formData.get("note") ?? "").trim();

  if (!id || !autoLeadStatuses.includes(status)) return;
  await updateAutoLeadStatus({ id, status, note });
  revalidatePath("/admin/auto-leads");
}

export async function addAutoLeadNoteAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("leadId") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();
  if (!id || !note) return;
  await addAutoLeadNote(id, note);
  revalidatePath("/admin/auto-leads");
}

async function requireAdmin() {
  const auth = await getAdminAuthState();
  if (!auth.authorized) redirect("/admin/auto-leads?login=required");
}
