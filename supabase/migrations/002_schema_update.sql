-- ============================================================
-- PEDRO — Schema update v2
-- Adds: exercise_catalog, skill_progressions, new columns
-- ============================================================

-- ── Exercise catalog (canonical library) ──────────────────
create table if not exists exercise_catalog (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,     -- "dips", "push_up"
  name              text not null,
  exercise_type     text not null,            -- calisthenics | weight | timed | plyometric | cardio | mobility
  primary_muscles   jsonb not null default '[]',
  secondary_muscles jsonb not null default '[]',
  movement_pattern  text not null,
  difficulty_level  text not null,            -- beginner | intermediate | advanced | elite
  is_system         boolean not null default true,
  created_at        timestamptz not null default now()
);

create index if not exists exercise_catalog_slug_idx on exercise_catalog(slug);
create index if not exists exercise_catalog_type_idx on exercise_catalog(exercise_type);

-- ── Skill progressions ────────────────────────────────────
create table if not exists skill_progressions (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,     -- "skill_planche_prog_1"
  skill             text not null,            -- 'PLANCHE' | 'MUSCLE_UP' | 'PISTOL_SQUAT' | 'V_SIT' | 'HANDSTAND_PUSH_UP'
  progression_level int not null,
  progression_name  text not null,
  description       text,
  is_system         boolean not null default true,
  created_at        timestamptz not null default now(),
  unique(skill, progression_level)
);

create table if not exists skill_progression_exercises (
  id               uuid primary key default gen_random_uuid(),
  progression_id   uuid not null references skill_progressions(id) on delete cascade,
  catalog_id       uuid not null references exercise_catalog(id) on delete cascade,
  sets             int not null default 3,
  reps             int null,
  duration_seconds int null,
  notes            text null,
  order_index      int not null default 0
);

create index if not exists skill_prog_ex_prog_idx on skill_progression_exercises(progression_id);

-- ── Extend existing tables ────────────────────────────────

-- workout_variations: add training_focus
alter table workout_variations
  add column if not exists training_focus text;  -- strength | hypertrophy | power | endurance | cardio | skill

-- routine_slots: add day label
alter table routine_slots
  add column if not exists default_day_label text;

-- exercises: add catalog reference + training style, make name nullable
alter table exercises
  add column if not exists catalog_id     uuid references exercise_catalog(id) on delete set null,
  add column if not exists training_style text not null default 'normal';
                                                 -- normal | max_reps | timed

alter table exercises alter column name drop not null;

-- Extend exercise_type to cover all catalog types
alter table exercises drop constraint if exists exercises_exercise_type_check;
alter table exercises add constraint exercises_exercise_type_check
  check (exercise_type in ('weight', 'calisthenics', 'timed', 'plyometric', 'cardio', 'mobility'));

create index if not exists exercises_catalog_idx on exercises(catalog_id);
create index if not exists exercises_variation_idx on exercises(variation_id);
