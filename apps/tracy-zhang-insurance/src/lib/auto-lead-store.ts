import {
  getAutoLeadFeeCents,
  type AutoLeadStatus,
  type AutoLeadPaymentStatus,
  type ValidAutoLead,
} from "@insurance-websites/lead-capture";

import { getSql } from "@/lib/db";

export type StoredAutoLead = {
  id: string;
  status: AutoLeadStatus;
  paymentStatus: AutoLeadPaymentStatus;
  receivedAt: string;
  submitterId: string;
  submitterName: string;
  submitterEmail: string;
  submitterPhone: string | null;
  submitterEntityType: string | null;
  prospectName: string;
  prospectPhone: string;
  prospectEmail: string | null;
  residentialAddress: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  preferredContactMethod: string | null;
  preferredContactTime: string | null;
  consentObtainedAt: string;
  consentMethod: string;
  consentProofNotes: string | null;
  presentInterest: boolean;
  vehicleYear: string | null;
  vehicleMake: string | null;
  vehicleModel: string | null;
  vehicleTrim: string | null;
  vin: string | null;
  garagingAddress: string | null;
  garagingZip: string | null;
  ownershipStatus: string | null;
  primaryUse: string | null;
  annualMileage: string | null;
  commuteDistance: string | null;
  currentlyInsured: string | null;
  currentCarrier: string | null;
  primaryDriverName: string;
  primaryDriverDob: string | null;
  primaryDriverLicenseState: string | null;
  primaryDriverLicenseStatus: string | null;
  otherRegularDrivers: string | null;
  otherRegularDriverNames: string | null;
  drivingHistoryDisclosure: string | null;
  desiredTiming: string | null;
  currentPolicyExpiration: string | null;
  shoppingReason: string | null;
  coveragePreference: string | null;
  coveragePreferenceOther: string | null;
  sourceUrl: string | null;
  campaignId: string | null;
  sourceDomain: string;
  sourcePath: string;
  referrer: string | null;
  utmCampaign: string | null;
  formVersion: string;
  consentCertificationVersion: string;
  certifications: unknown;
  submissionMetadata: unknown;
  suspiciousReason: string | null;
  blockedReason: string | null;
  acceptedAt: string | null;
  revokedAt: string | null;
  rejectionReason: string | null;
  revocationReason: string | null;
  ladderPosition: number | null;
  qualifiedLeadFeeCents: number | null;
  createdAt: string;
  updatedAt: string;
};

export type AutoLeadEvent = {
  id: number;
  leadId: string | null;
  eventType: string;
  eventBody: string | null;
  metadata: unknown;
  createdAt: string;
};

type EventMetadataValue =
  | null
  | string
  | number
  | boolean
  | Date
  | readonly EventMetadataValue[]
  | { readonly [key: string]: EventMetadataValue | undefined };

type EventMetadata = {
  readonly [key: string]: EventMetadataValue | undefined;
};

export class AutoLeadStoreNotConfiguredError extends Error {
  constructor() {
    super("DATABASE_URL is not configured.");
  }
}

