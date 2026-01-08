-- Enable extensions
create extension if not exists "uuid-ossp";

-- Users table
create table users (
  id uuid primary key default uuid_generate_v4(),
  supabase_user_id uuid references auth.users not null unique,
  email text unique not null,
  created_at timestamp with time zone default now(),
  age_group text,
  vibe text,
  ethics_preference text,
  college text,
  domains jsonb,
  experience text,
  timeline_horizon text,
  principles jsonb,
  advantage text,
  compliance_style text,
  risk_appetite text,
  dna_json jsonb default '{}'::jsonb,
  active_venture_id uuid
);

-- Ideas table
create table ideas (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  title text not null,
  description text not null,
  potential_impact text,
  weaknesses text,
  pick_drop_rationale text,
  difficulty int check (difficulty between 1 and 5),
  vision_score int check (vision_score between 0 and 100),
  deen_score int,
  market_score int check (market_score between 0 and 100),
  execute_score int check (execute_score between 0 and 100),
  status text default 'pending' check (status in ('pending', 'picked', 'rejected')),
  created_at timestamp with time zone default now()
);

-- Ventures table
create table ventures (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  idea_id uuid references ideas(id),
  title text not null,
  timeline jsonb not null,
  status text default 'active' check (status in ('active', 'completed', 'dropped')),
  created_at timestamp with time zone default now(),
  completed_at timestamp with time zone
);

-- Challenges table
create table challenges (
  id uuid primary key default uuid_generate_v4(),
  venture_id uuid references ventures(id) on delete cascade,
  week_number int not null,
  domain text not null check (domain in ('Product', 'Growth', 'Revenue', 'Customer', 'Finance', 'People', 'Operations', 'Strategy')),
  title text not null,
  description text,
  sub_challenges jsonb not null,
  status text default 'pending' check (status in ('pending', 'completed', 'skipped')),
  generated_at timestamp with time zone default now()
);

-- Scores table
create table scores (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  barakah_score int default 0 check (barakah_score between 0 and 100),
  business_score int default 0 check (business_score between 0 and 100),
  sustainability_score int default 0 check (sustainability_score between 0 and 100),
  updated_at timestamp with time zone default now(),
  unique(user_id)
);

-- Enable RLS and policies (owner-only access)
alter table users enable row level security;
create policy "user own data" on users for all using (auth.uid() = supabase_user_id);
-- Repeat for other tables...
alter table ideas enable row level security;
create policy "user own ideas" on ideas for all using (auth.uid() in (select supabase_user_id from users where id = user_id));
alter table ventures enable row level security;
create policy "user own ventures" on ventures for all using (auth.uid() in (select supabase_user_id from users where id = user_id));
alter table challenges enable row level security;
create policy "user own challenges" on challenges for all using (auth.uid() in (select supabase_user_id from users where id = (select user_id from ventures where id = venture_id)));
alter table scores enable row level security;
create policy "user own scores" on scores for all using (auth.uid() in (select supabase_user_id from users where id = user_id));
