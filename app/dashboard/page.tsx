'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Play, CheckCircle2, ChevronRight, Flame,
  Moon, Dumbbell, TrendingUp, Zap,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const db = createClient();
const DOW_LABELS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function todayStr() { return new Date().toISOString().split('T')[0]; }
function todayDow() { return new Date().getDay(); }
function minutesToHM(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? `${h}h${m > 0 ? m + 'm' : ''}` : `${m}m`;
}

interface TodayVariation {
  id: string;
  name: string;
  slot_name: string;
  estimated_duration_min: number | null;
}
interface DashData {
  userName: string;
  caloriesIn: number;
  caloriesTarget: number;
  proteinIn: number;
  proteinTarget: number;
  lastSleep: { duration_min: number; quality: string | null } | null;
  sleepTargetMin: number;
  todayVariation: TodayVariation | null;
  isRestDay: boolean;
  todaySessionDone: boolean;
  completedDows: Set<number>;
  streak: number;
}

async function fetchDashboard(): Promise<DashData> {
  const today = todayStr();
  const dow = todayDow();
  const since = new Date();
  since.setDate(since.getDate() - 6);
  since.setHours(0, 0, 0, 0);

  const [foodRes, sleepRes, profileRes, sessionsRes, slotRes, todayDoneRes] =
    await Promise.all([
      db.from('food_log').select('calories,protein_g').eq('date', today),
      db.from('sleep_log').select('duration_min,quality').order('date', { ascending: false }).limit(1).maybeSingle(),
      db.from('user_profile').select('daily_calories_target,daily_protein_target_g,sleep_target_hours,name').limit(1).maybeSingle(),
      db.from('workout_sessions').select('started_at,status').gte('started_at', since.toISOString()),
      db.from('routine_slots').select('id,slot_name').eq('default_day_of_week', dow).limit(1).maybeSingle(),
      db.from('workout_sessions').select('id').eq('status', 'completed').gte('started_at', `${today}T00:00:00`).limit(1).maybeSingle(),
    ]);

  const food = foodRes.data ?? [];
  const caloriesIn = food.reduce((s, r) => s + (r.calories ?? 0), 0);
  const proteinIn = food.reduce((s, r) => s + (r.protein_g ?? 0), 0);
  const caloriesTarget = profileRes.data?.daily_calories_target ?? 2000;
  const proteinTarget = profileRes.data?.daily_protein_target_g ?? 150;
  const sleepTargetMin = (profileRes.data?.sleep_target_hours ?? 8) * 60;
  const userName = profileRes.data?.name?.split(' ')[0] ?? 'Pedro';

  let todayVariation: TodayVariation | null = null;
  const isRestDay = !slotRes.data;
  if (slotRes.data) {
    const varRes = await db
      .from('workout_variations')
      .select('id,name,estimated_duration_min')
      .eq('slot_id', slotRes.data.id)
      .limit(1)
      .maybeSingle();
    if (varRes.data) todayVariation = { ...varRes.data, slot_name: slotRes.data.slot_name };
  }

  const sessions = sessionsRes.data ?? [];
  const completedDows = new Set(
    sessions.filter((s) => s.status === 'completed').map((s) => new Date(s.started_at).getDay())
  );

  // streak: consecutive days with completed session ending today
  let streak = 0;
  const check = new Date();
  for (let i = 0; i < 365; i++) {
    const dStr = check.toISOString().split('T')[0];
    const has = sessions.some((s) => s.status === 'completed' && s.started_at.startsWith(dStr));
    if (!has) break;
    streak++;
    check.setDate(check.getDate() - 1);
  }

  return {
    userName, caloriesIn, caloriesTarget, proteinIn, proteinTarget,
    lastSleep: sleepRes.data ?? null, sleepTargetMin,
    todayVariation, isRestDay, todaySessionDone: !!todayDoneRes.data,
    completedDows, streak,
  };
}

