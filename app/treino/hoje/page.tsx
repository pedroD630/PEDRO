'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Play, SkipForward, RefreshCw, Dumbbell, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const db = createClient();

interface Exercise {
  id: string;
  sets: number;
  reps_min: number | null;
  reps_max: number | null;
  duration_seconds: number | null;
  rest_seconds: number;
  training_style: string;
  order_index: number;
  exercise_catalog: { name: string; primary_muscles: string[] } | null;
  name: string | null;
}

interface VariationDetail {
  id: string;
  name: string;
  slot_name: string;
  slot_id?: string | null;
  estimated_duration_min: number | null;
  training_focus: string | null;
  exercises: Exercise[];
}

function muscleLabel(muscles: string[]) {
  return muscles
    .slice(0, 2)
    .map((m) => m.replace(/_/g, ' '))
    .join(', ');
}

function repLabel(ex: Exercise) {
  if (ex.training_style === 'timed' && ex.duration_seconds) return `${ex.duration_seconds}s`;
  if (ex.training_style === 'max_reps') return 'Máximo';
  if (ex.reps_min && ex.reps_max) {
    return ex.reps_min === ex.reps_max ? `${ex.reps_min}` : `${ex.reps_min}–${ex.reps_max}`;
  }
  if (ex.reps_min) return `${ex.reps_min}`;
  return '—';
}

async function fetchTodayVariation(): Promise<VariationDetail | null> {
  const dow = new Date().getDay();
  const today = new Date().toISOString().split('T')[0];

  // Try user_day_variation first
  const { data: udv } = await db
    .from('user_day_variation')
    .select('active_variation_id, slot_id')
    .eq('day_of_week', dow)
    .maybeSingle();

  let variationId: string | null = null;
  let slotName = '';

  if (udv?.active_variation_id) {
    variationId = udv.active_variation_id;
  } else {
    // Fall back: slot for today's day_of_week → first variation
    const { data: slot } = await db
      .from('routine_slots')
      .select('id,slot_name')
      .eq('default_day_of_week', dow)
      .limit(1)
      .maybeSingle();

    if (!slot) return null; // rest day
    slotName = slot.slot_name;

    const { data: variation } = await db
      .from('workout_variations')
      .select('id')
      .eq('slot_id', slot.id)
      .limit(1)
      .maybeSingle();

    if (!variation) return null;
    variationId = variation.id;
  }

  // Fetch variation details + exercises
  const [varRes, exRes] = await Promise.all([
    db.from('workout_variations').select('id,name,estimated_duration_min,training_focus,slot_id').eq('id', variationId).single(),
    db.from('exercises').select(`
      id, sets, reps_min, reps_max, duration_seconds, rest_seconds,
      training_style, order_index, name,
      exercise_catalog(name, primary_muscles)
    `).eq('variation_id', variationId).order('order_index'),
  ]);

  if (!varRes.data) return null;

  // Resolve slot_name if not already set
  if (!slotName && varRes.data.slot_id) {
    const { data: slotData } = await db
      .from('routine_slots')
      .select('slot_name')
      .eq('id', varRes.data.slot_id)
      .maybeSingle();
    slotName = slotData?.slot_name ?? '';
  }

  return {
    ...varRes.data,
    slot_name: slotName,
    exercises: (exRes.data ?? []) as unknown as Exercise[],
  };
}

