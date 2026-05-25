"use client";

import { useEffect, useState, useCallback } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Settings2, ChevronRight, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const DAY_NAMES = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const SLOT_COLORS: Record<string, string> = {
  PUSH:      "text-blue-400",
  PULL:      "text-purple-400",
  LEGS:      "text-green-400",
  FULL_BODY: "text-orange-400",
  CARDIO:    "text-red-400",
  SKILLS:    "text-yellow-400",
  CORE:      "text-pink-400",
  REST:      "text-muted-foreground",
};

interface Routine {
  id: string;
  name: string;
  description: string;
}

interface Slot {
  id: string;
  slot_name: string;
  default_day_of_week: number;
  default_day_label: string;
  routine_id: string;
}

interface Variation {
  id: string;
  name: string;
  estimated_duration_min: number;
  slot_id: string;
}

interface DayRow {
  dow: number;
  label: string;
  slot: Slot | null;
  variation: Variation | null;
}

export default function RotinaPage() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [activeRoutineId, setActiveRoutineId] = useState<string | null>(null);
  const [days, setDays] = useState<DayRow[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialogs
  const [showRoutinePicker, setShowRoutinePicker] = useState(false);
  const [switching, setSwitching] = useState(false);

  // ── Load routines list ──────────────────────────────────────
  const loadRoutines = useCallback(async () => {
    const { data } = await supabase
      .from("workout_routines")
      .select("id, name, description")
      .order("name");
    if (data) setRoutines(data as Routine[]);
  }, []);

  // ── Load slots + variations for the active routine ──────────
  const loadDays = useCallback(async (routineId: string) => {
    const { data: slots } = await supabase
      .from("routine_slots")
      .select("id, slot_name, default_day_of_week, default_day_label, routine_id")
      .eq("routine_id", routineId)
      .order("default_day_of_week");

    const slotIds = (slots ?? []).map((s: any) => s.id);

    const { data: variations } =
      slotIds.length > 0
        ? await supabase
            .from("workout_variations")
            .select("id, name, estimated_duration_min, slot_id")
            .in("slot_id", slotIds)
        : { data: [] };

    // Build 7-day grid
    const slotByDow: Record<number, Slot> = {};
    (slots ?? []).forEach((s: any) => { slotByDow[s.default_day_of_week] = s; });

    const varBySlot: Record<string, Variation> = {};
    (variations ?? []).forEach((v: any) => { varBySlot[v.slot_id] = v; });

    const grid: DayRow[] = DAY_NAMES.map((label, dow) => {
      const slot = slotByDow[dow] ?? null;
      return {
        dow,
        label,
        slot,
        variation: slot ? (varBySlot[slot.id] ?? null) : null,
      };
    });

    setDays(grid);
  }, []);

  // ── Initial load ────────────────────────────────────────────
  useEffect(() => {
    async function init() {
      setLoading(true);
      const { data: rList } = await supabase
        .from("workout_routines")
        .select("id, name, description")
        .order("name");

      if (!rList || rList.length === 0) {
        setLoading(false);
        return;
      }

      setRoutines(rList as Routine[]);

      // Use first routine as default (could be persisted in user_profile later)
      const firstId = rList[0].id;
      setActiveRoutineId(firstId);
      await loadDays(firstId);
      setLoading(false);
    }
    init();
  }, [loadDays]);

  // ── Switch routine ──────────────────────────────────────────
  async function switchRoutine(routineId: string) {
    setSwitching(true);
    setActiveRoutineId(routineId);
    await loadDays(routineId);
    setSwitching(false);
    setShowRoutinePicker(false);
  }

  const activeRoutine = routines.find((r) => r.id === activeRoutineId);

  return (
    <AppShell>
      <div className="px-4 pt-6 pb-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Minha Rotina</h1>
            {activeRoutine && (
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                {activeRoutine.name}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowRoutinePicker(true)}
            title="Trocar rotina"
          >
            <Settings2 size={20} />
          </Button>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="bg-surface rounded-xl p-4 animate-pulse h-14" />
            ))}
          </div>
        )}

        {/* Day grid */}
        {!loading && days.length > 0 && (
          <div className="space-y-2">
            {days.map((row) => {
              const isRest = !row.slot || row.slot.slot_name === "REST";
              return (
                <div
                  key={row.dow}
                  className="bg-surface rounded-xl px-4 py-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-8 shrink-0">
                      {row.label}
                    </span>
                    <div>
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          row.slot
                            ? SLOT_COLORS[row.slot.slot_name] ?? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {isRest
                          ? "Descanso"
                          : row.slot?.slot_name ?? "—"}
                      </span>
                      {row.variation && (
                        <p className="text-xs text-muted-foreground leading-none mt-0.5">
                          {row.variation.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {!isRest && row.variation && (
                    <span className="text-xs text-muted-foreground shrink-0">
                      {row.variation.estimated_duration_min} min
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!loading && days.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">Nenhuma rotina encontrada.</p>
            <p className="text-xs mt-1 opacity-70">Rode o seed para popular as rotinas.</p>
          </div>
        )}

        {/* CTA */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setShowRoutinePicker(true)}
        >
          Trocar rotina base
          <ChevronRight size={16} className="ml-auto" />
        </Button>
      </div>

      {/* Routine picker dialog */}
      <Dialog open={showRoutinePicker} onOpenChange={setShowRoutinePicker}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Escolha uma rotina</DialogTitle>
          </DialogHeader>

          <div className="space-y-2 mt-2">
            {routines.map((r) => {
              const isActive = r.id === activeRoutineId;
              return (
                <button
                  key={r.id}
                  onClick={() => switchRoutine(r.id)}
                  disabled={switching}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-xl transition-colors flex items-start gap-3",
                    isActive
                      ? "bg-accent/10 border border-accent/30"
                      : "bg-surface hover:bg-background"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "text-sm font-semibold",
                        isActive ? "text-accent" : "text-foreground"
                      )}
                    >
                      {r.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {r.description}
                    </p>
                  </div>
                  {isActive && (
                    <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
