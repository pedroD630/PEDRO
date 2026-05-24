-- ============================================================
-- PEDRO — Schema update v3
-- Adds: default_day_of_week to routine_slots
-- ============================================================

-- routine_slots: add numeric day-of-week (0=Sun … 6=Sat)
alter table routine_slots
  add column if not exists default_day_of_week int not null default 0;