export async function insertAutoLead(
  lead: ValidAutoLead,
  options?: { blockedReason?: string; status?: AutoLeadStatus },
) {
  const sql = getRequiredSql();
  const status = options?.status ?? "submitted";
  const paymentStatus: AutoLeadPaymentStatus =
    status === "submitted" ? "pending_review" : "not_eligible";

  await sql.begin(async (tx) => {
    await tx`
      insert into auto_leads (
        id,
        status,
        payment_status,
        received_at,
        submitter_id,
        submitter_name,
        submitter_email,
        submitter_phone,
        submitter_entity_type,
        prospect_name,
        prospect_phone,
        prospect_email,
        residential_address,
        city,
        state,
        zip,
        preferred_contact_method,
        preferred_contact_time,
        consent_obtained_at,
        consent_method,
        consent_proof_notes,
        consent_certified,
        consent_certification_version,
        present_interest,
        vehicle_year,
        vehicle_make,
        vehicle_model,
        vehicle_trim,
        vin,
        garaging_address,
        garaging_zip,
        ownership_status,
        primary_use,
        annual_mileage,
        commute_distance,
        currently_insured,
        current_carrier,
        primary_driver_name,
        primary_driver_dob,
        primary_driver_license_state,
        primary_driver_license_status,
        other_regular_drivers,
        other_regular_driver_names,
        driving_history_disclosure,
        desired_timing,
        current_policy_expiration,
        shopping_reason,
        coverage_preference,
        coverage_preference_other,
        source_url,
        campaign_id,
        source_domain,
        source_path,
        referrer,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content,
        user_agent,
        ip,
        form_version,
        certifications,
        submission_metadata,
        suspicious_reason,
        blocked_reason
      )
      values (
        ${lead.requestId},
        ${status},
        ${paymentStatus},
        ${lead.receivedAt},
        ${lead.submitterId},
        ${lead.submitterName},
        ${lead.submitterEmail},
        ${lead.submitterPhone ?? null},
        ${lead.submitterEntityType ?? null},
        ${lead.prospectName},
        ${lead.prospectPhone},
        ${lead.prospectEmail ?? null},
        ${lead.residentialAddress ?? null},
        ${lead.city ?? null},
        ${lead.state ?? null},
        ${lead.zip ?? null},
        ${lead.preferredContactMethod ?? null},
        ${lead.preferredContactTime ?? null},
        ${lead.consentObtainedAt},
        ${lead.consentMethod},
        ${lead.consentProofNotes ?? null},
        ${lead.consentCertified},
        ${lead.consentCertificationVersion},
        ${lead.presentInterest},
        ${lead.vehicleYear ?? null},
        ${lead.vehicleMake ?? null},
        ${lead.vehicleModel ?? null},
        ${lead.vehicleTrim ?? null},
        ${lead.vin ?? null},
        ${lead.garagingAddress ?? null},
        ${lead.garagingZip ?? null},
        ${lead.ownershipStatus ?? null},
        ${lead.primaryUse ?? null},
        ${lead.annualMileage ?? null},
        ${lead.commuteDistance ?? null},
        ${lead.currentlyInsured ?? null},
        ${lead.currentCarrier ?? null},
        ${lead.primaryDriverName},
        ${lead.primaryDriverDob ?? null},
        ${lead.primaryDriverLicenseState ?? null},
        ${lead.primaryDriverLicenseStatus ?? null},
        ${lead.otherRegularDrivers ?? null},
        ${lead.otherRegularDriverNames ?? null},
        ${lead.drivingHistoryDisclosure ?? null},
        ${lead.desiredTiming ?? null},
        ${lead.currentPolicyExpiration ?? null},
        ${lead.shoppingReason ?? null},
        ${lead.coveragePreference ?? null},
        ${lead.coveragePreferenceOther ?? null},
        ${lead.sourceUrl ?? null},
        ${lead.campaignId ?? null},
        ${lead.sourceDomain},
        ${lead.sourcePath},
        ${lead.referrer ?? null},
        ${lead.utmSource ?? null},
        ${lead.utmMedium ?? null},
        ${lead.utmCampaign ?? null},
        ${lead.utmTerm ?? null},
        ${lead.utmContent ?? null},
        ${lead.userAgent ?? null},
        ${lead.ip ?? null},
        ${lead.formVersion},
        ${sql.json(lead.certifications)},
        ${sql.json({
          fillTimeMs: lead.fillTimeMs,
          source: "auto_lead_intake",
        })},
        ${lead.suspiciousReason ?? null},
        ${options?.blockedReason ?? null}
      )
    `;

    await tx`
      insert into auto_lead_events (lead_id, event_type, metadata)
      values (
        ${lead.requestId},
        ${status === "submitted" ? "lead_submitted" : "lead_blocked"},
        ${sql.json({
          status,
          paymentStatus,
          blockedReason: options?.blockedReason,
          formVersion: lead.formVersion,
          consentCertificationVersion: lead.consentCertificationVersion,
        })}
      )
    `;
  });
}

export async function recordAutoLeadEvent(input: {
  leadId?: string;
  eventType: string;
  eventBody?: string;
  metadata?: EventMetadata;
}) {
  const sql = getRequiredSql();
  await sql`
    insert into auto_lead_events (lead_id, event_type, event_body, metadata)
    values (
      ${input.leadId ?? null},
      ${input.eventType},
      ${input.eventBody ?? null},
      ${sql.json(input.metadata ?? {})}
    )
  `;
}

