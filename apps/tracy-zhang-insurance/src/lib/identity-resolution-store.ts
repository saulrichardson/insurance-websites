import { createHash, randomUUID } from "node:crypto";
import type postgres from "postgres";

import { getSql } from "@/lib/db";
import type { VisitorCaptureData } from "@/lib/visitor-data";

type RequestContext = {
  userAgent?: string;
  ip?: string;
};

type ProviderConfig = {
  provider: string;
  endpoint?: string;
  apiKey?: string;
  minAcceptedConfidence: number;
};

type ProviderMatch = {
  matchType: "person" | "household" | "company" | "unknown";
  confidence?: number;
  fullName?: string;
  email?: string;
  phone?: string;
  company?: string;
  providerContactId?: string;
  address?: PostalAddress;
  raw: Record<string, unknown>;
};

type PostalAddress = {
  line1?: string;
  line2?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
};

export type IdentityResolutionRequestRow = {
  id: string;
  visitorId: string;
  sessionId: string;
  eventName: string;
  provider: string;
  status: string;
  sourceDomain: string;
  path: string;
  landingPath: string | null;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
};

export type IdentityMatchRow = {
  id: number;
  requestId: string;
  contactId: string | null;
  visitorId: string;
  sessionId: string;
  provider: string;
  providerContactId: string | null;
  matchType: string;
  confidence: number | null;
  status: string;
  fullName: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  sourceDomain: string;
  path: string;
  contactName: string | null;
  createdAt: string;
};

export async function resolveVisitorIdentity(
  input: VisitorCaptureData,
  requestContext: RequestContext,
) {
  const sql = getSql();
  if (!sql) return { status: "skipped" as const, reason: "database_not_configured" };

  const token = input.identityToken?.trim();
  if (token) {
    return resolveKnownContactToken(sql, input, requestContext, token);
  }

  const existing = await findExistingSessionResolution(sql, input.sessionId);
  if (existing) {
    return { status: "skipped" as const, reason: "session_already_resolved", requestId: existing.id };
  }

  const config = getProviderConfig();
  const requestPayload = createRequestPayload(input, requestContext);
  if (!config.endpoint) {
    const requestId = randomUUID();
    await sql`
      insert into identity_resolution_requests (
        id,
        visitor_id,
        session_id,
        event_name,
        provider,
        status,
        source_domain,
        path,
        landing_path,
        request_payload
      )
      values (
        ${requestId},
        ${input.visitorId},
        ${input.sessionId},
        ${input.eventName},
        'not_configured',
        'skipped',
        ${input.sourceDomain},
        ${input.path},
        ${input.landingPath ?? null},
        ${sql.json(requestPayload as postgres.JSONValue)}
      )
    `;
    return { status: "skipped" as const, reason: "provider_not_configured", requestId };
  }

  const requestId = randomUUID();
  await sql`
    insert into identity_resolution_requests (
      id,
      visitor_id,
      session_id,
      event_name,
      provider,
      status,
      source_domain,
      path,
      landing_path,
      request_payload
    )
    values (
      ${requestId},
      ${input.visitorId},
      ${input.sessionId},
      ${input.eventName},
      ${config.provider},
      'queued',
      ${input.sourceDomain},
      ${input.path},
      ${input.landingPath ?? null},
      ${sql.json(requestPayload as postgres.JSONValue)}
    )
  `;

  try {
    const responsePayload = await callIdentityProvider(config, requestPayload);
    const matches = parseProviderMatches(responsePayload);
    if (matches.length === 0) {
      await markRequestComplete(sql, requestId, "no_match", responsePayload);
      return { status: "no_match" as const, requestId, matches: 0 };
    }

    await sql.begin(async (tx) => {
      for (const match of matches) {
        await storeProviderMatch(tx, sql.json, requestId, config, input, match);
      }
      await tx`
        update identity_resolution_requests
        set status = 'matched',
        response_payload = ${sql.json(toJsonValue(responsePayload))},
          updated_at = now()
        where id = ${requestId}
      `;
    });

    return { status: "matched" as const, requestId, matches: matches.length };
  } catch (error) {
    await sql`
      update identity_resolution_requests
      set status = 'error',
        error_message = ${error instanceof Error ? error.message : "Unknown identity provider error"},
        updated_at = now()
      where id = ${requestId}
    `;
    return { status: "error" as const, requestId };
  }
}

