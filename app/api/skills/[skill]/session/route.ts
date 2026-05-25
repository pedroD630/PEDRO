// POST /api/skills/[skill]/session
// Salva uma sessão de skill, calcula all_targets_met e verifica avanço de nível.

import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

interface ExerciseResult {
  catalog_id: string;
  done_reps?: number;
  done_duration?: number;
}

interface SessionBody {
  progression_level: number;
  session_date: string;
  exercises: ExerciseResult[];
  notes?: string;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { skill: string } }
) {
  const skill = params.skill.toUpperCase();
  const body: SessionBody = await req.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // ── 1. Buscar progressão + exercícios do nível ────────────
  const { data: prog, error: progErr } = await supabase
    .from("skill_progressions")
    .select("id, progression_level, skill_progression_exercises(*)")
    .eq("skill", skill)
    .eq("progression_level", body.progression_level)
    .maybeSingle();

  if (progErr || !prog) {
    return NextResponse.json(
      { error: "Progressão não encontrada", detail: progErr?.message },
      { status: 404 }
    );
  }

  const progExercises = (prog as any).skill_progression_exercises as Array<{
    catalog_id: string;
    reps: number | null;
    duration_seconds: number | null;
  }>;

  // ── 2. Calcular all_targets_met ────────────────────────────
  const all_targets_met = progExercises.every((ex) => {
    const result = body.exercises.find((r) => r.catalog_id === ex.catalog_id);
    if (!result) return false;

    if (ex.duration_seconds !== null && ex.duration_seconds > 0) {
      return (result.done_duration ?? 0) >= ex.duration_seconds;
    } else if (ex.reps !== null && ex.reps > 0) {
      return (result.done_reps ?? 0) >= ex.reps;
    } else {
      // max_reps ou meta indefinida — qualquer registro conta
      return (result.done_reps ?? 0) > 0 || (result.done_duration ?? 0) > 0;
    }
  });

  // ── 3. Inserir skill_session_log ───────────────────────────
  const { data: session, error: sessionErr } = await supabase
    .from("skill_session_log")
    .insert({
      skill,
      progression_level: body.progression_level,
      session_date: body.session_date,
      all_targets_met,
      exercises_data: body.exercises,
      notes: body.notes ?? null,
    })
    .select("id")
    .single();

  if (sessionErr) {
    return NextResponse.json(
      { error: "Erro ao salvar sessão", detail: sessionErr.message },
      { status: 500 }
    );
  }

  // ── 4. Contar sessões consecutivas bem-sucedidas ─────────
  let consecutive_successes = 0;

  if (all_targets_met) {
    const { data: recent } = await supabase
      .from("skill_session_log")
      .select("all_targets_met")
      .eq("skill", skill)
      .eq("progression_level", body.progression_level)
      .order("session_date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(10);

    for (const s of recent ?? []) {
      if (s.all_targets_met) consecutive_successes++;
      else break;
    }
  }

  // ── 5. Verificar recomendação de avanço ───────────────────
  let advance_recommendation = null;

  if (consecutive_successes >= 3) {
    const nextLevel = body.progression_level + 1;
    const { data: nextProg } = await supabase
      .from("skill_progressions")
      .select("progression_level, progression_name")
      .eq("skill", skill)
      .eq("progression_level", nextLevel)
      .maybeSingle();

    if (nextProg) {
      // Atualizar status do usuário
      await supabase
        .from("user_skill_level")
        .update({ status: "recommended_advance", last_reviewed_at: new Date().toISOString() })
        .eq("skill", skill);

      advance_recommendation = {
        next_level: nextLevel,
        next_progression_name: (nextProg as any).progression_name,
        message: `Você bateu a meta ${consecutive_successes}x seguidas! Está pronto para o próximo nível.`,
      };
    }
  }

  return NextResponse.json({
    session_id: (session as any).id,
    all_targets_met,
    consecutive_successes,
    advance_recommendation,
  });
}