function WeekDots({ completedDows }: { completedDows: Set<number> }) {
  const today = todayDow();
  return (
    <div className="flex gap-1 justify-between">
      {DOW_LABELS.map((label, i) => {
        const done = completedDows.has(i);
        const isToday = i === today;
        return (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div className={[
              'w-full aspect-square rounded-full flex items-center justify-center text-[10px] font-bold max-w-[38px]',
              done ? 'bg-success text-white' : isToday ? 'border-2 border-accent text-accent' : 'bg-surface text-muted-foreground',
            ].join(' ')}>
              {done ? '✓' : label[0]}
            </div>
            <span className="text-[9px] text-muted-foreground">{label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashData | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try { setData(await fetchDashboard()); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSkip = async () => {
    if (!data?.todayVariation) return;
    await db.from('workout_sessions').insert({
      variation_id: data.todayVariation.id,
      started_at: new Date().toISOString(),
      finished_at: new Date().toISOString(),
      status: 'skipped',
    });
    load();
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';

  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto pb-24 pt-6 px-4 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{greeting},</p>
            <h1 className="text-2xl font-bold text-foreground">
              {loading ? '...' : `${data?.userName} 👋`}
            </h1>
          </div>
          {!loading && (data?.streak ?? 0) > 0 && (
            <Badge variant="accent" className="flex items-center gap-1 mt-1">
              <Flame size={12} /> {data!.streak} dias
            </Badge>
          )}
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 rounded-2xl bg-surface animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* Treino do dia */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell size={14} /> Treino de hoje
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data!.isRestDay ? (
                  <p className="text-sm text-muted-foreground">Dia de descanso 💤 Recupere-se bem!</p>
                ) : data!.todaySessionDone ? (
                  <div className="flex items-center gap-2 text-success text-sm font-medium">
                    <CheckCircle2 size={18} /> Treino concluído hoje!
                  </div>
                ) : data!.todayVariation ? (
                  <>
                    <div>
                      <Badge variant="outline" className="mb-1 text-xs">
                        {data!.todayVariation.slot_name}
                      </Badge>
                      <p className="font-semibold text-foreground">{data!.todayVariation.name}</p>
                      {data!.todayVariation.estimated_duration_min && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          ~{data!.todayVariation.estimated_duration_min} min
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        onClick={() => router.push(`/treino/executar/${data!.todayVariation!.id}`)}
                      >
                        <Play size={16} /> Iniciar
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={handleSkip}>
                        Já fiz
                      </Button>
                    </div>
                  </>
                ) : (
                  <Link href="/treino/rotina">
                    <p className="text-sm text-muted-foreground">Nenhum treino para hoje.</p>
                    <p className="text-xs text-accent mt-1">Configurar rotina →</p>
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* Alimentação */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame size={14} /> Alimentação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-2xl font-bold text-foreground">{data!.caloriesIn}</span>
                    <span className="text-sm text-muted-foreground"> / {data!.caloriesTarget} kcal</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{Math.round(data!.proteinIn)}g prot</span>
                </div>
                {(() => {
                  const pct = Math.min(100, Math.round((data!.caloriesIn / data!.caloriesTarget) * 100));
                  const color = pct >= 90 ? '[&>div]:bg-red-500' : pct >= 60 ? '[&>div]:bg-success' : '[&>div]:bg-accent';
                  return <Progress value={pct} className={`h-2 ${color}`} />;
                })()}
                <Link href="/alimentacao/diario">
                  <Button variant="outline" size="sm" className="w-full">
                    {data!.caloriesIn > 0 ? 'Ver diário' : 'Adicionar refeição'}
                    <ChevronRight size={14} />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Sono */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon size={14} /> Sono
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data!.lastSleep ? (
                  <>
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-2xl font-bold text-foreground">
                          {minutesToHM(data!.lastSleep.duration_min)}
                        </span>
                        <span className="text-sm text-muted-foreground"> último registro</span>
                      </div>
                      {data!.lastSleep.quality && (
                        <Badge
                          variant={data!.lastSleep.quality === 'good' ? 'success' : data!.lastSleep.quality === 'fair' ? 'accent' : 'outline'}
                          className="text-xs"
                        >
                          {data!.lastSleep.quality === 'good' ? 'Ótimo' : data!.lastSleep.quality === 'fair' ? 'Razoável' : 'Ruim'}
                        </Badge>
                      )}
                    </div>
                    <Progress value={Math.min(100, Math.round((data!.lastSleep.duration_min / data!.sleepTargetMin) * 100))} className="h-2" />
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Sem registro de sono ainda.</p>
                )}
                <Link href="/sono">
                  <Button variant="outline" size="sm" className="w-full">
                    {data!.lastSleep ? 'Ver sono' : 'Registrar sono'}
                    <ChevronRight size={14} />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Semana */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp size={14} /> Semana
                </CardTitle>
              </CardHeader>
              <CardContent>
                <WeekDots completedDows={data!.completedDows} />
              </CardContent>
            </Card>

            {/* Insights */}
            <Link href="/insights">
              <Card className="border-dashed border-accent/30 hover:border-accent/60 transition-colors cursor-pointer">
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap size={14} className="text-accent" />
                    Ver insights da semana
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          </>
        )}
      </div>
    </AppShell>
  );
}