export async function getIdentityCaptureAdminData(limit = 75) {
  const sql = getSql();
  if (!sql) {
    return {
      configured: false,
      provider: getProviderSummary(),
      requests: [] as IdentityResolutionRequestRow[],
      matches: [] as IdentityMatchRow[],
    };
  }

  const safeLimit = Math.min(Math.max(limit, 1), 200);
  const [requestRows, matchRows] = await Promise.all([
    sql`
      select *
      from identity_resolution_requests
      order by created_at desc
      limit ${safeLimit}
    `,
    sql`
      select
        im.*,
        c.full_name as contact_name
      from identity_matches im
      left join contacts c on c.id = im.contact_id
      order by im.created_at desc
      limit ${safeLimit}
    `,
  ]);

  return {
    configured: true,
    provider: getProviderSummary(),
    requests: requestRows.map(mapRequestRow),
    matches: matchRows.map(mapMatchRow),
  };
}

export function hashIdentityToken(token: string) {
  return createHash("sha256").update(token.trim()).digest("hex");
}

async function resolveKnownContactToken(
  sql: NonNullable<ReturnType<typeof getSql>>,
  input: VisitorCaptureData,
  requestContext: RequestContext,
  token: string,
) {
  const tokenHash = hashIdentityToken(token);
  const requestPayload = {
    ...createRequestPayload(input, requestContext),
    identityTokenHash: tokenHash,
  };
  const requestId = randomUUID();

  const [tokenRow] = await sql`
    select kct.*, c.full_name
    from known_contact_tokens kct
    join contacts c on c.id = kct.contact_id
    where kct.token_hash = ${tokenHash}
      and (kct.expires_at is null or kct.expires_at > now())
    limit 1
  `;

  if (!tokenRow) {
    await sql`
      insert into identity_resolution_requests (
        id,
        visitor_id,
        session_id,
        event_name,
        provider,
        status,
        source_domain,
        path,
        landing_path,
        request_payload
      )
      values (
        ${requestId},
        ${input.visitorId},
        ${input.sessionId},
        ${input.eventName},
        'known_contact_token',
        'no_match',
        ${input.sourceDomain},
        ${input.path},
        ${input.landingPath ?? null},
        ${sql.json(requestPayload as postgres.JSONValue)}
      )
    `;
    return { status: "no_match" as const, requestId };
  }

  const contactId = String(tokenRow.contact_id);
  await sql.begin(async (tx) => {
    await tx`
      insert into identity_resolution_requests (
        id,
        visitor_id,
        session_id,
        event_name,
        provider,
        status,
        source_domain,
        path,
        landing_path,
        request_payload,
        response_payload
      )
      values (
        ${requestId},
        ${input.visitorId},
        ${input.sessionId},
        ${input.eventName},
        'known_contact_token',
        'matched',
        ${input.sourceDomain},
        ${input.path},
        ${input.landingPath ?? null},
        ${sql.json(requestPayload as postgres.JSONValue)},
        ${sql.json({ contactId, tokenLabel: tokenRow.label ?? null })}
      )
    `;
    await tx`
      update known_contact_tokens
      set last_seen_at = now(), updated_at = now()
      where id = ${String(tokenRow.id)}
    `;
    await linkContactToVisit(tx, sql.json, input, contactId, {
      provider: "known_contact_token",
      matchType: "person",
      confidence: 1,
      status: "accepted",
      metadata: { tokenLabel: tokenRow.label ?? null, channel: tokenRow.channel ?? null },
    });
    await tx`
      insert into identity_matches (
        request_id,
        contact_id,
        visitor_id,
        session_id,
        provider,
        match_type,
        confidence,
        status,
        full_name,
        source_domain,
        path,
        raw_match
      )
      values (
        ${requestId},
        ${contactId},
        ${input.visitorId},
        ${input.sessionId},
        'known_contact_token',
        'person',
        ${1},
        'accepted',
        ${nullableString(tokenRow.full_name)},
        ${input.sourceDomain},
        ${input.path},
        ${sql.json({ tokenLabel: tokenRow.label ?? null })}
      )
    `;
  });

  return { status: "matched" as const, requestId, contactId };
}

