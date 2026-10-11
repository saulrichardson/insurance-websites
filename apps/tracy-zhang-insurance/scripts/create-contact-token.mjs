import { createHash, randomBytes, randomUUID } from "node:crypto";
import postgres from "postgres";

const args = parseArgs(process.argv.slice(2));
const databaseUrl = process.env.DATABASE_URL?.trim();

if (!databaseUrl) {
  fail("DATABASE_URL is required.");
}

const fullName = clean(args.name ?? args["full-name"], 240);
const email = normalizeEmail(args.email);
const phone = normalizePhone(args.phone);
const label = clean(args.label ?? "manual-contact-token", 160);
const channel = clean(args.channel ?? "email", 80);
const source = clean(args.source ?? "manual", 160);
const baseUrl = clean(
  args["base-url"] ?? process.env.IDENTITY_TOKEN_BASE_URL ?? process.env.NEXT_PUBLIC_SITE_URL,
  2048,
) ?? "https://tracyzhanginsurance.com/";
const expiresAt = clean(args["expires-at"], 80);

if (!fullName && !email && !phone) {
  fail("Provide at least one of --name, --email, or --phone.");
}

const sql = postgres(databaseUrl, {
  max: 1,
  ssl: databaseUrl.includes("localhost") ? false : "require",
});

const rawToken = `ct_${randomBytes(24).toString("base64url")}`;
const tokenHash = createHash("sha256").update(rawToken).digest("hex");
const tokenId = randomUUID();

try {
  const result = await sql.begin(async (tx) => {
    const contactId = await findOrCreateContact(tx, { fullName, email, phone });
    await tx`
      insert into known_contact_tokens (
        id,
        token_hash,
        contact_id,
        label,
        channel,
        source,
        expires_at
      )
      values (
        ${tokenId},
        ${tokenHash},
        ${contactId},
        ${label},
        ${channel},
        ${source},
        ${expiresAt ?? null}
      )
    `;
    await tx`
      insert into contact_events (
        contact_id,
        event_type,
        metadata
      )
      values (
        ${contactId},
        'known_contact_token_created',
        ${sql.json({
          tokenId,
          label,
          channel,
          source,
          expiresAt: expiresAt ?? null,
        })}
      )
    `;
    return { contactId };
  });

  const url = appendToken(baseUrl, rawToken);
  console.log(JSON.stringify({
    ok: true,
    contactId: result.contactId,
    tokenId,
    label,
    channel,
    source,
    url,
    token: rawToken,
    tokenStorage: "sha256 hash stored; raw token is only shown in this output",
  }, null, 2));
} finally {
  await sql.end();
}

async function findOrCreateContact(tx, input) {
  const existing = await findExistingContactId(tx, input.email, input.phone);
  const contactId = existing ?? randomUUID();

  await tx`
    insert into contacts (
      id,
      full_name,
      lifecycle_stage,
      first_seen_at,
      last_seen_at
    )
    values (
      ${contactId},
      ${input.fullName ?? null},
      'lead',
      now(),
      now()
    )
    on conflict (id) do update
    set
      full_name = coalesce(excluded.full_name, contacts.full_name),
      last_seen_at = now(),
      updated_at = now()
  `;

  if (input.email) {
    await tx`
      insert into contact_identities (
        contact_id,
        identity_type,
        value,
        normalized_value,
        status
      )
      values (${contactId}, 'email', ${input.email}, ${input.email}, 'active')
      on conflict (identity_type, normalized_value) do update
      set value = excluded.value, status = 'active', updated_at = now()
    `;
  }

  if (input.phone) {
    await tx`
      insert into contact_identities (
        contact_id,
        identity_type,
        value,
        normalized_value,
        status
      )
      values (${contactId}, 'phone', ${args.phone}, ${input.phone}, 'active')
      on conflict (identity_type, normalized_value) do update
      set value = excluded.value, status = 'active', updated_at = now()
    `;
  }

  return contactId;
}

async function findExistingContactId(tx, email, phone) {
  if (!email && !phone) return null;
  const rows = email && phone
    ? await tx`
      select contact_id
      from contact_identities
      where (identity_type = 'email' and normalized_value = ${email})
         or (identity_type = 'phone' and normalized_value = ${phone})
      order by case when identity_type = 'email' then 0 else 1 end
      limit 1
    `
    : email
      ? await tx`
        select contact_id
        from contact_identities
        where identity_type = 'email' and normalized_value = ${email}
        limit 1
      `
      : await tx`
        select contact_id
        from contact_identities
        where identity_type = 'phone' and normalized_value = ${phone}
        limit 1
      `;
  return rows[0]?.contact_id ? String(rows[0].contact_id) : null;
}

function appendToken(base, token) {
  const url = new URL(base);
  url.searchParams.set("ct", token);
  return url.toString();
}

function parseArgs(rawArgs) {
  const parsed = {};
  for (let index = 0; index < rawArgs.length; index += 1) {
    const item = rawArgs[index];
    if (!item.startsWith("--")) continue;
    const key = item.slice(2);
    const next = rawArgs[index + 1];
    if (!next || next.startsWith("--")) {
      parsed[key] = "true";
      continue;
    }
    parsed[key] = next;
    index += 1;
  }
  return parsed;
}

function normalizeEmail(value) {
  const normalized = clean(value, 320)?.toLowerCase();
  return normalized && normalized.includes("@") ? normalized : undefined;
}

function normalizePhone(value) {
  const digits = clean(value, 80)?.replace(/\D+/g, "") ?? "";
  return digits.length >= 7 ? digits : undefined;
}

function clean(value, maxLength) {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, maxLength) : undefined;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
