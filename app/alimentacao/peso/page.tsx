'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, TrendingDown, TrendingUp, Minus, Trash2, Scale } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const db = createClient();

interface WeightEntry {
  id: string;
  date: string;
  weight_kg: number;
}

function fmtDate(d: Date) { return d.toISOString().split('T')[0]; }

export default function PesoPage() {
  const [entries, setEntries] = useState<WeightEntry[]>([]);
  const [goalWeight, setGoalWeight] = useState<number | null>(null);
  const [initialWeight, setInitialWeight] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [weight, setWeight] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const [weightRes, profileRes] = await Promise.all([
      db.from('weight_log').select('id,date,weight_kg').order('date', { ascending: false }).limit(60),
      db.from('user_profile').select('goal_weight_kg,weight_kg').limit(1).maybeSingle(),
    ]);
    setEntries((weightRes.data ?? []) as WeightEntry[]);
    if (profileRes.data) {
      setGoalWeight(profileRes.data.goal_weight_kg ?? null);
      setInitialWeight(profileRes.data.weight_kg ?? null);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async () => {
    if (!weight) return;
    setSaving(true);
    await db.from('weight_log').insert({
      date: fmtDate(new Date()),
      weight_kg: Number(weight),
    });
    setSaving(false);
    setOpen(false);
    setWeight('');
    load();
  };

  const handleDelete = async (id: string) => {
    await db.from('weight_log').delete().eq('id', id);
    load();
  };

  const current = entries[0]?.weight_kg ?? null;
  const previous = entries[1]?.weight_kg ?? null;
  const diff = current && previous ? current - previous : null;

  const progressPct = (() => {
    if (!current || !initialWeight || !goalWeight) return null;
    const total = initialWeight - goalWeight;
    const done = initialWeight - current;
    if (total === 0) return 100;
    return Math.max(0, Math.min(100, Math.round((done / total) * 100)));
  })();

  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto pb-24 pt-6 px-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Scale size={18} className="text-accent" /> Peso
          </h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus size={16} /> Registrar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Registrar peso de hoje</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Peso (kg)</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 82.5"
                    step="0.1"
                    min={30}
                    max={250}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    autoFocus
                  />
                </div>
                {current && weight && (
                  <p className="text-sm text-center text-muted-foreground">
                    Variação:{' '}
                    <strong className={Number(weight) < current ? 'text-success' : 'text-red-400'}>
                      {(Number(weight) - current) > 0 ? '+' : ''}{(Number(weight) - current).toFixed(1)} kg
                    </strong>
                  </p>
                )}
                <Button
                  className="w-full"
                  onClick={handleSave}
                  disabled={saving || !weight}
                >
                  {saving ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <Card>
            <CardContent className="pt-4 pb-3">
              <p className="text-[11px] text-muted-foreground mb-1">Atual</p>
              <p className="text-lg font-bold text-foreground">
                {current ? `${current}` : '—'}
                <span className="text-xs font-normal text-muted-foreground"> kg</span>
              </p>
              {diff !== null && (
                <div className={`flex items-center gap-0.5 text-xs mt-0.5 ${diff < 0 ? 'text-success' : diff > 0 ? 'text-red-400' : 'text-muted-foreground'}`}>
                  {diff < 0 ? <TrendingDown size={10} /> : diff > 0 ? <TrendingUp size={10} /> : <Minus size={10} />}
                  {diff !== 0 ? `${diff > 0 ? '+' : ''}${diff.toFixed(1)}` : '0'}
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-3">
              <p className="text-[11px] text-muted-foreground mb-1">Inicial</p>
              <p className="text-lg font-bold text-foreground">
                {initialWeight ? `${initialWeight}` : '—'}
                <span className="text-xs font-normal text-muted-foreground"> kg</span>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-3">
              <p className="text-[11px] text-muted-foreground mb-1">Meta</p>
              <p className="text-lg font-bold text-foreground">
                {goalWeight ? `${goalWeight}` : '—'}
                <span className="text-xs font-normal text-muted-foreground"> kg</span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Progress toward goal */}
        {progressPct !== null && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Progresso na meta</span>
                <Badge variant={progressPct >= 100 ? 'success' : 'accent'}>
                  {progressPct}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-3 rounded-full bg-surface overflow-hidden">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              {current && goalWeight && (
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  {current > goalWeight
                    ? `Faltam ${(current - goalWeight).toFixed(1)} kg para a meta`
                    : 'Meta atingida! 🎉'}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* History */}
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => <div key={i} className="h-14 rounded-xl bg-surface animate-pulse" />)}
          </div>
        ) : entries.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center">
              <Scale size={32} className="text-muted-foreground mx-auto mb-2 opacity-40" />
              <p className="text-sm text-muted-foreground">Nenhum registro ainda.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {entries.map((e, idx) => {
              const prevKg = entries[idx + 1]?.weight_kg;
              const d = prevKg ? e.weight_kg - prevKg : null;
              return (
                <Card key={e.id}>
                  <CardContent className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-xs text-muted-foreground">{e.date}</p>
                      <p className="font-semibold text-foreground">{e.weight_kg} kg</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {d !== null && (
                        <span className={`text-xs ${d < 0 ? 'text-success' : d > 0 ? 'text-red-400' : 'text-muted-foreground'}`}>
                          {d > 0 ? '+' : ''}{d.toFixed(1)}
                        </span>
                      )}
                      <button
                        onClick={() => handleDelete(e.id)}
                        className="p-1.5 text-muted-foreground hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
