import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dumbbell, UtensilsCrossed, Moon, Flame, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const DAYS = ["D", "S", "T", "Q", "Q", "S", "S"];

function WeekDots({ filled }: { filled: number[] }) {
  return (
    <div className="flex gap-1.5">
      {DAYS.map((_, i) => (
        <div
          key={i}
          className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center ${
            filled.includes(i)
              ? "bg-accent text-accent-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {DAYS[i]}
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const today = new Date();
  const dateStr = today.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const caloriesConsumed = 1850;
  const caloriesTarget = 3000;
  const caloriesPct = Math.round((caloriesConsumed / caloriesTarget) * 100);
  const caloriesColor =
    caloriesPct >= 90 ? "text-success" : caloriesPct >= 60 ? "text-accent" : "text-red-400";

  return (
    <AppShell>
      <div className="px-4 pt-6 pb-2 space-y-4">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-foreground">
              Boa tarde, Pedro 👋
            </h1>
            <div className="flex items-center gap-1 bg-surface rounded-full px-3 py-1">
              <Flame size={16} className="text-accent" />
              <span className="text-sm font-bold text-accent">7</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground capitalize mt-0.5">{dateStr}</p>
        </div>

        {/* Treino do dia */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell size={14} />
              Treino de hoje
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-lg font-bold text-foreground">Push</p>
              <p className="text-sm text-muted-foreground">Push Calistenia 30min</p>
            </div>
            <div className="flex gap-2">
              <Button asChild className="flex-1" variant="accent">
                <Link href="/treino/hoje">
                  Iniciar treino <ChevronRight size={16} />
                </Link>
              </Button>
              <Button variant="outline" size="icon">
                <CheckCircle2 size={18} />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alimentação */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UtensilsCrossed size={14} />
              Alimentação hoje
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className={`font-bold ${caloriesColor}`}>{caloriesConsumed} kcal</span>
                <span className="text-muted-foreground">meta {caloriesTarget} kcal</span>
              </div>
              <Progress value={caloriesPct} />
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link href="/alimentacao/diario">
                Registrar refeição +
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Sono */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon size={14} />
              Sono ontem
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-foreground">7h20min</p>
                <p className="text-xs text-accent">⚠ Abaixo da meta (8h)</p>
              </div>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link href="/sono">
                Registrar sono +
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Progresso semanal */}
        <Card>
          <CardHeader>
            <CardTitle>Progresso semanal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground w-20">
                  <Dumbbell size={13} />
                  <span>Treino</span>
                </div>
                <WeekDots filled={[0, 1, 2]} />
                <span className="text-muted-foreground text-xs w-8 text-right">3/5</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground w-20">
                  <UtensilsCrossed size={13} />
                  <span>Calorias</span>
                </div>
                <WeekDots filled={[0, 1, 2, 3]} />
                <span className="text-muted-foreground text-xs w-8 text-right">4/7</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground w-20">
                  <Moon size={13} />
                  <span>Sono</span>
                </div>
                <WeekDots filled={[0, 1, 3]} />
                <span className="text-muted-foreground text-xs w-8 text-right">3/7</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
