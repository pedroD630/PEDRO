import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, UtensilsCrossed, Dumbbell, Moon, Award } from "lucide-react";

function ScoreRing({ score }: { score: number }) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="#1C2B3A" strokeWidth="10" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="#E8A020"
            strokeWidth="10"
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
  return (
    <AppShell>
      <div className="px-4 pt-6 pb-2 space-y-4">
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