export default function TreinoHojePage() {
  const router = useRouter();
  const [variation, setVariation] = useState<VariationDetail | null | undefined>(undefined);
  const [sessionDone, setSessionDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [skipping, setSkipping] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const today = new Date().toISOString().split('T')[0];
    const [v, done] = await Promise.all([
      fetchTodayVariation(),
      db.from('workout_sessions').select('id').eq('status', 'completed')
        .gte('started_at', `${today}T00:00:00`).limit(1).maybeSingle(),
    ]);
    setVariation(v);
    setSessionDone(!!done.data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleStart = () => {
    if (variation) router.push(`/treino/executar/${variation.id}`);
  };

  const handleSkip = async () => {
    if (!variation) return;
    setSkipping(true);
    await db.from('workout_sessions').insert({
      variation_id: variation.id,
      started_at: new Date().toISOString(),
      finished_at: new Date().toISOString(),
      status: 'skipped',
    });
    setSkipping(false);
    load();
  };

  const handleSwap = async () => {
    if (!variation) return;
    // Get next variation for the same slot
    const { data: all } = await db
      .from('workout_variations')
      .select('id,name')
      .eq('slot_id', variation.slot_id ?? '')
      .neq('id', variation.id)
      .limit(1)
      .maybeSingle();
    if (all) {
      // Upsert user_day_variation with new active_variation_id
      await db.from('user_day_variation').upsert({
        day_of_week: new Date().getDay(),
        slot_id: variation.slot_id ?? null,
        active_variation_id: all.id,
      }, { onConflict: 'day_of_week' });
      load();
    }
  };

  if (loading) {
    return (
      <AppShell>
        <div className="flex-1 flex items-center justify-center pb-20">
          <div className="text-muted-foreground text-sm animate-pulse">Carregando...</div>
        </div>
      </AppShell>
    );
  }

  // Rest day
  if (variation === null) {
    return (
      <AppShell>
        <div className="flex-1 flex flex-col items-center justify-center pb-24 px-6 gap-4 text-center">
          <div className="text-5xl">😴</div>
          <h2 className="text-xl font-bold text-foreground">Dia de descanso</h2>
          <p className="text-sm text-muted-foreground">Nenhum treino programado para hoje. Recupere-se!</p>
        </div>
      </AppShell>
    );
  }

  const v = variation!;

  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto pb-24 pt-6 px-4 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <Badge variant="accent" className="mb-2">{v.slot_name}</Badge>
            <h1 className="text-2xl font-bold text-foreground">{v.name}</h1>
            <div className="flex gap-2 mt-1">
              {v.estimated_duration_min && (
                <span className="text-xs text-muted-foreground">~{v.estimated_duration_min} min</span>
              )}
              {v.training_focus && (
                <span className="text-xs text-muted-foreground">· {v.training_focus}</span>
              )}
            </div>
          </div>
          <button
            onClick={handleSwap}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors p-1"
          >
            <RefreshCw size={14} /> Trocar
          </button>
        </div>

        {/* Done state */}
        {sessionDone && (
          <Card className="border-success/30 bg-success/10">
            <CardContent className="flex items-center gap-2 py-3">
              <CheckCircle2 size={18} className="text-success" />
              <p className="text-sm font-medium text-success">Treino concluído hoje!</p>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        {!sessionDone && (
          <div className="flex gap-2">
            <Button className="flex-1" size="lg" onClick={handleStart}>
              <Play size={18} /> Iniciar treino
            </Button>
            <Button variant="outline" size="lg" onClick={handleSkip} disabled={skipping}>
              <SkipForward size={16} />
              {skipping ? '...' : 'Pular'}
            </Button>
          </div>
        )}

        {/* Exercise list */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell size={14} />
              Exercícios ({v.exercises.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            {v.exercises.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum exercício cadastrado para esta variação.</p>
            ) : (
              v.exercises.map((ex, idx) => {
                const exName = ex.exercise_catalog?.name ?? ex.name ?? 'Exercício';
                const muscles = ex.exercise_catalog?.primary_muscles ?? [];
                return (
                  <div key={ex.id} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-5 text-center">{idx + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{exName}</p>
                      {muscles.length > 0 && (
                        <p className="text-xs text-muted-foreground capitalize truncate">{muscleLabel(muscles)}</p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold text-foreground">{ex.sets}×{repLabel(ex)}</p>
                      {ex.rest_seconds > 0 && (
                        <p className="text-xs text-muted-foreground">{ex.rest_seconds}s desc.</p>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
