-- ContractorSiteAudit database schema
-- Run this file in the Supabase SQL editor (Dashboard -> SQL Editor -> New query).
-- Safe to re-run: all statements are idempotent.
-- Note: no RLS policies are defined here because these tables are only
-- accessed from the server via the service-role key.

create extension if not exists pgcrypto;

-- Completed audit results
create table if not exists audits (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  url text not null,
  ip_address text not null,
  mobile_score integer,
  desktop_score integer,
  lcp_ms integer,
  cls numeric,
  inp_ms integer,
  has_local_business_schema boolean not null default false,
  has_viewport_meta boolean not null default false,
  missing_alt_count integer not null default 0
);

-- Captured leads (report requests)
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  business_name text not null,
  audited_url text
);

-- Per-IP rate limiting entries
create table if not exists rate_limits (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  ip_address text not null
);

create index if not exists rate_limits_ip_created_idx on rate_limits (ip_address, created_at);
create index if not exists audits_ip_idx on audits (ip_address);
create index if not exists audits_created_idx on audits (created_at);
create index if not exists leads_created_idx on leads (created_at);