async function storeProviderMatch(
  tx: postgres.TransactionSql,
  json: (value: postgres.JSONValue) => postgres.Parameter,
  requestId: string,
  config: ProviderConfig,
  input: VisitorCaptureData,
  match: ProviderMatch,
) {
  const contactId = await upsertContactFromMatch(tx, json, input, match);
  const status =
    typeof match.confidence === "number" && match.confidence < config.minAcceptedConfidence
      ? "candidate"
      : "accepted";

  await tx`
    insert into identity_matches (
      request_id,
      contact_id,
      visitor_id,
      session_id,
      provider,
      provider_contact_id,
      match_type,
      confidence,
      status,
      full_name,
      email,
      phone,
      address,
      company,
      source_domain,
      path,
      raw_match
    )
    values (
      ${requestId},
      ${contactId},
      ${input.visitorId},
      ${input.sessionId},
      ${config.provider},
      ${match.providerContactId ?? null},
      ${match.matchType},
      ${match.confidence ?? null},
      ${status},
      ${match.fullName ?? null},
      ${match.email ?? null},
      ${match.phone ?? null},
      ${json((match.address ?? {}) as postgres.JSONValue)},
      ${match.company ?? null},
      ${input.sourceDomain},
      ${input.path},
      ${json(match.raw as postgres.JSONValue)}
    )
  `;

  if (contactId) {
    await linkContactToVisit(tx, json, input, contactId, {
      provider: config.provider,
      matchType: match.matchType,
      confidence: match.confidence,
      status,
      metadata: {
        providerContactId: match.providerContactId,
        company: match.company,
      },
    });
  }
}

