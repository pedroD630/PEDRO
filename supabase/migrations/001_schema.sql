-- ============================================================
-- PEDRO — Schema inicial
-- ============================================================

-- Extensão para UUID
create extension if not exists "pgcrypto";

-- ────────────────────────────────────────────────────────────
-- Perfil do usuário (single-user — uma linha apenas)
-- ────────────────────────────────────────────────────────────
create table if not exists user_profile (
  id                      uuid primary key default gen_random_uuid(),
  name                    text not null,
  birth_date              date not null,
  biological_sex          text not null check (biological_sex in ('male', 'female')),
  height_cm               int not null,
  weight_kg               numeric(5,2) not null,
  goal_weight_kg          numeric(5,2) not null,
  daily_calories_target   int not null default 3000,
  daily_protein_target_g  int not null default 200,
  sleep_target_hours      numeric(3,1) not null default 8,
  onboarding_completed    boolean not null default false,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────
-- Alimentação — receitas (seed data do ebook)
-- ────────────────────────────────────────────────────────────
create table if not exists recipes (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  category        text not null,
  prep_time_min   int,
  calories        int not null,
  protein_g       numeric(6,2) not null default 0,
  cost_brl        numeric(6,2),
  ingredients     jsonb not null default '[]',
  steps           jsonb not null default '[]',
  substitutions   jsonb,
  calorie_tips    jsonb,
  is_system       boolean not null default true,
  created_at      timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────
-- Alimentação — diário
-- ────────────────────────────────────────────────────────────
create table if not exists food_log (
  id          uuid primary key default gen_random_uuid(),
  logged_at   timestamptz not null default now(),
  date        date not null default current_date,
  name        text not null,
  calories    int not null,
  protein_g   numeric(6,2),
  notes       text,
  recipe_id   uuid references recipes(id) on delete set null,
  created_at  timestamptz not null default now()
);

create index if not exists food_log_date_idx on food_log(date);

-- ────────────────────────────────────────────────────────────
-- Alimentação — histórico de peso
-- ────────────────────────────────────────────────────────────
create table if not exists weight_log (
  id          uuid primary key default gen_random_uuid(),
  date        date not null default current_date,
  weight_kg   numeric(5,2) not null,
  created_at  timestamptz not null default now(),
  unique(date)
);

-- ────────────────────────────────────────────────────────────
-- Treino — rotinas base
-- ────────────────────────────────────────────────────────────
create table if not exists workout_routines (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  is_system   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Slots semanais de cada rotina (ex: Push, Pull, Legs, Descanso)
create table if not exists routine_slots (
  id            uuid primary key default gen_random_uuid(),
  routine_id    uuid not null references workout_routines(id) on delete cascade,
  slot_name     text not null, -- PUSH | PULL | LEGS | FULL_BODY | CARDIO | REST
  default_order int not null   -- 0=Dom ... 6=Sáb
);

-- Variações de treino por slot
create table if not exists workout_variations (
  id                    uuid primary key default gen_random_uuid(),
  slot_id               uuid references routine_slots(id) on delete set null,
  name                  text not null,
  description           text,
  estimated_duration_min int,
  is_system             boolean not null default true,
  created_at            timestamptz not null default now()
);

-- Exercícios de cada variação
create table if not exists exercises (
  id                  uuid primary key default gen_random_uuid(),
  variation_id        uuid not null references workout_variations(id) on delete cascade,
  name                text not null,
  target_muscles      text,
  sets                int not null default 3,
  reps_min            int,
  reps_max            int,
  duration_seconds    int,
  rest_seconds        int not null default 90,
  exercise_type       text not null check (exercise_type in ('weight', 'calisthenics', 'timed')),
  difficulty_options  jsonb,
  notes               text,
  order_index         int not null default 0
);

-- ────────────────────────────────────────────────────────────
-- Configuração ativa do usuário
-- ────────────────────────────────────────────────────────────
create table if not exists user_routine_config (
  id                  uuid primary key default gen_random_uuid(),
  active_routine_id   uuid not null references workout_routines(id),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- Variação ativa por dia da semana
create table if not exists user_day_variation (
  id                    uuid primary key default gen_random_uuid(),
  day_of_week           int not null check (day_of_week between 0 and 6),
  slot_id               uuid references routine_slots(id) on delete set null,
  active_variation_id   uuid references workout_variations(id) on delete set null,
  updated_at            timestamptz not null default now(),
  unique(day_of_week)
);

-- ────────────────────────────────────────────────────────────
-- Sessões de treino
-- ────────────────────────────────────────────────────────────
create table if not exists workout_sessions (
  id                  uuid primary key default gen_random_uuid(),
  variation_id        uuid references workout_variations(id) on delete set null,
  started_at          timestamptz not null default now(),
  finished_at         timestamptz,
  total_duration_min  int,
  status              text not null default 'in_progress'
                        check (status in ('in_progress', 'completed', 'skipped')),
  notes               text
);

create index if not exists workout_sessions_started_idx on workout_sessions(started_at);

-- Séries realizadas em cada sessão
create table if not exists workout_sets (
  id                    uuid primary key default gen_random_uuid(),
  session_id            uuid not null references workout_sessions(id) on delete cascade,
  exercise_id           uuid not null references exercises(id) on delete cascade,
  set_number            int not null,
  reps_done             int,
  weight_kg             numeric(6,2),
  difficulty_label      text,
  rest_taken_seconds    int,
  notes                 text,
  logged_at             timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────
-- Sono
-- ────────────────────────────────────────────────────────────
create table if not exists sleep_log (
  id            uuid primary key default gen_random_uuid(),
  date          date not null default current_date,
  slept_at      timestamptz not null,
  woke_at       timestamptz not null,
  duration_min  int not null,
  quality       text check (quality in ('poor', 'fair', 'good')),
  notes         text,
  created_at    timestamptz not null default now(),
  unique(date)
);

create index if not exists sleep_log_date_idx on sleep_log(date);
