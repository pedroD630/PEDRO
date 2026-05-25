"use client";

import { useEffect, useState, useCallback } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Trophy } from "lucide-react";

// ── Configuração estática por skill ───────────────────────────
const SKILL_META: Record<
  string,
  { label: string; emoji: string; maxLevel: number; slug: string }
> = {
  PLANCHE:           { label: "Planche",       emoji: "🤸", maxLevel: 6, slug: "planche" },
  MUSCLE_UP:         { label: "Muscle Up",     emoji: "💪", maxLevel: 5, slug: "muscle_up" },
  PISTOL_SQUAT:      { label: "Pistol Squat",  emoji: "🦵", maxLevel: 8, slug: "pistol_squat" },
  V_SIT:             { label: "V-Sit",         emoji: "🧘", maxLevel: 2, slug: "v_sit" },
  HANDSTAND_PUSH_UP: { label: "HSPU",          emoji: "🤲", maxLevel: 5, slug: "handstand_push_up" },
};

const SKILL_ORDER = ["PLANCHE", "MUSCLE_UP", "PISTOL_SQUAT", "V_SIT", "HANDSTAND_PUSH_UP"];

interface SkillState {
  skill: string;
  current_level: number;
  status: string;
  progression_name: string | null;
  dots: boolean[]; // últimas 3 sessões (true = bateu meta)
}

export default function SkillsPage() {
  const router = useRouter();
  const [skills, setSkills] = useState<SkillState[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);

    // Buscar níveis do usuário
    const { data: levels } = await supabase
      .from("user_skill_level")
      .select("skill, current_level, status");

    if (!levels || levels.length === 0) {
      setLoading(false);
      return;
    }

    // Buscar progressions atuais + últimas 3 sessões por skill em paralelo
    const results = await Promise.all(
      (levels as any[]).map(async (lv) => {
        const [{ data: prog }, { data: sessions }] = await Promise.all([
          supabase
            .from("skill_progressions")
            .select("progression_name")
            .eq("skill", lv.skill)
            .eq("progression_level", lv.current_level)
            .maybeSingle(),
          supabase
            .from("skill_session_log")
            .select("all_targets_met")
            .eq("skill", lv.skill)
            .eq("progression_level", lv.current_level)
            .order("session_date", { ascending: false })
            .order("created_at", { ascending: false })
            .limit(3),
        ]);

        const dots = ((sessions ?? []) as any[]).map((s) => s.all_targets_met as boolean);

        return {
          skill: lv.skill,
          current_level: lv.current_level,
          status: lv.status,
          progression_name: (prog as any)?.progression_name ?? null,
          dots,
        } satisfies SkillState;
      })
    );

    // Ordenar por SKILL_ORDER
    results.sort(
      (a, b) => SKILL_ORDER.indexOf(a.skill) - SKILL_ORDER.indexOf(b.skill)
    );
    setSkills(results);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleAdvance(skill: string) {
    const res = await fetch(`/api/skills/${SKILL_META[skill].slug}/advance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ confirm: true }),
    });
    if (res.ok) load();
  }

  async function handleRejectAdvance(skill: string) {
    await fetch(`/api/skills/${SKILL_META[skill].slug}/advance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ confirm: false }),
    });
    load();
  }

  return (
    <AppShell>
      <div className="px-4 pt-6 pb-6 space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Skills de Calistenia</h1>
        <p className="text-xs text-muted-foreground -mt-2">
          Progressão automática — avança quando bater a meta 3x seguidas.
        </p>

        {loading && (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-surface rounded-xl p-4 h-24 animate-pulse" />
            ))}
          </div>
        )}

        {!loading && skills.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">Nenhum dado encontrado.</p>
            <p className="text-xs mt-1 opacity-70">Rode o seed para inicializar as skills.</p>
          </div>
        )}

        {!loading && skills.map((sk) => {
          const meta = SKILL_META[sk.skill];
          if (!meta) return null;
          const pct = Math.round((sk.current_level / meta.maxLevel) * 100);
          const isMax = sk.current_level >= meta.maxLevel;
          const isRecommended = sk.status === "recommended_advance";

          return (
            <div key={sk.skill} className="space-y-2">
              {/* Advance recommendation card */}
              {isRecommended && (
                <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-xl">🎯</span>
                    <div>
                      <p className="text-sm font-bold text-accent">
                        Você está pronto para avançar!
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Bateu a meta 3x seguidas no{" "}
                        <span className="text-foreground font-medium">
                          {sk.progression_name}
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="accent"
                      className="flex-1"
                      onClick={() => handleAdvance(sk.skill)}
                    >
                      Avançar agora
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleRejectAdvance(sk.skill)}
                    >
                      Continuar no atual
                    </Button>
                  </div>
                </div>
              )}

              {/* Skill card */}
              <Link
                href={`/treino/skills/${meta.slug}`}
                className="block bg-surface rounded-xl p-4 hover:bg-surface/80 active:scale-[0.99] transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl leading-none">{meta.emoji}</span>
                    <div>
                      <p className="text-sm font-bold text-foreground">{meta.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {isMax
                          ? "Nível máximo 🏆"
                          : sk.progression_name ?? `Nível ${sk.current_level}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Session dots */}
                    <div className="flex gap-0.5">
                      {[0, 1, 2].map((i) => {
                        const hasData = i < sk.dots.length;
                        const met = hasData ? sk.dots[i] : null;
                        return (
                          <span
                            key={i}
                            className={cn(
                              "w-2.5 h-2.5 rounded-full",
                              met === true
                                ? "bg-accent"
                                : met === false
                                ? "bg-muted-foreground/40"
                                : "bg-surface border border-border"
                            )}
                          />
                        );
                      })}
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      {sk.current_level}/{meta.maxLevel}
                    </span>
                    <span>{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-background rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
