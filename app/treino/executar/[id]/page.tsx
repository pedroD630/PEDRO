"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ChevronRight, Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function ExecutarPage() {
  const [reps, setReps] = useState(10);
  const [currentSerie, setCurrentSerie] = useState(1);
  const totalSeries = 3;
  const progress = ((currentSerie - 1) / totalSeries) * 100;

  return (
    <AppShell hideNav>
      <div className="px-4 pt-6 pb-6 space-y-5 min-h-screen flex flex-col">
        {/* Progresso geral */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Exercício 2 de 8</span>
            <span>Push Calistenia</span>
          </div>
          <Progress value={25} />
        </div>

        {/* Exercício atual */}
        <div className="flex-1 flex flex-col justify-center space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Flexão Declinada</h1>
            <p className="text-sm text-muted-foreground mt-1">Peitoral maior · Tríceps</p>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Meta</p>
            <p className="text-lg font-semibold text-foreground">
              {totalSeries} séries × 10–12 reps
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Último: 3×10 · sem peso</p>
          </div>

          {/* Série atual */}
          <Card>
            <CardContent className="pt-5 pb-5 space-y-5">
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  Série atual
                </p>
                <p className="text-4xl font-bold text-accent mt-1">
                  {currentSerie} / {totalSeries}
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground text-center mb-2">Repetições</p>
                  <div className="flex items-center justify-center gap-6">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setReps((r) => Math.max(1, r - 1))}
                    >
                      <Minus size={22} />
                    </Button>
                    <span className="text-4xl font-bold text-foreground w-16 text-center">
                      {reps}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setReps((r) => r + 1)}
                    >
                      <Plus size={22} />
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground text-center mb-2">Dificuldade</p>
                  <div className="flex gap-2 justify-center">
                    {["Com elástico", "Sem auxílio", "Com colete"].map((d) => (
                      <button
                        key={d}
                        className="px-2.5 py-1.5 rounded-full text-xs border border-border text-muted-foreground hover:border-accent hover:text-accent transition-colors"
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            variant="accent"
            size="lg"
            className="w-full"
            onClick={() => setCurrentSerie((s) => Math.min(s + 1, totalSeries + 1))}
          >
            <CheckCircle2 size={20} />
            Série concluída
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
