'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus, ChevronLeft, ChevronRight, Trash2, UtensilsCrossed } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { UserProfileRow, Tables } from '@/lib/supabase/types';
type FoodLogInsert = Tables['food_log']['Insert'];
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const db = createClient();

interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein_g: number | null;
  notes: string | null;
  logged_at: string;
}

function fmtDate(d: Date) { return d.toISOString().split('T')[0]; }

function dateLabel(dateStr: string) {
  const today = fmtDate(new Date());
  const yesterday = fmtDate(new Date(Date.now() - 86400000));
  if (dateStr === today) return 'Hoje';
  if (dateStr === yesterday) return 'Ontem';
  return new Date(dateStr + 'T12:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

export default function DiarioPage() {
  const [date, setDate] = useState(fmtDate(new Date()));
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [caloriesTarget, setCaloriesTarget] = useState(2000);
  const [proteinTarget, setProteinTarget] = useState(150);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // form
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [notes, setNotes] = useState('');

  const load = useCallback(async (d: string) => {
    setLoading(true);
    const [foodRes, profileRes] = await Promise.all([
      db.from('food_log').select('*').eq('date', d).order('logged_at'),
      db.from('user_profile').select('*').limit(1).maybeSingle(),
    ]);
    setEntries((foodRes.data ?? []) as FoodEntry[]);
    const profile = profileRes.data as UserProfileRow | null;
    if (profile) {
      setCaloriesTarget(profile.daily_calories_target ?? 2000);
      setProteinTarget(profile.daily_protein_target_g ?? 150);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(date); }, [date, load]);

  const prevDay = () => {
    const d = new Date(date + 'T12:00');
    d.setDate(d.getDate() - 1);
    setDate(fmtDate(d));
  };
  const nextDay = () => {
    const d = new Date(date + 'T12:00');
    d.setDate(d.getDate() + 1);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (d <= tomorrow) setDate(fmtDate(d));
  };

  const handleSave = async () => {
    if (!name || !calories) return;
    setSaving(true);
    const row: FoodLogInsert = {
      date,
      logged_at: new Date().toISOString(),
      name: name.trim(),
      calories: Number(calories),
      protein_g: protein ? Number(protein) : null,
      notes: notes.trim() || null,
      recipe_id: null,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await db.from('food_log').insert(row as any);
    setSaving(false);
    setOpen(false);
    setName(''); setCalories(''); setProtein(''); setNotes('');
    load(date);
  };

  const handleDelete = async (id: string) => {
    await db.from('food_log').delete().eq('id', id);
    load(date);
  };

  const totalCal = entries.reduce((s, e) => s + e.calories, 0);
  const totalProt = entries.reduce((s, e) => s + (e.protein_g ?? 0), 0);
  const calPct = Math.min(100, Math.round((totalCal / caloriesTarget) * 100));
  const protPct = Math.min(100, Math.round((totalProt / proteinTarget) * 100));
  const calColor = calPct >= 90 ? '[&>div]:bg-red-500' : calPct >= 60 ? '[&>div]:bg-success' : '[&>div]:bg-accent';

  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto pb-24 pt-6 px-4 space-y-4">
        {/* Date nav */}
        <div className="flex items-center justify-between">
          <button onClick={prevDay} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-base font-semibold text-foreground">{dateLabel(date)}</h1>
          <button
            onClick={nextDay}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
            disabled={date === fmtDate(new Date())}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Progress */}
        <Card>
          <CardContent className="pt-4 space-y-3">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-2xl font-bold text-foreground">{totalCal}</span>
                <span className="text-sm text-muted-foreground"> / {caloriesTarget} kcal</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {Math.round(totalProt)}g / {proteinTarget}g prot
              </span>
            </div>
            <Progress value={calPct} className={`h-2 ${calColor}`} />
            <Progress value={protPct} className="h-1.5 [&>div]:bg-blue-400 opacity-60" />
          </CardContent>
        </Card>

        {/* Add button */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" size="lg">
              <Plus size={18} /> Adicionar refeição
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar refeição</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Nome *</Label>
                <Input
                  placeholder="Ex: Arroz com frango"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Calorias (kcal) *</Label>
                  <Input
                    type="number"
                    placeholder="350"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    min={0}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Proteína (g)</Label>
                  <Input
                    type="number"
                    placeholder="30"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                    min={0}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Notas</Label>
                <Input
                  placeholder="Opcional"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              <Button
                className="w-full"
                onClick={handleSave}
                disabled={saving || !name || !calories}
              >
                {saving ? 'Salvando...' : 'Adicionar'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* List */}
        {loading ? (
          <div className="space-y-2">
            {[1, 2].map((i) => <div key={i} className="h-16 rounded-xl bg-surface animate-pulse" />)}
          </div>
        ) : entries.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center">
              <UtensilsCrossed size={32} className="text-muted-foreground mx-auto mb-2 opacity-40" />
              <p className="text-sm text-muted-foreground">Nenhuma refeição registrada.</p>
              <p className="text-xs text-muted-foreground mt-1">Toque em "Adicionar refeição" acima.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {entries.map((e) => (
              <Card key={e.id}>
                <CardContent className="flex items-center justify-between py-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">{e.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {e.calories} kcal{e.protein_g ? ` · ${e.protein_g}g prot` : ''}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(e.id)}
                    className="ml-3 p-1.5 text-muted-foreground hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    <Trash2 size={15} />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
