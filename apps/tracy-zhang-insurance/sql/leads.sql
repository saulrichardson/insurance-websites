create table if not exists leads (
  id uuid primary key,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed', 'spam')),
  received_at timestamptz not null,
  name text not null,
  email text,
  phone text,
  product_interest text not null,
  preferred_contact text not null check (preferred_contact in ('phone', 'text', 'email')),
  office_preference text,
  zip text,
  message text,
  source_domain text not null,
  source_path text not null,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  campaign_slug text,
  user_agent text,
  ip text,
  suspicious_reason text,
  blocked_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists lead_consents (
  id bigserial primary key,
  lead_id uuid not null references leads(id) on delete cascade,
  consent_copy_version text not null,
  contact_consent_accepted boolean not null,
  sms_consent_accepted boolean not null default false,
  consent_source_url text not null,
  ip text,
  user_agent text,
  created_at timestamptz not null default now()
);

create table if not exists lead_events (
  id bigserial primary key,
  lead_id uuid references leads(id) on delete cascade,
  event_type text not null,
  event_body text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists leads_status_created_at_idx on leads (status, created_at desc);
create index if not exists leads_source_domain_idx on leads (source_domain);
create index if not exists leads_product_interest_idx on leads (product_interest);

create table if not exists contacts (
  id uuid primary key,
  full_name text,
  preferred_language text,
  primary_office_id text,
  lifecycle_stage text not null default 'lead' check (
    lifecycle_stage in (
      'lead',
      'needs_followup',
      'contacted',
      'quoted',
      'customer',
      'not_interested',
      'do_not_contact',
      'spam'
    )
  ),
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists contact_identities (
  id bigserial primary key,
  contact_id uuid not null references contacts(id) on delete cascade,
  identity_type text not null check (identity_type in ('email', 'phone')),
  value text not null,
  normalized_value text not null,
  status text not null default 'active' check (status in ('active', 'invalid', 'suppressed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (identity_type, normalized_value)
);

create table if not exists contact_consents (
  id bigserial primary key,
  contact_id uuid not null references contacts(id) on delete cascade,
  lead_id uuid references leads(id) on delete set null,
  channel text not null check (channel in ('email', 'phone', 'sms')),
  purpose text not null check (purpose in ('lead_followup', 'email_marketing', 'sms_marketing', 'transactional')),
  status text not null check (status in ('opted_in', 'opted_out', 'revoked', 'unknown')),
  consent_copy_version text not null,
  consent_copy text not null,
  source_domain text not null,
  source_path text not null,
  ip text,
  user_agent text,
  occurred_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists visitor_sessions (
  id uuid primary key,
  visitor_id text not null,
  session_id text not null unique,
  contact_id uuid references contacts(id) on delete set null,
  source_domain text not null,
  landing_path text not null,
  last_path text not null,
  referrer text,
  first_referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  campaign_slug text,
  locale text,
  market_id text,
  office_id text,
  product_id text,
  story_slug text,
  timezone text,
  browser_language text,
  screen_width integer,
  screen_height integer,
  viewport_width integer,
  viewport_height integer,
  user_agent text,
  ip text,
  metadata jsonb not null default '{}'::jsonb,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists visitor_events (
  id bigserial primary key,
  visitor_id text not null,
  session_id text not null,
  contact_id uuid references contacts(id) on delete set null,
  event_name text not null,
  source_domain text not null,
  path text not null,
  landing_path text,
  referrer text,
  first_referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  campaign_slug text,
  locale text,
  market_id text,
  office_id text,
  product_id text,
  story_slug text,
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create table if not exists contact_sources (
  id bigserial primary key,
  contact_id uuid not null references contacts(id) on delete cascade,
  lead_id uuid references leads(id) on delete set null,
  visitor_id text,
  session_id text,
  source_domain text not null,
  landing_path text,
  submitted_path text not null,
  referrer text,
  first_referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  campaign_slug text,
  locale text,
  market_id text,
  office_id text,
  product_interest text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists contact_events (
  id bigserial primary key,
  contact_id uuid not null references contacts(id) on delete cascade,
  lead_id uuid references leads(id) on delete set null,
  event_type text not null,
  event_body text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists contact_addresses (
  id bigserial primary key,
  contact_id uuid not null references contacts(id) on delete cascade,
  line1 text,
  line2 text,
  city text,
  region text,
  postal_code text,
  country text,
  source text not null default 'identity_resolution',
  confidence numeric(5, 4),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists known_contact_tokens (
  id uuid primary key,
  token_hash text not null unique,
  contact_id uuid not null references contacts(id) on delete cascade,
  label text,
  channel text,
  source text,
  expires_at timestamptz,
  last_seen_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists identity_resolution_requests (
  id uuid primary key,
  visitor_id text not null,
  session_id text not null,
  event_name text not null,
  provider text not null,
  status text not null check (
    status in ('queued', 'matched', 'no_match', 'skipped', 'error')
  ),
  source_domain text not null,
  path text not null,
  landing_path text,
  request_payload jsonb not null default '{}'::jsonb,
  response_payload jsonb not null default '{}'::jsonb,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists identity_matches (
  id bigserial primary key,
  request_id uuid not null references identity_resolution_requests(id) on delete cascade,
  contact_id uuid references contacts(id) on delete set null,
  visitor_id text not null,
  session_id text not null,
  provider text not null,
  provider_contact_id text,
  match_type text not null check (match_type in ('person', 'household', 'company', 'unknown')),
  confidence numeric(5, 4),
  status text not null default 'candidate' check (
    status in ('accepted', 'candidate', 'rejected', 'suppressed')
  ),
  full_name text,
  email text,
  phone text,
  address jsonb not null default '{}'::jsonb,
  company text,
  source_domain text not null,
  path text not null,
  raw_match jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists contact_identities_contact_id_idx
  on contact_identities (contact_id);
create index if not exists contact_consents_contact_id_idx
  on contact_consents (contact_id, occurred_at desc);
create index if not exists visitor_sessions_visitor_id_idx
  on visitor_sessions (visitor_id, last_seen_at desc);
create index if not exists visitor_events_session_idx
  on visitor_events (session_id, occurred_at desc);
create index if not exists contact_sources_contact_id_idx
  on contact_sources (contact_id, created_at desc);
create index if not exists contact_sources_lead_id_idx
  on contact_sources (lead_id);
create index if not exists contact_events_contact_id_idx
  on contact_events (contact_id, created_at desc);
create index if not exists contact_addresses_contact_id_idx
  on contact_addresses (contact_id, created_at desc);
create index if not exists known_contact_tokens_contact_id_idx
  on known_contact_tokens (contact_id, created_at desc);
create index if not exists identity_resolution_requests_session_idx
  on identity_resolution_requests (session_id, created_at desc);
create index if not exists identity_resolution_requests_status_idx
  on identity_resolution_requests (status, created_at desc);
create index if not exists identity_matches_contact_id_idx
  on identity_matches (contact_id, created_at desc);
create index if not exists identity_matches_session_idx
  on identity_matches (session_id, created_at desc);

do $$
begin
  if to_regclass('public.auto_leads') is null and to_regclass('public.contractor_auto_leads') is not null then
    alter table contractor_auto_leads rename to auto_leads;
  end if;

  if to_regclass('public.auto_lead_events') is null and to_regclass('public.contractor_auto_lead_events') is not null then
    alter table contractor_auto_lead_events rename to auto_lead_events;
  end if;
end $$;

do $$
begin
  if to_regclass('public.auto_leads') is not null then
    if exists (
      select 1 from information_schema.columns
      where table_schema = 'public' and table_name = 'auto_leads' and column_name = 'contractor_id'
    ) then
      alter table auto_leads rename column contractor_id to submitter_id;
    end if;

    if exists (
      select 1 from information_schema.columns
      where table_schema = 'public' and table_name = 'auto_leads' and column_name = 'contractor_name'
    ) then
      alter table auto_leads rename column contractor_name to submitter_name;
    end if;

    if exists (
      select 1 from information_schema.columns
      where table_schema = 'public' and table_name = 'auto_leads' and column_name = 'contractor_email'
    ) then
      alter table auto_leads rename column contractor_email to submitter_email;
    end if;

    if exists (
      select 1 from information_schema.columns
      where table_schema = 'public' and table_name = 'auto_leads' and column_name = 'contractor_phone'
    ) then
      alter table auto_leads rename column contractor_phone to submitter_phone;
    end if;

    if exists (
      select 1 from information_schema.columns
      where table_schema = 'public' and table_name = 'auto_leads' and column_name = 'contractor_entity_type'
    ) then
      alter table auto_leads rename column contractor_entity_type to submitter_entity_type;
    end if;
  end if;
end $$;

do $$
begin
  if to_regclass('public.auto_leads_status_created_at_idx') is null
     and to_regclass('public.contractor_auto_leads_status_created_at_idx') is not null then
    alter index contractor_auto_leads_status_created_at_idx rename to auto_leads_status_created_at_idx;
  end if;

  if to_regclass('public.auto_leads_submitter_idx') is null
     and to_regclass('public.contractor_auto_leads_contractor_idx') is not null then
    alter index contractor_auto_leads_contractor_idx rename to auto_leads_submitter_idx;
  end if;

  if to_regclass('public.auto_leads_submitter_idx') is null
     and to_regclass('public.contractor_auto_leads_submitter_idx') is not null then
    alter index contractor_auto_leads_submitter_idx rename to auto_leads_submitter_idx;
  end if;

  if to_regclass('public.auto_leads_payment_status_idx') is null
     and to_regclass('public.contractor_auto_leads_payment_status_idx') is not null then
    alter index contractor_auto_leads_payment_status_idx rename to auto_leads_payment_status_idx;
  end if;
end $$;

create table if not exists auto_leads (
  id uuid primary key,
  status text not null default 'submitted' check (
    status in (
      'submitted',
      'under_review',
      'correction_requested',
      'accepted_qualified_lead',
      'rejected',
      'duplicate',
      'invalid_lead',
      'revoked',
      'assigned_to_licensed_producer',
      'contact_attempted',
      'contacted',
      'unable_to_contact',
      'not_interested',
      'quote_discussion_required',
      'closed'
    )
  ),
  payment_status text not null default 'pending_review' check (
    payment_status in (
      'not_eligible',
      'pending_review',
      'eligible_for_qualified_lead_fee',
      'approved_for_payment',
      'paid',
      'revoked_before_payment',
      'revoked_after_payment',
      'offset_pending',
      'offset_applied'
    )
  ),
  received_at timestamptz not null,
  submitter_id text not null,
  submitter_name text not null,
  submitter_email text not null,
  submitter_phone text,
  submitter_entity_type text,
  prospect_name text not null,
  prospect_phone text not null,
  prospect_email text,
  residential_address text,
  city text,
  state text,
  zip text,
  preferred_contact_method text,
  preferred_contact_time text,
  consent_obtained_at text not null,
  consent_method text not null,
  consent_proof_notes text,
  consent_certified boolean not null,
  consent_certification_version text not null,
  present_interest boolean not null,
  vehicle_year text,
  vehicle_make text,
  vehicle_model text,
  vehicle_trim text,
  vin text,
  garaging_address text,
  garaging_zip text,
  ownership_status text,
  primary_use text,
  annual_mileage text,
  commute_distance text,
  currently_insured text,
  current_carrier text,
  primary_driver_name text not null,
  primary_driver_dob text,
  primary_driver_license_state text,
  primary_driver_license_status text,
  other_regular_drivers text,
  other_regular_driver_names text,
  driving_history_disclosure text,
  desired_timing text,
  current_policy_expiration text,
  shopping_reason text,
  coverage_preference text,
  coverage_preference_other text,
  source_url text,
  campaign_id text,
  source_domain text not null,
  source_path text not null,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  user_agent text,
  ip text,
  form_version text not null,
  certifications jsonb not null default '{}'::jsonb,
  submission_metadata jsonb not null default '{}'::jsonb,
  suspicious_reason text,
  blocked_reason text,
  accepted_at timestamptz,
  revoked_at timestamptz,
  rejection_reason text,
  revocation_reason text,
  ladder_position integer,
  qualified_lead_fee_cents integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists auto_lead_events (
  id bigserial primary key,
  lead_id uuid references auto_leads(id) on delete cascade,
  event_type text not null,
  event_body text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists auto_leads_status_created_at_idx
  on auto_leads (status, created_at desc);
create index if not exists auto_leads_submitter_idx
  on auto_leads (submitter_id, created_at desc);
create index if not exists auto_leads_payment_status_idx
  on auto_leads (payment_status, created_at desc);
