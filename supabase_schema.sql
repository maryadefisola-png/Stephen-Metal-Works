-- Stephen Metal Works — quotations
-- Safe to run more than once.
create extension if not exists pgcrypto;

create table if not exists public.quotations (
  id uuid primary key default gen_random_uuid(),
  quote_number text unique,
  customer_name text not null,
  phone text not null,
  location text,
  project_type text,
  description text,
  items jsonb not null default '[]'::jsonb,
  subtotal numeric(12,2) not null default 0,
  discount numeric(12,2) not null default 0,
  deposit_pct numeric(5,2) not null default 50,
  deposit_amount numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  validity_days integer not null default 14,
  status text not null default 'Draft' check (status in ('Draft','Sent','Accepted','Rejected','In Production','Completed')),
  design_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists quotations_status_idx on public.quotations(status);
create index if not exists quotations_created_idx on public.quotations(created_at desc);
create sequence if not exists public.quotation_seq;

create or replace function public.set_quote_number()
returns trigger
language plpgsql
as $$
begin
  if new.quote_number is null or btrim(new.quote_number) = '' then
    new.quote_number := 'SMW-' || extract(year from now())::text || '-' || lpad(nextval('public.quotation_seq')::text, 3, '0');
  end if;
  new.updated_at := now();
  return new;
end;
$$;

create or replace function public.touch_quotation_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists trg_set_quote_number on public.quotations;
create trigger trg_set_quote_number
before insert on public.quotations
for each row execute function public.set_quote_number();

drop trigger if exists trg_touch_updated_at on public.quotations;
create trigger trg_touch_updated_at
before update on public.quotations
for each row execute function public.touch_quotation_updated_at();

alter table public.quotations enable row level security;
-- Deliberately no anon/authenticated policies: browser clients cannot access quotations.
-- The Next.js server uses SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS.