export async function listAutoLeads(filters?: {
  status?: AutoLeadStatus;
  limit?: number;
}) {
  const sql = getRequiredSql();
  const limit = Math.min(Math.max(filters?.limit ?? 75, 1), 150);

  const rows =
    filters?.status
      ? await sql`
          select *
          from auto_leads
          where status = ${filters.status}
          order by created_at desc
          limit ${limit}
        `
      : await sql`
          select *
          from auto_leads
          order by created_at desc
          limit ${limit}
        `;

  return rows.map(mapAutoLeadRow);
}

export async function getAutoLeadDetail(id: string) {
  const sql = getRequiredSql();
  const [lead] = await sql`select * from auto_leads where id = ${id} limit 1`;
  if (!lead) return null;

  const events = await sql`
    select *
    from auto_lead_events
    where lead_id = ${id}
    order by created_at desc
  `;

  return {
    lead: mapAutoLeadRow(lead),
    events: events.map(mapAutoLeadEventRow),
  };
}

export async function updateAutoLeadStatus(input: {
  id: string;
  status: AutoLeadStatus;
  note?: string;
}) {
  const sql = getRequiredSql();
  const note = input.note?.trim();

  await sql.begin(async (tx) => {
    const [existing] = await tx`
      select *
      from auto_leads
      where id = ${input.id}
      limit 1
      for update
    `;
    if (!existing) return;

    const lead = mapAutoLeadRow(existing);

    if (input.status === "accepted_qualified_lead") {
      const [countRow] = await tx`
        select count(*)::int as count
        from auto_leads
        where submitter_id = ${lead.submitterId}
          and id <> ${input.id}
          and status = 'accepted_qualified_lead'
          and revoked_at is null
      `;
      const ladderPosition = Number(countRow?.count ?? 0) + 1;
      const feeCents = getAutoLeadFeeCents(ladderPosition);

      await tx`
        update auto_leads
        set
          status = ${input.status},
          payment_status = 'eligible_for_qualified_lead_fee',
          accepted_at = coalesce(accepted_at, now()),
          revoked_at = null,
          ladder_position = ${ladderPosition},
          qualified_lead_fee_cents = ${feeCents},
          updated_at = now()
        where id = ${input.id}
      `;

      await tx`
        insert into auto_lead_events (lead_id, event_type, event_body, metadata)
        values (
          ${input.id},
          'status_updated',
          ${note ?? null},
          ${sql.json({
            status: input.status,
            paymentStatus: "eligible_for_qualified_lead_fee",
            ladderPosition,
            qualifiedLeadFeeCents: feeCents,
          })}
        )
      `;
      return;
    }

    if (input.status === "revoked") {
      const paymentStatus =
        lead.paymentStatus === "paid" ? "revoked_after_payment" : "revoked_before_payment";

      await tx`
        update auto_leads
        set
          status = ${input.status},
          payment_status = ${paymentStatus},
          revoked_at = now(),
          revocation_reason = ${note ?? null},
          updated_at = now()
        where id = ${input.id}
      `;

      await tx`
        insert into auto_lead_events (lead_id, event_type, event_body, metadata)
        values (
          ${input.id},
          'status_updated',
          ${note ?? null},
          ${sql.json({ status: input.status, paymentStatus })}
        )
      `;
      return;
    }

    const notEligibleStatuses: AutoLeadStatus[] = [
      "rejected",
      "duplicate",
      "invalid_lead",
      "not_interested",
    ];
    const nextPaymentStatus = notEligibleStatuses.includes(input.status)
      ? "not_eligible"
      : lead.paymentStatus;

    await tx`
      update auto_leads
      set
        status = ${input.status},
        payment_status = ${nextPaymentStatus},
        rejection_reason = ${
          notEligibleStatuses.includes(input.status) ? (note ?? lead.rejectionReason) : lead.rejectionReason
        },
        updated_at = now()
      where id = ${input.id}
    `;

    await tx`
      insert into auto_lead_events (lead_id, event_type, event_body, metadata)
      values (
        ${input.id},
        'status_updated',
        ${note ?? null},
        ${sql.json({ status: input.status, paymentStatus: nextPaymentStatus })}
      )
    `;
  });
}

export async function addAutoLeadNote(id: string, note: string) {
  const trimmed = note.trim();
  if (!trimmed) return;
  await recordAutoLeadEvent({
    leadId: id,
    eventType: "admin_note",
    eventBody: trimmed,
  });
}

