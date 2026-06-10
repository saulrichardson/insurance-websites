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
