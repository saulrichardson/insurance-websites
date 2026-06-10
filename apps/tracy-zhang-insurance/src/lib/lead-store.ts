import type { LeadStatus, ValidLead } from "@insurance-websites/lead-capture";

import { getSql } from "@/lib/db";

export type StoredLead = {
  id: string;
  status: LeadStatus;
  receivedAt: string;
  name: string;
  email: string | null;
  phone: string | null;
  productInterest: string;
  preferredContact: string;
  officePreference: string | null;
  zip: string | null;
  message: string | null;
  sourceDomain: string;
  sourcePath: string;
  referrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  createdAt: string;
  updatedAt: string;
};

export type LeadEvent = {
  id: number;
  leadId: string | null;
  eventType: string;
  eventBody: string | null;
  metadata: unknown;
  createdAt: string;
};

type LeadEventMetadataValue =
  | null
  | string
  | number
  | boolean
  | Date
  | readonly LeadEventMetadataValue[]
  | { readonly [key: string]: LeadEventMetadataValue | undefined };

type LeadEventMetadata = {
  readonly [key: string]: LeadEventMetadataValue | undefined;
};

export class LeadStoreNotConfiguredError extends Error {
  constructor() {
    super("DATABASE_URL is not configured.");
  }
}

export async function insertLead(lead: ValidLead, options?: { blockedReason?: string; status?: LeadStatus }) {
  const sql = getRequiredSql();
  const status = options?.status ?? "new";

  await sql.begin(async (tx) => {
    await tx`
      insert into leads (
        id,
        status,
        received_at,
        name,
        email,
        phone,
        product_interest,
        preferred_contact,
        office_preference,
        zip,
        message,
        source_domain,
        source_path,
        referrer,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content,
        campaign_slug,
        user_agent,
        ip,
        suspicious_reason,
        blocked_reason
      )
      values (
        ${lead.requestId},
        ${status},
        ${lead.receivedAt},
        ${lead.name},
        ${lead.email ?? null},
        ${lead.phone ?? null},
        ${lead.productInterest},
        ${lead.preferredContact},
        ${lead.officePreference ?? null},
        ${lead.zip ?? null},
        ${lead.message ?? null},
        ${lead.sourceDomain},
        ${lead.sourcePath},
        ${lead.referrer ?? null},
        ${lead.utmSource ?? null},
        ${lead.utmMedium ?? null},
        ${lead.utmCampaign ?? null},
        ${lead.utmTerm ?? null},
        ${lead.utmContent ?? null},
        ${lead.campaignSlug ?? null},
        ${lead.userAgent ?? null},
        ${lead.ip ?? null},
        ${lead.suspiciousReason ?? null},
        ${options?.blockedReason ?? null}
      )
    `;

    await tx`
      insert into lead_consents (
        lead_id,
        consent_copy_version,
        contact_consent_accepted,
        sms_consent_accepted,
        consent_source_url,
        ip,
        user_agent
      )
      values (
        ${lead.requestId},
        ${lead.consentCopyVersion},
        ${lead.consentAccepted},
        ${Boolean(lead.smsConsentAccepted)},
        ${`${lead.sourceDomain}${lead.sourcePath}`},
        ${lead.ip ?? null},
        ${lead.userAgent ?? null}
      )
    `;
  });
}

export async function recordLeadEvent(input: {
  leadId?: string;
  eventType: string;
  eventBody?: string;
  metadata?: LeadEventMetadata;
}) {
  const sql = getRequiredSql();
  await sql`
    insert into lead_events (lead_id, event_type, event_body, metadata)
    values (
      ${input.leadId ?? null},
      ${input.eventType},
      ${input.eventBody ?? null},
      ${sql.json(input.metadata ?? {})}
    )
  `;
}

export async function listLeads(filters?: { status?: LeadStatus; limit?: number }) {
  const sql = getRequiredSql();
  const limit = Math.min(Math.max(filters?.limit ?? 50, 1), 100);

  const rows =
    filters?.status
      ? await sql`
          select *
          from leads
          where status = ${filters.status}
          order by created_at desc
          limit ${limit}
        `
      : await sql`
          select *
          from leads
          order by created_at desc
          limit ${limit}
        `;

  return rows.map(mapLeadRow);
}

export async function getLeadDetail(id: string) {
  const sql = getRequiredSql();
  const [lead] = await sql`select * from leads where id = ${id} limit 1`;
  if (!lead) return null;

  const events = await sql`
    select *
    from lead_events
    where lead_id = ${id}
    order by created_at desc
  `;

  return {
    lead: mapLeadRow(lead),
    events: events.map(mapLeadEventRow),
  };
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const sql = getRequiredSql();
  await sql`
    update leads
    set status = ${status}, updated_at = now()
    where id = ${id}
  `;
  await recordLeadEvent({ leadId: id, eventType: "status_updated", metadata: { status } });
}

export async function addLeadNote(id: string, note: string) {
  const trimmed = note.trim();
  if (!trimmed) return;
  await recordLeadEvent({ leadId: id, eventType: "admin_note", eventBody: trimmed });
}

function getRequiredSql() {
  const sql = getSql();
  if (!sql) throw new LeadStoreNotConfiguredError();
  return sql;
}

function mapLeadRow(row: Record<string, unknown>): StoredLead {
  return {
    id: String(row.id),
    status: row.status as LeadStatus,
    receivedAt: toIso(row.received_at),
    name: String(row.name),
    email: nullableString(row.email),
    phone: nullableString(row.phone),
    productInterest: String(row.product_interest),
    preferredContact: String(row.preferred_contact),
    officePreference: nullableString(row.office_preference),
    zip: nullableString(row.zip),
    message: nullableString(row.message),
    sourceDomain: String(row.source_domain),
    sourcePath: String(row.source_path),
    referrer: nullableString(row.referrer),
    utmSource: nullableString(row.utm_source),
    utmMedium: nullableString(row.utm_medium),
    utmCampaign: nullableString(row.utm_campaign),
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
  };
}

function mapLeadEventRow(row: Record<string, unknown>): LeadEvent {
  return {
    id: Number(row.id),
    leadId: nullableString(row.lead_id),
    eventType: String(row.event_type),
    eventBody: nullableString(row.event_body),
    metadata: row.metadata,
    createdAt: toIso(row.created_at),
  };
}

function nullableString(value: unknown) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function toIso(value: unknown) {
  if (value instanceof Date) return value.toISOString();
  return String(value);
}
