-- ==============================================================================
-- IronPeak Fitness - Complete Supabase Setup Script
-- Run this entire script in your Supabase SQL Editor (SQL Editor -> New Query -> Run)
-- ==============================================================================

-- 0. Enable UUID extension if not enabled
create extension if not exists "pgcrypto";

-- 1. Create Membership Plans Table
create table if not exists membership_plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  duration_months integer not null,
  price numeric(10,2) not null,
  description text,
  created_at timestamptz default now()
);

-- 2. Create Members / Applications Table
create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  age integer,
  plan_name text default 'Standard',
  plan_id uuid references membership_plans(id) on delete set null,
  status text default 'Call Later',
  message text,
  join_date date default current_date,
  created_at timestamptz default now(),
  constraint members_status_check check (status in ('Interested', 'Not Interested', 'Call Later'))
);

-- 3. If members table already exists without the status column or constraint:
do $$
begin
  if not exists (
    select 1 from information_schema.columns 
    where table_name = 'members' and column_name = 'status'
  ) then
    alter table members add column status text default 'Call Later';
  end if;

  if not exists (
    select 1 from information_schema.columns 
    where table_name = 'members' and column_name = 'plan_name'
  ) then
    alter table members add column plan_name text default 'Standard';
  end if;

  if not exists (
    select 1 from information_schema.columns 
    where table_name = 'members' and column_name = 'message'
  ) then
    alter table members add column message text;
  end if;
end $$;

-- 4. Insert or Update Sample Membership Plans
delete from membership_plans;

insert into membership_plans (name, duration_months, price, description)
values
  ('Basic', 1, 999.00, 'Full gym & free weights floor access, lockers & showers'),
  ('Standard', 3, 2499.00, 'Gym access + custom workout split + trainer support'),
  ('Premium', 6, 4499.00, 'Gym access + trainer audits + nutrition & diet guidance'),
  ('Annual', 12, 7999.00, 'Full 365-day access + priority coaching + freeze allowance');

-- 5. Insert Sample Member Applications
delete from members;

insert into members (name, phone, age, plan_name, status, message)
values
  ('Arun Kumar', '9876543210', 24, 'Standard', 'Interested', 'Interested in morning personal training sessions.'),
  ('Rahul S', '9123456789', 28, 'Premium', 'Call Later', 'Please call after 6 PM regarding diet plan guidance.'),
  ('Priya Dharshini', '9443212345', 26, 'Annual', 'Interested', 'Looking for a full 1-year transformation membership.');

-- 6. Enable Row Level Security (RLS)
alter table membership_plans enable row level security;
alter table members enable row level security;

-- Drop existing policies if any to prevent duplicate policy errors
drop policy if exists "Anyone can view membership plans" on membership_plans;
drop policy if exists "Anyone can view members" on members;
drop policy if exists "Anyone can register as a member" on members;
drop policy if exists "Anyone can update member status" on members;

-- 7. RLS Policies:

-- Anyone can view membership plans
create policy "Anyone can view membership plans"
on membership_plans
for select
using (true);

-- Anyone can register (insert membership application)
create policy "Anyone can register as a member"
on members
for insert
with check (true);

-- Anyone can view registered members (for admin desk portal)
create policy "Anyone can view members"
on members
for select
using (true);

-- Allow status updates (when admin changes the dropdown)
create policy "Anyone can update member status"
on members
for update
using (true)
with check (true);

-- ==============================================================================
-- Verification Check: Run this to confirm everything is created
-- ==============================================================================
select * from membership_plans;
select * from members;
