-- Careers applications storage (in-house ATS-lite)
-- Run this against your Postgres database (Neon/Supabase/RDS).

create table if not exists careers_applications (
  id uuid primary key,
  tenant_id text not null,
  status text not null default 'new',
  assigned_to text,

  role_id text not null,
  role_title text not null,

  name text not null,
  email text not null,
  phone text,

  resume_key text,
  resume_filename text,
  resume_content_type text,
  resume_size integer,

  message text,
  notes text,
  source text,
  user_agent text,
  ip text,

  received_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint careers_applications_status_check check (status in (
    'new',
    'screening',
    'interview',
    'offer',
    'rejected',
    'hired'
  ))
);

alter table careers_applications
  add column if not exists assigned_to text;

create index if not exists careers_applications_tenant_received_at_idx
  on careers_applications (tenant_id, received_at desc);

create index if not exists careers_applications_tenant_status_idx
  on careers_applications (tenant_id, status);

create index if not exists careers_applications_tenant_assigned_to_idx
  on careers_applications (tenant_id, assigned_to);

create index if not exists careers_applications_email_idx
  on careers_applications (email);

create index if not exists careers_applications_phone_idx
  on careers_applications (phone);
