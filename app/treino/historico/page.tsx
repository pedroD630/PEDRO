"use client";

import { useEffect, useState, useCallback } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { supabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Dumbbell, Star } from "lucide-react";

interface Session {
  id: string;
  started_at: string;
  finished_at: string | null;
  total_duration_min: number | null;
  status: string;
  notes: string | null;
  variation_id: string | null;
  workout_variations: { name: string; training_focus: string | null } | null;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDuration(started: string, finished: string | null, durationMin: number | null) {
  if (durationMin) return `${durationMin} min`;
  if (!finished) return null;
  const mins = Math.round(
    (new Date(finished).getTime() - new Date(started).getTime()) / 60000
  );
  if (mins <= 0) return null;
  return `${mins} min`;
}

export default function HistoricoPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("workout_sessions")
      .select(`
        id, started_at, finished_at, total_duration_min, status, notes, variation_id,
        workout_variations(name, training_focus)
      `)
      .order("started_at", { ascending: false })
      .limit(50);

    setSessions((data ?? []) as unknown as Session[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const isSkill = (s: Session) => s.variation_id === null;

  return (
    <AppShell>
      <div className="px-4 pt-6 pb-6 space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Histórico</h1>

        {loading && (
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-surface rounded-xl h-16 animate-pulse" />
            ))}
          </div>
        )}

        {!loading && sessions.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <CheckCircle2 size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Nenhum treino registrado ainda.</p>
            <p className="text-xs mt-1 opacity-70">
              Complete seu primeiro treino para ver o histórico.
            </p>
          </div>
        )}

        {!loading && sessions.length > 0 && (
          <div className="space-y-2">
            {sessions.map((s) => {
              const skill = isSkill(s);
              const title = skill
                ? (s.notes?.replace("Skill: ", "") ?? "Sessão de skill")
                : (s.workout_variations?.name ?? "Treino");
              const duration = formatDuration(s.started_at, s.finished_at, s.total_duration_min);
              const completed = s.status === "completed";
              const skipped = s.status === "skipped";

              return (
                <div
                  key={s.id}
                  className="bg-surface rounded-xl px-4 py-3 flex items-center gap-3"
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                      completed
                        ? "bg-accent/15"
                        : skipped
                        ? "bg-muted/30"
                        : "bg-muted/20"
                    )}
                  >
                    {skill ? (
                      <Star
                        size={15}
                        className={completed ? "text-accent" : "text-muted-foreground"}
                      />
                    ) : (
                      <Dumbbell
                        size={15}
                        className={completed ? "text-accent" : "text-muted-foreground"}
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "text-sm font-semibold truncate",
                        skipped ? "text-muted-foreground" : "text-foreground"
                      )}
                    >
                      {title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatDate(s.started_at)}
                      {duration && (
                        <span className="ml-2 opacity-70">· {duration}</span>
                      )}
                    </p>
                  </div>

                  {/* Status badge */}
                  <span
                    className={cn(
                      "text-xs font-medium shrink-0",
                      completed
                        ? "text-accent"
                        : skipped
                        ? "text-muted-foreground"
                        : "text-yellow-400"
                    )}
                  >
                    {completed ? "Concluído" : skipped ? "Pulado" : "Em andamento"}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
