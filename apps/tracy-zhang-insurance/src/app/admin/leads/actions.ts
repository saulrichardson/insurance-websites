"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { LeadStatus } from "@insurance-websites/lead-capture";

import { clearAdminSession, getAdminAuthState, startAdminSession } from "@/lib/admin-auth";
import { addLeadNote, updateLeadStatus } from "@/lib/lead-store";

const statuses: LeadStatus[] = ["new", "contacted", "closed", "spam"];

export async function loginAdminAction(formData: FormData) {
  const user = String(formData.get("username") ?? "").trim();
  const pass = String(formData.get("password") ?? "");
  const result = await startAdminSession({ user, pass });

  if (result.ok) redirect("/admin/leads");

  redirect(`/admin/leads?login=${result.reason === "not-configured" ? "config" : "failed"}`);
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect("/admin/leads");
}

export async function updateLeadStatusAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("leadId") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim() as LeadStatus;
  if (!id || !statuses.includes(status)) return;
  await updateLeadStatus(id, status);
  revalidatePath("/admin/leads");
}

export async function addLeadNoteAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("leadId") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();
  if (!id || !note) return;
  await addLeadNote(id, note);
  revalidatePath("/admin/leads");
}

async function requireAdmin() {
  const auth = await getAdminAuthState();
  if (!auth.authorized) redirect("/admin/leads?login=required");
}