async function upsertContactFromMatch(
  tx: postgres.TransactionSql,
  json: (value: postgres.JSONValue) => postgres.Parameter,
  input: VisitorCaptureData,
  match: ProviderMatch,
) {
  const email = normalizeEmail(match.email);
  const phone = normalizePhone(match.phone);
  const contactId = await findExistingContactId(tx, email, phone) ?? randomUUID();

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
      ${match.fullName ?? match.company ?? null},
      ${input.locale ?? null},
      ${input.officeId ?? null},
      'needs_followup',
      now(),
      now()
    )
    on conflict (id) do update
    set
      full_name = coalesce(excluded.full_name, contacts.full_name),
      preferred_language = coalesce(excluded.preferred_language, contacts.preferred_language),
      primary_office_id = coalesce(excluded.primary_office_id, contacts.primary_office_id),
      lifecycle_stage = case
        when contacts.lifecycle_stage in ('customer', 'do_not_contact', 'spam') then contacts.lifecycle_stage
        else 'needs_followup'
      end,
      last_seen_at = now(),
      updated_at = now()
  `;

  if (email) {
    await tx`
      insert into contact_identities (
        contact_id,
        identity_type,
        value,
        normalized_value,
        status
      )
      values (${contactId}, 'email', ${email}, ${email}, 'active')
      on conflict (identity_type, normalized_value) do update
      set value = excluded.value, updated_at = now()
    `;
  }

  if (phone) {
    await tx`
      insert into contact_identities (
        contact_id,
        identity_type,
        value,
        normalized_value,
        status
      )
      values (${contactId}, 'phone', ${phone}, ${phone}, 'active')
      on conflict (identity_type, normalized_value) do update
      set value = excluded.value, updated_at = now()
    `;
  }

  if (hasAddress(match.address)) {
    await tx`
      insert into contact_addresses (
        contact_id,
        line1,
        line2,
        city,
        region,
        postal_code,
        country,
        source,
        confidence,
        metadata
      )
      values (
        ${contactId},
        ${match.address?.line1 ?? null},
        ${match.address?.line2 ?? null},
        ${match.address?.city ?? null},
        ${match.address?.region ?? null},
        ${match.address?.postalCode ?? null},
        ${match.address?.country ?? null},
        'identity_resolution',
        ${match.confidence ?? null},
        ${json(match.raw as postgres.JSONValue)}
      )
    `;
  }

  return contactId;
}

async function linkContactToVisit(
  tx: postgres.TransactionSql,
  json: (value: postgres.JSONValue) => postgres.Parameter,
  input: VisitorCaptureData,
  contactId: string,
  details: {
    provider: string;
    matchType: string;
    confidence?: number;
    status: string;
    metadata?: Record<string, unknown>;
  },
) {
  const metadata = compactObject({
    source: "identity_resolution",
    provider: details.provider,
    matchType: details.matchType,
    confidence: details.confidence,
    matchStatus: details.status,
    productId: input.productId,
    storySlug: input.storySlug,
    timezone: input.timezone,
    browserLanguage: input.browserLanguage,
    ...details.metadata,
  });

  await tx`
    insert into contact_sources (
      contact_id,
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
      metadata
    )
    values (
      ${contactId},
      ${input.visitorId},
      ${input.sessionId},
      ${input.sourceDomain},
      ${input.landingPath ?? input.path},
      ${input.path},
      ${input.referrer ?? null},
      ${input.firstReferrer ?? null},
      ${input.utmSource ?? null},
      ${input.utmMedium ?? null},
      ${input.utmCampaign ?? null},
      ${input.utmTerm ?? null},
      ${input.utmContent ?? null},
      ${input.campaignSlug ?? null},
      ${input.locale ?? null},
      ${input.marketId ?? null},
      ${input.officeId ?? null},
      ${json(metadata as postgres.JSONValue)}
    )
  `;
  await tx`
    update visitor_sessions
    set contact_id = ${contactId}, updated_at = now()
    where visitor_id = ${input.visitorId} and session_id = ${input.sessionId}
  `;
  await tx`
    update visitor_events
    set contact_id = ${contactId}
    where visitor_id = ${input.visitorId}
      and session_id = ${input.sessionId}
      and contact_id is null
  `;
  await tx`
    insert into contact_events (
      contact_id,
      event_type,
      metadata
    )
    values (
      ${contactId},
      'identity_match_captured',
      ${json(metadata as postgres.JSONValue)}
    )
  `;
}

async function findExistingContactId(
  tx: postgres.TransactionSql,
  email?: string,
  phone?: string,
) {
  let rows: postgres.Row[] = [];
  if (email && phone) {
    rows = await tx`
      select contact_id
      from contact_identities
      where (identity_type = 'email' and normalized_value = ${email})
         or (identity_type = 'phone' and normalized_value = ${phone})
      order by case when identity_type = 'email' then 0 else 1 end
      limit 1
    `;
  } else if (email) {
    rows = await tx`
      select contact_id
      from contact_identities
      where identity_type = 'email' and normalized_value = ${email}
      limit 1
    `;
  } else if (phone) {
    rows = await tx`
      select contact_id
      from contact_identities
      where identity_type = 'phone' and normalized_value = ${phone}
      limit 1
    `;
  }
  return nullableString(rows[0]?.contact_id);
}

async function findExistingSessionResolution(
  sql: NonNullable<ReturnType<typeof getSql>>,
  sessionId: string,
) {
  const [existing] = await sql`
    select id, status
    from identity_resolution_requests
    where session_id = ${sessionId}
    order by created_at desc
    limit 1
  `;
  return existing ? { id: String(existing.id), status: String(existing.status) } : null;
}

async function markRequestComplete(
  sql: NonNullable<ReturnType<typeof getSql>>,
  requestId: string,
  status: "matched" | "no_match" | "skipped" | "error",
  responsePayload: unknown,
) {
  await sql`
    update identity_resolution_requests
    set status = ${status},
      response_payload = ${sql.json(toJsonValue(responsePayload))},
      updated_at = now()
    where id = ${requestId}
  `;
}

async function callIdentityProvider(config: ProviderConfig, payload: Record<string, unknown>) {
  if (!config.endpoint) return {};
  const response = await fetch(config.endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(config.apiKey ? { authorization: `Bearer ${config.apiKey}` } : {}),
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(6_000),
  });

  const text = await response.text();
  const json = text ? tryParseJson(text) : {};
  if (!response.ok) {
    throw new Error(`Identity provider returned ${response.status}: ${text.slice(0, 500)}`);
  }
  return json;
}

function parseProviderMatches(responsePayload: unknown) {
  const objectPayload = coerceObject(responsePayload);
  let rawMatches: unknown[] = [];
  if (Array.isArray(responsePayload)) {
    rawMatches = responsePayload;
  } else if (Array.isArray(objectPayload?.matches)) {
    rawMatches = objectPayload.matches;
  } else if (objectPayload?.match) {
    rawMatches = [objectPayload.match];
  }

  return rawMatches
    .map(normalizeProviderMatch)
    .filter((match): match is ProviderMatch => Boolean(match));
}

function normalizeProviderMatch(raw: unknown): ProviderMatch | null {
  const value = coerceObject(raw);
  if (!value) return null;

  const email = cleanString(value.email ?? value.emailAddress ?? value.personalEmail, 320);
  const phone = cleanString(value.phone ?? value.phoneNumber ?? value.mobilePhone, 80);
  const fullName = cleanString(value.fullName ?? value.name, 240);
  const company = cleanString(value.company ?? value.companyName, 240);
  const address = normalizeAddress(value.address ?? value.postalAddress ?? value);
  if (!email && !phone && !fullName && !company && !hasAddress(address)) return null;

  return {
    matchType: normalizeMatchType(value.matchType ?? value.type),
    confidence: cleanConfidence(value.confidence ?? value.score ?? value.matchScore),
    fullName,
    email,
    phone,
    company,
    providerContactId: cleanString(value.providerContactId ?? value.id, 160),
    address,
    raw: value,
  };
}

function normalizeAddress(raw: unknown): PostalAddress | undefined {
  const value = coerceObject(raw);
  if (!value) return undefined;
  return compactObject({
    line1: cleanString(value.line1 ?? value.street ?? value.streetAddress ?? value.address1, 240),
    line2: cleanString(value.line2 ?? value.address2, 160),
    city: cleanString(value.city ?? value.addressLocality, 120),
    region: cleanString(value.region ?? value.state ?? value.addressRegion, 80),
    postalCode: cleanString(value.postalCode ?? value.zip ?? value.postal_code, 40),
    country: cleanString(value.country ?? value.addressCountry, 80),
  }) as PostalAddress;
}

function createRequestPayload(input: VisitorCaptureData, requestContext: RequestContext) {
  return compactObject({
    visitorId: input.visitorId,
    sessionId: input.sessionId,
    eventName: input.eventName,
    sourceDomain: input.sourceDomain,
    path: input.path,
    landingPath: input.landingPath,
    referrer: input.referrer,
    firstReferrer: input.firstReferrer,
    utmSource: input.utmSource,
    utmMedium: input.utmMedium,
    utmCampaign: input.utmCampaign,
    utmTerm: input.utmTerm,
    utmContent: input.utmContent,
    campaignSlug: input.campaignSlug,
    locale: input.locale,
    marketId: input.marketId,
    officeId: input.officeId,
    productId: input.productId,
    storySlug: input.storySlug,
    timezone: input.timezone,
    browserLanguage: input.browserLanguage,
    browserLanguages: input.browserLanguages,
    screenWidth: input.screenWidth,
    screenHeight: input.screenHeight,
    viewportWidth: input.viewportWidth,
    viewportHeight: input.viewportHeight,
    ip: requestContext.ip,
    userAgent: requestContext.userAgent,
    metadata: input.metadata,
  });
}

function getProviderConfig(): ProviderConfig {
  const endpoint = process.env.IDENTITY_RESOLUTION_ENDPOINT?.trim();
  const provider = process.env.IDENTITY_RESOLUTION_PROVIDER?.trim() || (endpoint ? "generic_webhook" : "not_configured");
  const minAcceptedConfidence = Number.parseFloat(
    process.env.IDENTITY_RESOLUTION_MIN_ACCEPTED_CONFIDENCE ?? "0.1",
  );
  return {
    provider,
    endpoint,
    apiKey: process.env.IDENTITY_RESOLUTION_API_KEY?.trim(),
    minAcceptedConfidence: Number.isFinite(minAcceptedConfidence) ? minAcceptedConfidence : 0.1,
  };
}

function getProviderSummary() {
  const config = getProviderConfig();
  return {
    provider: config.provider,
    configured: Boolean(config.endpoint),
    endpointHost: config.endpoint ? safeHost(config.endpoint) : null,
    minAcceptedConfidence: config.minAcceptedConfidence,
  };
}

function normalizeMatchType(value: unknown): ProviderMatch["matchType"] {
  if (value === "person" || value === "household" || value === "company") return value;
  return "unknown";
}

function normalizeEmail(value: string | undefined) {
  return value?.trim().toLowerCase() || undefined;
}

function normalizePhone(value: string | undefined) {
  const digits = value?.replace(/\D+/g, "") ?? "";
  return digits.length >= 7 ? digits : undefined;
}

function cleanConfidence(value: unknown) {
  const parsed = typeof value === "number" ? value : Number.parseFloat(String(value ?? ""));
  if (!Number.isFinite(parsed)) return undefined;
  if (parsed > 1) return Math.min(parsed / 100, 1);
  return Math.min(Math.max(parsed, 0), 1);
}

function hasAddress(address: PostalAddress | undefined) {
  return Boolean(address && Object.values(address).some(Boolean));
}

function tryParseJson(text: string) {
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return { raw: text };
  }
}

function toJsonValue(value: unknown): postgres.JSONValue {
  const object = coerceObject(value);
  if (object) return object as postgres.JSONValue;
  if (Array.isArray(value)) return value as postgres.JSONValue;
  return { value } as postgres.JSONValue;
}

function coerceObject(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function compactObject(value: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(value).filter(([, item]) => item !== undefined && item !== null && item !== ""),
  );
}

function cleanString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : undefined;
}

function nullableString(value: unknown) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function nullableNumber(value: unknown) {
  if (typeof value === "number") return value;
  const parsed = Number.parseFloat(String(value ?? ""));
  return Number.isFinite(parsed) ? parsed : null;
}

function safeHost(endpoint: string) {
  try {
    return new URL(endpoint).host;
  } catch {
    return "configured";
  }
}

function mapRequestRow(row: Record<string, unknown>): IdentityResolutionRequestRow {
  return {
    id: String(row.id),
    visitorId: String(row.visitor_id),
    sessionId: String(row.session_id),
    eventName: String(row.event_name),
    provider: String(row.provider),
    status: String(row.status),
    sourceDomain: String(row.source_domain),
    path: String(row.path),
    landingPath: nullableString(row.landing_path),
    errorMessage: nullableString(row.error_message),
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
  };
}

function mapMatchRow(row: Record<string, unknown>): IdentityMatchRow {
  return {
    id: Number(row.id),
    requestId: String(row.request_id),
    contactId: nullableString(row.contact_id),
    visitorId: String(row.visitor_id),
    sessionId: String(row.session_id),
    provider: String(row.provider),
    providerContactId: nullableString(row.provider_contact_id),
    matchType: String(row.match_type),
    confidence: nullableNumber(row.confidence),
    status: String(row.status),
    fullName: nullableString(row.full_name),
    email: nullableString(row.email),
    phone: nullableString(row.phone),
    company: nullableString(row.company),
    sourceDomain: String(row.source_domain),
    path: String(row.path),
    contactName: nullableString(row.contact_name),
    createdAt: toIso(row.created_at),
  };
}

function toIso(value: unknown) {
  if (value instanceof Date) return value.toISOString();
  return String(value);
}
