"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { ArrowLeft, Timer, Repeat, Trophy, TrendingUp } from "lucide-react";

// ── Mapas estáticos ───────────────────────────────────────────
const SKILL_META: Record<string, { label: string; maxLevel: number }> = {
  planche:           { label: "Planche",       maxLevel: 6 },
  muscle_up:         { label: "Muscle Up",     maxLevel: 5 },
  pistol_squat:      { label: "Pistol Squat",  maxLevel: 8 },
  v_sit:             { label: "V-Sit",         maxLevel: 2 },
  handstand_push_up: { label: "HSPU",          maxLevel: 5 },
};

const CATALOG_NAMES: Record<string, string> = {
  pseudo_push_up: "Pseudo Push-up", planche_lean: "Planche Lean",
  leg_raise: "Leg Raise", superman: "Superman", frog_stand: "Frog Stand",
  tuck_planche: "Tuck Planche", tuck_planche_adv: "Advanced Tuck Planche",
  tuck_planche_swing: "Tuck Planche Swing", straddle_planche: "Straddle Planche",
  handstand_lean: "Handstand Lean", planche: "Planche",
  pull_up: "Pull-up", body_row: "Body Row", dips: "Dips", push_up: "Push-up",
  pull_up_high: "High Pull-up", straight_bar_dip: "Straight Bar Dip",
  muscle_up_jumping: "Jumping Muscle Up", muscle_up_kipping: "Kipping Muscle Up",
  muscle_up_negative: "Muscle Up Negativo", muscle_up: "Muscle Up",
  deep_squat: "Deep Squat", lunge: "Lunge", one_leg_calf_raise: "Calf Raise Unilateral",
  deep_squat_hold: "Deep Squat Hold", bulgarian_split_squat: "Bulgarian Split Squat",
  archer_squat: "Archer Squat", pistol_squat_bench: "Bench Pistol Squat",
  pistol_squat_assisted: "Assisted Pistol Squat", pistol_squat: "Pistol Squat",
  pistol_squat_elevated: "Elevated Pistol Squat",
  straddle_leg_raise: "Straddle Leg Raise", scapula_dip: "Scapula Dip",
  knee_raise_bar: "Knee Raise (Barra)", leg_raise_hold: "Leg Raise Hold",
  pike_push_up: "Pike Push-up", hindu_push_up: "Hindu Push-up",
  headstand: "Headstand", wall_handstand: "Wall Handstand",
  pike_push_up_adv: "Advanced Pike Push-up", wall_hspu: "Wall HSPU",
  handstand: "Handstand", hspu_negative: "HSPU Negativo", hspu: "HSPU",
};

interface ProgExercise {
  catalog_id: string;
  sets: number;
  reps: number | null;
  duration_seconds: number | null;
  notes: string | null;
  order_index: number;
}

interface Progression {
  id: string;
  progression_level: number;
  progression_name: string;
  description: string;
  exercises: ProgExercise[];
}

interface SessionDot {
  all_targets_met: boolean;
  session_date: string;
}

interface AdvanceRec {
  next_level: number;
  next_progression_name: string;
  message: string;
}

interface SessionResult {
  session_id: string;
  all_targets_met: boolean;
  consecutive_successes: number;
  advance_recommendation: AdvanceRec | null;
}

