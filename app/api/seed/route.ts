// ============================================================
// POST /api/seed  — Dev-only: populates Supabase with seed data
// Idempotent (upsert). Never deploy to production.
// ============================================================

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { createHash } from "crypto";

import { EXERCISE_CATALOG } from "@/constants/seed-data/exercise-catalog";
import {
  WORKOUT_ROUTINES,
  ROUTINE_SLOTS,
  WORKOUT_VARIATIONS,
  WORKOUT_EXERCISES,
} from "@/constants/seed-data/workouts";
import { SKILL_PROGRESSIONS } from "@/constants/seed-data/skill-progressions";

// ── Guard ─────────────────────────────────────────────────────
export async function GET() {
  return NextResponse.json({ error: "Use POST /api/seed" }, { status: 405 });
}

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Seed is disabled in production." },
      { status: 403 }
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json(
      { error: "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY" },
      { status: 500 }
    );
  }

  // Use a service-role key if available, fall back to anon key (works if RLS is off)
  const supabase = createClient(
    url,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? key
  );

  const results: Record<string, number> = {};
  const errors: string[] = [];

  // ── UUID helpers ──────────────────────────────────────────
  /** Deterministic UUID v4-shaped string from an arbitrary slug */
  function slugToUUID(slug: string): string {
    const hash = createHash("sha256").update(`pedro:${slug}`).digest("hex");
    return [
      hash.slice(0, 8),
      hash.slice(8, 12),
      "4" + hash.slice(13, 16),        // version 4
      ((parseInt(hash[16], 16) & 0x3) | 0x8).toString(16) + hash.slice(17, 20), // variant
      hash.slice(20, 32),
    ].join("-");
  }

  // Pre-build slug → UUID maps for FK lookups
  const catalogUUID = (slug: string) => slugToUUID(`catalog:${slug}`);
  const routineUUID = (id: string) => slugToUUID(`routine:${id}`);
  const slotUUID    = (id: string) => slugToUUID(`slot:${id}`);
  const varUUID     = (id: string) => slugToUUID(`variation:${id}`);
  const exUUID      = (id: string) => slugToUUID(`exercise:${id}`);
  const progUUID    = (id: string) => slugToUUID(`progression:${id}`);
  const progExUUID  = (progId: string, idx: number) =>
    slugToUUID(`progression_exercise:${progId}:${idx}`);

  // ── 1. exercise_catalog ───────────────────────────────────
  try {
    const rows = EXERCISE_CATALOG.map((e) => ({
      id: catalogUUID(e.slug),
      slug: e.slug,
      name: e.name,
      exercise_type: e.exercise_type,
      primary_muscles: e.primary_muscles,
      secondary_muscles: e.secondary_muscles,
      movement_pattern: e.movement_pattern,
      difficulty_level: e.difficulty_level,
      is_system: true,
    }));

    const { error, count } = await supabase
      .from("exercise_catalog")
      .upsert(rows, { onConflict: "slug", count: "exact" });

    if (error) errors.push(`exercise_catalog: ${error.message}`);
    else results.exercise_catalog = count ?? rows.length;
  } catch (e) {
    errors.push(`exercise_catalog: ${String(e)}`);
  }

  // ── 2. workout_routines ───────────────────────────────────
  try {
    const rows = WORKOUT_ROUTINES.map((r) => ({
      id: routineUUID(r.id),
      name: r.name,
      description: r.description,
      is_system: r.is_system,
    }));

    const { error, count } = await supabase
      .from("workout_routines")
      .upsert(rows, { onConflict: "id", count: "exact" });

    if (error) errors.push(`workout_routines: ${error.message}`);
    else results.workout_routines = count ?? rows.length;
  } catch (e) {
    errors.push(`workout_routines: ${String(e)}`);
  }

  // ── 3. routine_slots ──────────────────────────────────────
  try {
    const rows = ROUTINE_SLOTS.map((s) => ({
      id: slotUUID(s.id),
      routine_id: routineUUID(s.routine_id),
      slot_name: s.slot_name,
      default_day_of_week: s.default_day_of_week,
      default_day_label: s.default_day_label,
    }));

    const { error, count } = await supabase
      .from("routine_slots")
      .upsert(rows, { onConflict: "id", count: "exact" });

    if (error) errors.push(`routine_slots: ${error.message}`);
    else results.routine_slots = count ?? rows.length;
  } catch (e) {
    errors.push(`routine_slots: ${String(e)}`);
  }

  // ── 4. workout_variations ────────────────────────────────
  try {
    const rows = WORKOUT_VARIATIONS.map((v) => ({
      id: varUUID(v.id),
      slot_id: slotUUID(v.slot_id),
      name: v.name,
      description: v.description,
      estimated_duration_min: v.estimated_duration_min,
      training_focus: v.training_focus,
      is_system: v.is_system,
    }));

    const { error, count } = await supabase
      .from("workout_variations")
      .upsert(rows, { onConflict: "id", count: "exact" });

    if (error) errors.push(`workout_variations: ${error.message}`);
    else results.workout_variations = count ?? rows.length;
  } catch (e) {
    errors.push(`workout_variations: ${String(e)}`);
  }

  // ── 5. exercises ─────────────────────────────────────────
  try {
    const rows = WORKOUT_EXERCISES.map((ex) => ({
      id: exUUID(ex.id),
      variation_id: varUUID(ex.variation_id),
      catalog_id: catalogUUID(ex.catalog_id),
      // name is nullable when catalog_id is set
      name: null,
      sets: ex.sets,
      reps_min: ex.reps_min,
      reps_max: ex.reps_max,
      duration_seconds: ex.duration_seconds,
      rest_seconds: ex.rest_seconds ?? 60,
      exercise_type: "calisthenics" as const, // resolved from catalog at query time
      training_style: ex.training_style,
      order_index: ex.order_index,
      notes: ex.notes,
    }));

    const { error, count } = await supabase
      .from("exercises")
      .upsert(rows, { onConflict: "id", count: "exact" });

    if (error) errors.push(`exercises: ${error.message}`);
    else results.exercises = count ?? rows.length;
  } catch (e) {
    errors.push(`exercises: ${String(e)}`);
  }

  // ── 6. skill_progressions ────────────────────────────────
  try {
    const rows = SKILL_PROGRESSIONS.map((p) => ({
      id: progUUID(p.id),
      slug: p.id,
      skill: p.skill,
      progression_level: p.progression_level,
      progression_name: p.progression_name,
      description: p.description,
      is_system: true,
    }));

    const { error, count } = await supabase
      .from("skill_progressions")
      .upsert(rows, { onConflict: "slug", count: "exact" });

    if (error) errors.push(`skill_progressions: ${error.message}`);
    else results.skill_progressions = count ?? rows.length;
  } catch (e) {
    errors.push(`skill_progressions: ${String(e)}`);
  }

  // ── 7. skill_progression_exercises ───────────────────────
  try {
    const rows = SKILL_PROGRESSIONS.flatMap((p) =>
      p.exercises.map((ex, idx) => ({
        id: progExUUID(p.id, idx),
        progression_id: progUUID(p.id),
        catalog_id: catalogUUID(ex.catalog_id),
        sets: ex.sets,
        reps: ex.reps,
        duration_seconds: ex.duration_seconds,
        notes: ex.notes ?? null,
        order_index: idx,
      }))
    );

    const { error, count } = await supabase
      .from("skill_progression_exercises")
      .upsert(rows, { onConflict: "id", count: "exact" });

    if (error) errors.push(`skill_progression_exercises: ${error.message}`);
    else results.skill_progression_exercises = count ?? rows.length;
  } catch (e) {
    errors.push(`skill_progression_exercises: ${String(e)}`);
  }

  // ── Response ──────────────────────────────────────────────
  const status = errors.length === 0 ? 200 : 207;
  return NextResponse.json(
    {
      ok: errors.length === 0,
      results,
      errors: errors.length > 0 ? errors : undefined,
      total: Object.values(results).reduce((a, b) => a + b, 0),
    },
    { status }
  );
}
