-- ════════════════════════════════════════════════════════════
-- Migration 004 — Skill Progression System
-- ════════════════════════════════════════════════════════════

-- ── Nível atual do usuário por skill ─────────────────────────
create table if not exists user_skill_level (
  id               uuid primary key default gen_random_uuid(),
  skill            text not null,           -- 'PLANCHE' | 'MUSCLE_UP' | etc.
  current_level    int  not null default 1,
  status           text not null default 'active',  -- 'active' | 'recommended_advance' | 'locked'
  started_at       timestamptz not null default now(),
  last_reviewed_at timestamptz,
  unique (skill)
);

-- ── Log de sessões de skill ───────────────────────────────────
create table if not exists skill_session_log (
  id               uuid primary key default gen_random_uuid(),
  skill            text not null,
  progression_level int  not null,
  session_date     date not null default current_date,
  all_targets_met  boolean not null,
  exercises_data   jsonb,
  notes            text,
  created_at       timestamptz not null default now()
);

create index if not exists skill_session_log_skill_idx
  on skill_session_log (skill, progression_level, session_date desc);

-- ── Histórico de avanços de nível ────────────────────────────
create table if not exists skill_level_history (
  id          uuid primary key default gen_random_uuid(),
  skill       text not null,
  from_level  int  not null,
  to_level    int  not null,
  reason      text,   -- 'auto_advance' | 'manual_advance' | 'manual_rollback'
  changed_at  timestamptz not null default now()
);

-- ── Seed inicial de níveis (executa apenas se vazio) ─────────
insert into user_skill_level (skill, current_level, status)
  select unnest(array['PLANCHE','MUSCLE_UP','PISTOL_SQUAT','V_SIT','HANDSTAND_PUSH_UP']),
         1, 'active'
  where not exists (select 1 from user_skill_level limit 1);
