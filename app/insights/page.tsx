"use client";

import { useEffect, useState, useCallback } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, UtensilsCrossed, Dumbbell, Moon, Award, Star } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SKILL_META: Record<string, { label: string; maxLevel: number; slug: string }> = {
  PLANCHE:           { label: "Planche",      maxLevel: 6, slug: "planche" },
  MUSCLE_UP:         { label: "Muscle Up",    maxLevel: 5, slug: "muscle_up" },
  PISTOL_SQUAT:      { label: "Pistol Squat", maxLevel: 8, slug: "pistol_squat" },
  V_SIT:             { label: "V-Sit",        maxLevel: 2, slug: "v_sit" },
  HANDSTAND_PUSH_UP: { label: "HSPU",         maxLevel: 5, slug: "handstand_push_up" },
};

const SKILL_ORDER = ["PLANCHE", "MUSCLE_UP", "PISTOL_SQUAT", "V_SIT", "HANDSTAND_PUSH_UP"];

interface SkillRow {
  skill: string;
  current_level: number;
  progression_name: string | null;
}

function ScoreRing({ score }: { score: number }) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="#1C2B3A" strokeWidth="10" />
          <circle
            cx="50" cy="50" r="42" fill="none" stroke="#E8A020" strokeWidth="10"
            strokeDasharray={`${(score / 100) * 264} 264`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{score}</span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
      </div>
    </div>
  );
}

export default function InsightsPage() {
  const [skills, setSkills] = useState<SkillRow[]>([]);
  const [skillsLoading, setSkillsLoading] = useState(true);

  const loadSkills = useCallback(async () => {
    const { data: levels } = await supabase
      .from("user_skill_level")
      .select("skill, current_level");

    if (!levels || levels.length === 0) { setSkillsLoading(false); return; }

    const rows = await Promise.all(
      (levels as any[]).map(async (lv) => {
        const { data: prog } = await supabase
          .from("skill_progressions")
          .select("progression_name")
          .eq("skill", lv.skill)
          .eq("progression_level", lv.current_level)
          .maybeSingle();
        return {
          skill: lv.skill,
          current_level: lv.current_level,
          progression_name: (prog as any)?.progression_name ?? null,
        } satisfies SkillRow;
      })
    );

    rows.sort((a, b) => SKILL_ORDER.indexOf(a.skill) - SKILL_ORDER.indexOf(b.skill));
    setSkills(rows);
    setSkillsLoading(false);
  }, []);

  useEffect(() => { loadSkills(); }, [loadSkills]);

  return (
    <AppShell>
      <div className="px-4 pt-6 pb-6 space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Insights</h1>

        {/* Score de consistência */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award size={14} />
              Consistência geral
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScoreRing score={0} />
            <p className="text-center text-xs text-muted-foreground mt-2">
              Registre treinos, alimentação e sono para aumentar seu score.
            </p>
          </CardContent>
        </Card>

        {/* Skills progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star size={14} />
              Progresso de Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            {skillsLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-5 bg-muted rounded animate-pulse" />
                ))}
              </div>
            ) : skills.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Sem dados — rode o seed para inicializar as skills.
              </p>
            ) : (
              <div className="space-y-3">
                {skills.map((sk) => {
                  const meta = SKILL_META[sk.skill];
                  if (!meta) return null;
                  const pct = Math.round((sk.current_level / meta.maxLevel) * 100);
                  return (
                    <Link
                      key={sk.skill}
                      href={`/treino/skills/${meta.slug}`}
                      className="block group"
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-foreground font-medium group-hover:text-accent transition-colors">
                          {meta.label}
                        </span>
                        <span className="text-muted-foreground">
                          {sk.current_level}/{meta.maxLevel}
                          {sk.progression_name && (
                            <span className="ml-1 opacity-60">
                              ({sk.progression_name.length > 16
                                ? sk.progression_name.slice(0, 16) + "…"
                                : sk.progression_name})
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="h-1.5 bg-background rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Peso */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown size={14} />
              Evolução de peso
            </CardTitle>
          </CardHeader>
          <CardContent className="h-32 flex items-center justify-center text-muted-foreground text-sm">
            Sem dados ainda
          </CardContent>
        </Card>

        {/* Alimentação */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UtensilsCrossed size={14} />
              Alimentação — 7 dias
            </CardTitle>
          </CardHeader>
          <CardContent className="h-32 flex items-center justify-center text-muted-foreground text-sm">
            Sem dados ainda
          </CardContent>
        </Card>

        {/* Treino */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell size={14} />
              Treino — 4 semanas
            </CardTitle>
          </CardHeader>
          <CardContent className="h-32 flex items-center justify-center text-muted-foreground text-sm">
            Sem dados ainda
          </CardContent>
        </Card>

        {/* Sono */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon size={14} />
              Sono — 4 semanas
            </CardTitle>
          </CardHeader>
          <CardContent className="h-32 flex items-center justify-center text-muted-foreground text-sm">
            Sem dados ainda
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