function getRequiredSql() {
  const sql = getSql();
  if (!sql) throw new AutoLeadStoreNotConfiguredError();
  return sql;
}

function mapAutoLeadRow(row: Record<string, unknown>): StoredAutoLead {
  return {
    id: String(row.id),
    status: row.status as AutoLeadStatus,
    paymentStatus: row.payment_status as AutoLeadPaymentStatus,
    receivedAt: toIso(row.received_at),
    submitterId: String(row.submitter_id),
    submitterName: String(row.submitter_name),
    submitterEmail: String(row.submitter_email),
    submitterPhone: nullableString(row.submitter_phone),
    submitterEntityType: nullableString(row.submitter_entity_type),
    prospectName: String(row.prospect_name),
    prospectPhone: String(row.prospect_phone),
    prospectEmail: nullableString(row.prospect_email),
    residentialAddress: nullableString(row.residential_address),
    city: nullableString(row.city),
    state: nullableString(row.state),
    zip: nullableString(row.zip),
    preferredContactMethod: nullableString(row.preferred_contact_method),
    preferredContactTime: nullableString(row.preferred_contact_time),
    consentObtainedAt: String(row.consent_obtained_at),
    consentMethod: String(row.consent_method),
    consentProofNotes: nullableString(row.consent_proof_notes),
    presentInterest: Boolean(row.present_interest),
    vehicleYear: nullableString(row.vehicle_year),
    vehicleMake: nullableString(row.vehicle_make),
    vehicleModel: nullableString(row.vehicle_model),
    vehicleTrim: nullableString(row.vehicle_trim),
    vin: nullableString(row.vin),
    garagingAddress: nullableString(row.garaging_address),
    garagingZip: nullableString(row.garaging_zip),
    ownershipStatus: nullableString(row.ownership_status),
    primaryUse: nullableString(row.primary_use),
    annualMileage: nullableString(row.annual_mileage),
    commuteDistance: nullableString(row.commute_distance),
    currentlyInsured: nullableString(row.currently_insured),
    currentCarrier: nullableString(row.current_carrier),
    primaryDriverName: String(row.primary_driver_name),
    primaryDriverDob: nullableString(row.primary_driver_dob),
    primaryDriverLicenseState: nullableString(row.primary_driver_license_state),
    primaryDriverLicenseStatus: nullableString(row.primary_driver_license_status),
    otherRegularDrivers: nullableString(row.other_regular_drivers),
    otherRegularDriverNames: nullableString(row.other_regular_driver_names),
    drivingHistoryDisclosure: nullableString(row.driving_history_disclosure),
    desiredTiming: nullableString(row.desired_timing),
    currentPolicyExpiration: nullableString(row.current_policy_expiration),
    shoppingReason: nullableString(row.shopping_reason),
    coveragePreference: nullableString(row.coverage_preference),
    coveragePreferenceOther: nullableString(row.coverage_preference_other),
    sourceUrl: nullableString(row.source_url),
    campaignId: nullableString(row.campaign_id),
    sourceDomain: String(row.source_domain),
    sourcePath: String(row.source_path),
    referrer: nullableString(row.referrer),
    utmCampaign: nullableString(row.utm_campaign),
    formVersion: String(row.form_version),
    consentCertificationVersion: String(row.consent_certification_version),
    certifications: row.certifications,
    submissionMetadata: row.submission_metadata,
    suspiciousReason: nullableString(row.suspicious_reason),
    blockedReason: nullableString(row.blocked_reason),
    acceptedAt: nullableIso(row.accepted_at),
    revokedAt: nullableIso(row.revoked_at),
    rejectionReason: nullableString(row.rejection_reason),
    revocationReason: nullableString(row.revocation_reason),
    ladderPosition: nullableNumber(row.ladder_position),
    qualifiedLeadFeeCents: nullableNumber(row.qualified_lead_fee_cents),
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
  };
}

function mapAutoLeadEventRow(row: Record<string, unknown>): AutoLeadEvent {
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

function nullableNumber(value: unknown) {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "string" && value.length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function nullableIso(value: unknown) {
  if (value === null || value === undefined) return null;
  return toIso(value);
}

function toIso(value: unknown) {
  if (value instanceof Date) return value.toISOString();
  return String(value);
}
