import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Plus, Star } from "lucide-react";

const QUALITY_OPTIONS = [
  { value: "poor", label: "😴 Ruim" },
  { value: "fair", label: "😐 Regular" },
  { value: "good", label: "😊 Boa" },
];

const WEEK_DAYS = ["D", "S", "T", "Q", "Q", "S", "S"];

export default function SonoPage() {
  return (
    <AppShell>
      <div className="px-4 pt-6 pb-2 space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Sono</h1>

        {/* Cards de resumo */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="pt-4 text-center">
              <p className="text-xs text-muted-foreground">Ontem</p>
              <p className="text-xl font-bold text-foreground">—</p>
              <p className="text-xs text-muted-foreground">horas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <p className="text-xs text-muted-foreground">Média</p>
              <p className="text-xl font-bold text-foreground">—</p>
              <p className="text-xs text-muted-foreground">semana</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <p className="text-xs text-muted-foreground">Streak</p>
              <p className="text-xl font-bold text-accent">—</p>
              <p className="text-xs text-muted-foreground">noites</p>
            </CardContent>
          </Card>
        </div>

        {/* Semana visual */}
        <Card>
          <CardHeader>
            <CardTitle>Esta semana</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              {WEEK_DAYS.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                    <Moon size={16} className="text-muted-foreground" />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{d}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button variant="accent" className="w-full" size="lg">
          <Plus size={18} />
          Registrar sono de hoje
        </Button>
      </div>
    </AppShell>
  );
}