export default function SkillSessionPage() {
  const { skill } = useParams<{ skill: string }>();
  const router = useRouter();
  const meta = SKILL_META[skill];

  const [currentLevel, setCurrentLevel] = useState(1);
  const [progression, setProgression] = useState<Progression | null>(null);
  const [sessionDots, setSessionDots] = useState<SessionDot[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state: catalog_id → { done_reps, done_duration }
  const [inputs, setInputs] = useState<
    Record<string, { done_reps: string; done_duration: string }>
  >({});

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SessionResult | null>(null);
  const [advanceDone, setAdvanceDone] = useState(false);

  // ── Load ─────────────────────────────────────────────────
  const load = useCallback(async () => {
    setLoading(true);
    const skillKey = skill.toUpperCase();

    const [{ data: lvData }, ] = await Promise.all([
      supabase
        .from("user_skill_level")
        .select("current_level, status")
        .eq("skill", skillKey)
        .maybeSingle(),
    ]);

    const level = (lvData as any)?.current_level ?? 1;
    setCurrentLevel(level);

    // Progressão atual com exercícios
    const { data: prog } = await supabase
      .from("skill_progressions")
      .select(`
        id, progression_level, progression_name, description,
        skill_progression_exercises(catalog_id, sets, reps, duration_seconds, notes, order_index)
      `)
      .eq("skill", skillKey)
      .eq("progression_level", level)
      .maybeSingle();

    if (prog) {
      const exercises = ((prog as any).skill_progression_exercises as ProgExercise[])
        .sort((a, b) => a.order_index - b.order_index);
      setProgression({ ...(prog as any), exercises });

      // Init inputs
      const initInputs: typeof inputs = {};
      exercises.forEach((ex) => {
        initInputs[ex.catalog_id] = { done_reps: "", done_duration: "" };
      });
      setInputs(initInputs);
    }

    // Últimas 3 sessões deste nível
    const { data: dots } = await supabase
      .from("skill_session_log")
      .select("all_targets_met, session_date")
      .eq("skill", skillKey)
      .eq("progression_level", level)
      .order("session_date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(3);

    setSessionDots((dots ?? []) as SessionDot[]);
    setLoading(false);
  }, [skill]);

  useEffect(() => { load(); }, [load]);

  // ── Submit session ────────────────────────────────────────
  async function handleSubmit() {
    if (!progression) return;
    setSubmitting(true);

    const today = new Date().toISOString().split("T")[0];
    const exercises = progression.exercises.map((ex) => ({
      catalog_id: ex.catalog_id,
      done_reps: inputs[ex.catalog_id]?.done_reps
        ? parseInt(inputs[ex.catalog_id].done_reps, 10)
        : undefined,
      done_duration: inputs[ex.catalog_id]?.done_duration
        ? parseInt(inputs[ex.catalog_id].done_duration, 10)
        : undefined,
    }));

    const res = await fetch(`/api/skills/${skill}/session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        progression_level: currentLevel,
        session_date: today,
        exercises,
        notes: "",
      }),
    });

    const data = await res.json();
    setResult(data);
    setSubmitting(false);
  }

  // ── Advance ───────────────────────────────────────────────
  async function handleAdvance(confirm: boolean) {
    await fetch(`/api/skills/${skill}/advance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ confirm }),
    });
    setAdvanceDone(true);
    if (confirm) {
      setTimeout(() => { setResult(null); setAdvanceDone(false); load(); }, 1000);
    } else {
      setResult((r) => r ? { ...r, advance_recommendation: null } : r);
    }
  }

  if (!meta) {
    return (
      <AppShell>
        <div className="px-4 pt-8 text-center text-muted-foreground">
          <p>Skill não encontrada.</p>
          <Button variant="ghost" className="mt-4" onClick={() => router.back()}>Voltar</Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="px-4 pt-5 pb-28 space-y-5">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} /> Skills
        </button>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">{meta.label}</h1>
          {progression && (
            <p className="text-sm text-muted-foreground mt-0.5">
              Nível {currentLevel}/{meta.maxLevel} — {progression.progression_name}
            </p>
          )}
        </div>

        {loading && (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-surface rounded-xl h-20 animate-pulse" />
            ))}
          </div>
        )}

        {!loading && progression && !result && (
          <>
            {/* Session dots + description */}
            <div className="bg-surface rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Últimas sessões
                </p>
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => {
                    const s = sessionDots[i];
                    return (
                      <span
                        key={i}
                        className={cn(
                          "w-3 h-3 rounded-full",
                          s?.all_targets_met === true
                            ? "bg-accent"
                            : s?.all_targets_met === false
                            ? "bg-muted-foreground/40"
                            : "bg-surface border border-border"
                        )}
                        title={s?.session_date}
                      />
                    );
                  })}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{progression.description}</p>
            </div>

            {/* Exercise inputs */}
            <div className="space-y-3">
              {progression.exercises.map((ex) => {
                const name = CATALOG_NAMES[ex.catalog_id] ?? ex.catalog_id;
                const isTimed = ex.duration_seconds !== null && ex.duration_seconds > 0;
                const target = isTimed
                  ? `${ex.sets} × ${ex.duration_seconds}s`
                  : ex.reps
                  ? `${ex.sets} × ${ex.reps} reps`
                  : `${ex.sets} × max reps`;

                return (
                  <div key={ex.catalog_id} className="bg-surface rounded-xl p-4">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          {isTimed ? <Timer size={11} /> : <Repeat size={11} />}
                          Meta: {target}
                        </p>
                        {ex.notes && (
                          <p className="text-xs text-accent mt-0.5">{ex.notes}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-xs text-muted-foreground shrink-0 w-16">
                        {isTimed ? "Segundos:" : "Reps:"}
                      </label>
                      <Input
                        type="number"
                        min={0}
                        placeholder={
                          isTimed
                            ? `meta ${ex.duration_seconds}s`
                            : `meta ${ex.reps ?? "max"}`
                        }
                        value={
                          isTimed
                            ? inputs[ex.catalog_id]?.done_duration ?? ""
                            : inputs[ex.catalog_id]?.done_reps ?? ""
                        }
                        onChange={(e) =>
                          setInputs((prev) => ({
                            ...prev,
                            [ex.catalog_id]: {
                              ...prev[ex.catalog_id],
                              ...(isTimed
                                ? { done_duration: e.target.value }
                                : { done_reps: e.target.value }),
                            },
                          }))
                        }
                        className="h-9 text-sm"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Result card */}
        {result && !advanceDone && (
          <div
            className={cn(
              "rounded-xl p-5 space-y-4",
              result.all_targets_met
                ? "bg-accent/10 border border-accent/30"
                : "bg-surface border border-border"
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">
                {result.all_targets_met ? "🎉" : "💪"}
              </span>
              <div>
                <p className="font-bold text-foreground">
                  {result.all_targets_met
                    ? "Meta batida!"
                    : "Continue assim!"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {result.all_targets_met
                    ? `${result.consecutive_successes} sessão(ões) consecutiva(s) com meta atingida`
                    : "Cada sessão é um passo. Você está evoluindo."}
                </p>
              </div>
            </div>

            {/* Consecutive dots */}
            {result.consecutive_successes > 0 && (
              <div className="flex gap-1.5">
                {[...Array(3)].map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "w-3 h-3 rounded-full",
                      i < result.consecutive_successes ? "bg-accent" : "bg-surface border border-border"
                    )}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">
                  {result.consecutive_successes}/3 para avançar
                </span>
              </div>
            )}

            {/* Advance recommendation */}
            {result.advance_recommendation && (
              <div className="bg-background rounded-lg p-3 space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-accent" />
                  <p className="text-sm font-bold text-accent">Está pronto para avançar!</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Próximo nível:{" "}
                  <span className="text-foreground font-medium">
                    Progressão {result.advance_recommendation.next_level}:{" "}
                    {result.advance_recommendation.next_progression_name}
                  </span>
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="accent"
                    className="flex-1"
                    onClick={() => handleAdvance(true)}
                  >
                    Avançar agora
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleAdvance(false)}
                  >
                    Continuar no atual
                  </Button>
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-1">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => { setResult(null); load(); }}
              >
                Ver resumo
              </Button>
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => router.push("/treino/skills")}
              >
                Voltar às skills
              </Button>
            </div>
          </div>
        )}

        {advanceDone && (
          <div className="text-center py-8 space-y-2">
            <Trophy size={40} className="text-accent mx-auto" />
            <p className="font-bold text-foreground">Nível {currentLevel + 1} desbloqueado!</p>
            <p className="text-xs text-muted-foreground">Carregando nova progressão…</p>
          </div>
        )}
      </div>

      {/* Submit button */}
      {!result && !loading && progression && (
        <div className="fixed bottom-16 md:bottom-0 left-0 right-0 md:left-60 flex justify-center px-4 pb-3 pt-2 bg-gradient-to-t from-background to-transparent pointer-events-none">
          <div className="w-full max-w-2xl pointer-events-auto">
            <Button
              variant="accent"
              size="lg"
              className="w-full"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Salvando…" : "Registrar sessão"}
            </Button>
          </div>
        </div>
      )}
    </AppShell>
  );
}
