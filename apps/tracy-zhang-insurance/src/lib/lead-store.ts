import type postgres from "postgres";
import { consentCopy, type LeadStatus, type ValidLead } from "@insurance-websites/lead-capture";

import { getSql } from "@/lib/db";
import type { VisitorCaptureData } from "@/lib/visitor-data";

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

export type StoredContact = {
  id: string;
  fullName: string | null;
  preferredLanguage: string | null;
  primaryOfficeId: string | null;
  lifecycleStage: string;
  firstSeenAt: string;
  lastSeenAt: string;
  createdAt: string;
  updatedAt: string;
};

export type StoredContactIdentity = {
  id: number;
  contactId: string;
  identityType: "email" | "phone";
  value: string;
  normalizedValue: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type StoredContactConsent = {
  id: number;
  contactId: string;
  leadId: string | null;
  channel: "email" | "phone" | "sms";
  purpose: string;
  status: string;
  consentCopyVersion: string;
  consentCopy: string;
  sourceDomain: string;
  sourcePath: string;
  ip: string | null;
  userAgent: string | null;
  occurredAt: string;
  metadata: unknown;
};

export type StoredContactSource = {
  id: number;
  contactId: string;
  leadId: string | null;
  visitorId: string | null;
  sessionId: string | null;
  sourceDomain: string;
  landingPath: string | null;
  submittedPath: string;
  referrer: string | null;
  firstReferrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  campaignSlug: string | null;
  locale: string | null;
  marketId: string | null;
  officeId: string | null;
  productInterest: string | null;
  metadata: unknown;
  createdAt: string;
};

export type StoredContactEvent = {
  id: number;
  contactId: string;
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

type InsertLeadOptions = {
  blockedReason?: string;
  status?: LeadStatus;
  visitorContext?: VisitorCaptureData | null;
};

type ContactIdentityInput = {
  type: "email" | "phone";
  value: string;
  normalizedValue: string;
};

export class LeadStoreNotConfiguredError extends Error {
  constructor() {
    super("DATABASE_URL is not configured.");
  }
}

export async function insertLead(lead: ValidLead, options?: InsertLeadOptions) {
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

    if (status !== "spam") {
      await upsertContactForLead(tx, sql.json, lead, options?.visitorContext ?? null);
    }
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

  const [events, [source]] = await Promise.all([
    sql`
      select *
      from lead_events
      where lead_id = ${id}
      order by created_at desc
    `,
    sql`
      select *
      from contact_sources
      where lead_id = ${id}
      order by created_at desc
      limit 1
    `,
  ]);

  const contactId = nullableString(source?.contact_id);
  const [contactRows, identityRows, consentRows, contactEventRows] = contactId
    ? await Promise.all([
        sql`select * from contacts where id = ${contactId} limit 1`,
        sql`
          select *
          from contact_identities
          where contact_id = ${contactId}
          order by created_at asc
        `,
        sql`
          select *
          from contact_consents
          where contact_id = ${contactId}
          order by occurred_at desc
          limit 20
        `,
        sql`
          select *
          from contact_events
          where contact_id = ${contactId}
          order by created_at desc
          limit 20
        `,
      ])
    : [[], [], [], []];

  return {
    lead: mapLeadRow(lead),
    events: events.map(mapLeadEventRow),
    contact: contactRows[0] ? mapContactRow(contactRows[0]) : null,
    contactSource: source ? mapContactSourceRow(source) : null,
    contactIdentities: identityRows.map(mapContactIdentityRow),
    contactConsents: consentRows.map(mapContactConsentRow),
    contactEvents: contactEventRows.map(mapContactEventRow),
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

async function upsertContactForLead(
  tx: postgres.TransactionSql,
  json: (value: postgres.JSONValue) => postgres.Parameter,
  lead: ValidLead,
  visitorContext: VisitorCaptureData | null,
) {
  const identities = getContactIdentities(lead);
  const existingContactId = await findExistingContactId(tx, identities);
  const contactId = existingContactId ?? crypto.randomUUID();
  const preferredLanguage = getPreferredLanguage(visitorContext);
  const primaryOfficeId = lead.officePreference ?? visitorContext?.officeId ?? null;
  const sourceMetadata = compactMetadata({
    source: "quote_form",
    preferredContact: lead.preferredContact,
    fillTimeMs: lead.fillTimeMs,
    suspiciousReason: lead.suspiciousReason,
    eventName: visitorContext?.eventName,
    productId: visitorContext?.productId,
    storySlug: visitorContext?.storySlug,
    timezone: visitorContext?.timezone,
    browserLanguage: visitorContext?.browserLanguage,
    browserLanguages: visitorContext?.browserLanguages,
    screenWidth: visitorContext?.screenWidth,
    screenHeight: visitorContext?.screenHeight,
    viewportWidth: visitorContext?.viewportWidth,
    viewportHeight: visitorContext?.viewportHeight,
    visitorMetadata: visitorContext?.metadata,
  });

  await tx`
    insert into contacts (
      id,
      full_name,
      preferred_language,
      primary_office_id,
      lifecycle_stage,
      first_seen_at,
      last_seen_at
    )
    values (
      ${contactId},
      ${lead.name},
      ${preferredLanguage},
      ${primaryOfficeId},
      'lead',
      ${lead.receivedAt},
      ${lead.receivedAt}
    )
    on conflict (id) do update
    set
      full_name = excluded.full_name,
      preferred_language = coalesce(excluded.preferred_language, contacts.preferred_language),
      primary_office_id = coalesce(excluded.primary_office_id, contacts.primary_office_id),
      lifecycle_stage = case
        when contacts.lifecycle_stage in ('customer', 'do_not_contact', 'spam') then contacts.lifecycle_stage
        else 'lead'
      end,
      last_seen_at = excluded.last_seen_at,
      updated_at = now()
  `;

  for (const identity of identities) {
    await tx`
      insert into contact_identities (
        contact_id,
        identity_type,
        value,
        normalized_value,
        status
      )
      values (
        ${contactId},
        ${identity.type},
        ${identity.value},
        ${identity.normalizedValue},
        'active'
      )
      on conflict (identity_type, normalized_value) do update
      set
        value = excluded.value,
        status = case
          when contact_identities.status = 'suppressed' then contact_identities.status
          else 'active'
        end,
        updated_at = now()
    `;
  }

  await tx`
    insert into contact_sources (
      contact_id,
      lead_id,
      visitor_id,
      session_id,
      source_domain,
      landing_path,
      submitted_path,
      referrer,
      first_referrer,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      campaign_slug,
      locale,
      market_id,
      office_id,
      product_interest,
      metadata
    )
    values (
      ${contactId},
      ${lead.requestId},
      ${visitorContext?.visitorId ?? null},
      ${visitorContext?.sessionId ?? null},
      ${visitorContext?.sourceDomain ?? lead.sourceDomain},
      ${visitorContext?.landingPath ?? null},
      ${visitorContext?.path ?? lead.sourcePath},
      ${visitorContext?.referrer ?? lead.referrer ?? null},
      ${visitorContext?.firstReferrer ?? null},
      ${visitorContext?.utmSource ?? lead.utmSource ?? null},
      ${visitorContext?.utmMedium ?? lead.utmMedium ?? null},
      ${visitorContext?.utmCampaign ?? lead.utmCampaign ?? null},
      ${visitorContext?.utmTerm ?? lead.utmTerm ?? null},
      ${visitorContext?.utmContent ?? lead.utmContent ?? null},
      ${visitorContext?.campaignSlug ?? lead.campaignSlug ?? null},
      ${visitorContext?.locale ?? null},
      ${visitorContext?.marketId ?? null},
      ${visitorContext?.officeId ?? null},
      ${lead.productInterest},
      ${json(sourceMetadata as postgres.JSONValue)}
    )
  `;

  await recordContactConsent(tx, json, lead, contactId, "email", lead.email ? "opted_in" : null);
  await recordContactConsent(tx, json, lead, contactId, "phone", lead.phone ? "opted_in" : null);
  await recordContactConsent(
    tx,
    json,
    lead,
    contactId,
    "sms",
    lead.phone ? (lead.smsConsentAccepted ? "opted_in" : "unknown") : null,
  );

  await tx`
    insert into contact_events (
      contact_id,
      lead_id,
      event_type,
      metadata
    )
    values (
      ${contactId},
      ${lead.requestId},
      'quote_lead_submitted',
      ${json(sourceMetadata as postgres.JSONValue)}
    )
  `;

  if (visitorContext) {
    await tx`
      update visitor_sessions
      set contact_id = ${contactId}, updated_at = now()
      where visitor_id = ${visitorContext.visitorId}
        and session_id = ${visitorContext.sessionId}
    `;
    await tx`
      update visitor_events
      set contact_id = ${contactId}
      where visitor_id = ${visitorContext.visitorId}
        and session_id = ${visitorContext.sessionId}
        and contact_id is null
    `;
  }
}

async function findExistingContactId(
  tx: postgres.TransactionSql,
  identities: ContactIdentityInput[],
) {
  const email = identities.find((identity) => identity.type === "email");
  const phone = identities.find((identity) => identity.type === "phone");
  let rows: postgres.Row[] = [];

  if (email && phone) {
    rows = await tx`
      select contact_id
      from contact_identities
      where (identity_type = 'email' and normalized_value = ${email.normalizedValue})
         or (identity_type = 'phone' and normalized_value = ${phone.normalizedValue})
      order by case when identity_type = 'email' then 0 else 1 end
      limit 1
    `;
  } else if (email) {
    rows = await tx`
      select contact_id
      from contact_identities
      where identity_type = 'email' and normalized_value = ${email.normalizedValue}
      limit 1
    `;
  } else if (phone) {
    rows = await tx`
      select contact_id
      from contact_identities
      where identity_type = 'phone' and normalized_value = ${phone.normalizedValue}
      limit 1
    `;
  }

  return nullableString(rows[0]?.contact_id);
}

async function recordContactConsent(
  tx: postgres.TransactionSql,
  json: (value: postgres.JSONValue) => postgres.Parameter,
  lead: ValidLead,
  contactId: string,
  channel: "email" | "phone" | "sms",
  status: "opted_in" | "unknown" | null,
) {
  if (!status) return;

  const consentText = channel === "sms" ? consentCopy.sms : consentCopy.contact;
  await tx`
    insert into contact_consents (
      contact_id,
      lead_id,
      channel,
      purpose,
      status,
      consent_copy_version,
      consent_copy,
      source_domain,
      source_path,
      ip,
      user_agent,
      metadata
    )
    values (
      ${contactId},
      ${lead.requestId},
      ${channel},
      'lead_followup',
      ${status},
      ${lead.consentCopyVersion},
      ${consentText},
      ${lead.sourceDomain},
      ${lead.sourcePath},
      ${lead.ip ?? null},
      ${lead.userAgent ?? null},
      ${json({ preferredContact: lead.preferredContact } as postgres.JSONValue)}
    )
  `;
}

function getContactIdentities(lead: ValidLead): ContactIdentityInput[] {
  return [
    lead.email
      ? {
          type: "email" as const,
          value: lead.email,
          normalizedValue: lead.email.trim().toLowerCase(),
        }
      : null,
    lead.phone
      ? {
          type: "phone" as const,
          value: lead.phone,
          normalizedValue: lead.phone.replace(/\D+/g, ""),
        }
      : null,
  ].filter((identity): identity is ContactIdentityInput => Boolean(identity?.normalizedValue));
}

function getPreferredLanguage(visitorContext: VisitorCaptureData | null) {
  const locale = visitorContext?.locale;
  if (!locale) return null;
  return locale.startsWith("zh") ? "zh-Hans" : locale;
}

function compactMetadata(value: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(value).filter(([, item]) => item !== undefined && item !== null && item !== ""),
  );
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

function mapContactRow(row: Record<string, unknown>): StoredContact {
  return {
    id: String(row.id),
    fullName: nullableString(row.full_name),
    preferredLanguage: nullableString(row.preferred_language),
    primaryOfficeId: nullableString(row.primary_office_id),
    lifecycleStage: String(row.lifecycle_stage),
    firstSeenAt: toIso(row.first_seen_at),
    lastSeenAt: toIso(row.last_seen_at),
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
  };
}

function mapContactIdentityRow(row: Record<string, unknown>): StoredContactIdentity {
  return {
    id: Number(row.id),
    contactId: String(row.contact_id),
    identityType: row.identity_type as "email" | "phone",
    value: String(row.value),
    normalizedValue: String(row.normalized_value),
    status: String(row.status),
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
  };
}

function mapContactConsentRow(row: Record<string, unknown>): StoredContactConsent {
  return {
    id: Number(row.id),
    contactId: String(row.contact_id),
    leadId: nullableString(row.lead_id),
    channel: row.channel as "email" | "phone" | "sms",
    purpose: String(row.purpose),
    status: String(row.status),
    consentCopyVersion: String(row.consent_copy_version),
    consentCopy: String(row.consent_copy),
    sourceDomain: String(row.source_domain),
    sourcePath: String(row.source_path),
    ip: nullableString(row.ip),
    userAgent: nullableString(row.user_agent),
    occurredAt: toIso(row.occurred_at),
    metadata: row.metadata,
  };
}

function mapContactSourceRow(row: Record<string, unknown>): StoredContactSource {
  return {
    id: Number(row.id),
    contactId: String(row.contact_id),
    leadId: nullableString(row.lead_id),
    visitorId: nullableString(row.visitor_id),
    sessionId: nullableString(row.session_id),
    sourceDomain: String(row.source_domain),
    landingPath: nullableString(row.landing_path),
    submittedPath: String(row.submitted_path),
    referrer: nullableString(row.referrer),
    firstReferrer: nullableString(row.first_referrer),
    utmSource: nullableString(row.utm_source),
    utmMedium: nullableString(row.utm_medium),
    utmCampaign: nullableString(row.utm_campaign),
    utmTerm: nullableString(row.utm_term),
    utmContent: nullableString(row.utm_content),
    campaignSlug: nullableString(row.campaign_slug),
    locale: nullableString(row.locale),
    marketId: nullableString(row.market_id),
    officeId: nullableString(row.office_id),
    productInterest: nullableString(row.product_interest),
    metadata: row.metadata,
    createdAt: toIso(row.created_at),
  };
}

function mapContactEventRow(row: Record<string, unknown>): StoredContactEvent {
  return {
    id: Number(row.id),
    contactId: String(row.contact_id),
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
