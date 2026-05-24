'use client';

import { useEffect, useState, useCallback } from 'react';
import { Moon, Plus, Star, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const db = createClient();

function minutesToHM(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? `${h}h${m > 0 ? m + 'm' : ''}` : `${m}m`;
}

interface SleepEntry {
  id: string;
  date: string;
  duration_min: number;
  quality: 'poor' | 'fair' | 'good' | null;
  slept_at: string;
  woke_at: string;
}

// default to "yesterday 23:00"
function defaultSleepTime() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0] + 'T23:00';
}
function defaultWakeTime() {
  return new Date().toISOString().split('T')[0] + 'T07:00';
}

function qualityLabel(q: string | null) {
  if (q === 'good') return 'Ótimo';
  if (q === 'fair') return 'Razoável';
  if (q === 'poor') return 'Ruim';
  return null;
}
function qualityVariant(q: string | null): 'success' | 'accent' | 'outline' | 'muted' {
  if (q === 'good') return 'success';
  if (q === 'fair') return 'accent';
  if (q === 'poor') return 'outline';
  return 'muted';
}

export default function SonoPage() {
  const [entries, setEntries] = useState<SleepEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // form state
  const [sleptAt, setSleptAt] = useState(defaultSleepTime());
  const [wokeAt, setWokeAt] = useState(defaultWakeTime());
  const [quality, setQuality] = useState<'poor' | 'fair' | 'good' | ''>('');

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await db
      .from('sleep_log')
      .select('id,date,duration_min,quality,slept_at,woke_at')
      .order('date', { ascending: false })
      .limit(30);
    setEntries((data ?? []) as SleepEntry[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSave = async () => {
    if (!sleptAt || !wokeAt) return;
    setSaving(true);

    const sleptDate = new Date(sleptAt);
    const wokeDate = new Date(wokeAt);
    // if wake is before sleep (e.g. 07:00 < 23:00) add 1 day
    if (wokeDate <= sleptDate) wokeDate.setDate(wokeDate.getDate() + 1);
    const duration_min = Math.round((wokeDate.getTime() - sleptDate.getTime()) / 60000);
    const date = wokeDate.toISOString().split('T')[0];

    await db.from('sleep_log').insert({
      date,
      slept_at: sleptDate.toISOString(),
      woke_at: wokeDate.toISOString(),
      duration_min,
      quality: quality || null,
    });

    setSaving(false);
    setOpen(false);
    setSleptAt(defaultSleepTime());
    setWokeAt(defaultWakeTime());
    setQuality('');
    load();
  };

  const handleDelete = async (id: string) => {
    await db.from('sleep_log').delete().eq('id', id);
    load();
  };

  // stats
  const last7 = entries.slice(0, 7);
  const avg7 = last7.length > 0
    ? Math.round(last7.reduce((s, e) => s + e.duration_min, 0) / last7.length)
    : null;

  // week dots for last 7 calendar days
  const today = new Date();
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    const dStr = d.toISOString().split('T')[0];
    const entry = entries.find((e) => e.date === dStr);
    return { date: dStr, label: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][d.getDay()], entry };
  });

  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto pb-24 pt-6 px-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Moon size={18} className="text-accent" /> Sono
          </h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus size={16} /> Registrar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Registrar sono</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Dormi às</Label>
                  <Input
                    type="datetime-local"
                    value={sleptAt}
                    onChange={(e) => setSleptAt(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Acordei às</Label>
                  <Input
                    type="datetime-local"
                    value={wokeAt}
                    onChange={(e) => setWokeAt(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Qualidade</Label>
                  <div className="flex gap-2">
                    {(['poor', 'fair', 'good'] as const).map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuality(q === quality ? '' : q)}
                        className={[
                          'flex-1 rounded-lg py-2 text-sm border transition-colors',
                          quality === q
                            ? 'bg-accent text-accent-foreground border-accent'
                            : 'border-border text-muted-foreground hover:border-accent/50',
                        ].join(' ')}
                      >
                        {q === 'poor' ? '😴 Ruim' : q === 'fair' ? '😐 Ok' : '😊 Ótimo'}
                      </button>
                    ))}
                  </div>
                </div>
                {sleptAt && wokeAt && (() => {
                  const s = new Date(sleptAt);
                  const w = new Date(wokeAt);
                  if (w <= s) w.setDate(w.getDate() + 1);
                  const mins = Math.round((w.getTime() - s.getTime()) / 60000);
                  return mins > 0 ? (
                    <p className="text-sm text-center text-muted-foreground">
                      Duração: <strong className="text-foreground">{minutesToHM(mins)}</strong>
                    </p>
                  ) : null;
                })()}
                <Button className="w-full" onClick={handleSave} disabled={saving || !sleptAt || !wokeAt}>
                  {saving ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground mb-1">Último</p>
              <p className="text-xl font-bold text-foreground">
                {entries[0] ? minutesToHM(entries[0].duration_min) : '—'}
              </p>
              {entries[0]?.quality && (
                <Badge variant={qualityVariant(entries[0].quality)} className="text-xs mt-1">
                  {qualityLabel(entries[0].quality)}
                </Badge>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground mb-1">Média (7d)</p>
              <p className="text-xl font-bold text-foreground">
                {avg7 ? minutesToHM(avg7) : '—'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Week dots */}
        <Card>
          <CardHeader>
            <CardTitle>Últimos 7 dias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-1 justify-between">
              {weekDays.map(({ date, label, entry }) => (
                <div key={date} className="flex flex-col items-center gap-1 flex-1">
                  <div className={[
                    'w-full aspect-square rounded-full flex items-center justify-center text-[10px] font-bold max-w-[38px]',
                    entry
                      ? entry.duration_min >= 420 ? 'bg-success text-white' : 'bg-accent text-accent-foreground'
                      : 'bg-surface text-muted-foreground',
                  ].join(' ')}>
                    {entry ? <Star size={12} fill="currentColor" /> : label}
                  </div>
                  <span className="text-[9px] text-muted-foreground">
                    {entry ? minutesToHM(entry.duration_min) : label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* History */}
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => <div key={i} className="h-16 rounded-xl bg-surface animate-pulse" />)}
          </div>
        ) : entries.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <Moon size={32} className="text-muted-foreground mx-auto mb-2 opacity-40" />
              <p className="text-sm text-muted-foreground">Nenhum registro ainda.</p>
              <p className="text-xs text-muted-foreground mt-1">Toque em "Registrar" para começar.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {entries.map((e) => (
              <Card key={e.id}>
                <CardContent className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-xs text-muted-foreground">{e.date}</p>
                    <p className="font-semibold text-foreground">{minutesToHM(e.duration_min)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {e.quality && (
                      <Badge variant={qualityVariant(e.quality)} className="text-xs">
                        {qualityLabel(e.quality)}
                      </Badge>
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
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
