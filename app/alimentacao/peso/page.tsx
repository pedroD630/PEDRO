import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingDown } from "lucide-react";

export default function PesoPage() {
  return (
    <AppShell>
      <div className="px-4 pt-6 pb-2 space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Histórico de Peso</h1>

        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="pt-4 text-center">
              <p className="text-xs text-muted-foreground">Atual</p>
              <p className="text-xl font-bold text-foreground">—</p>
              <p className="text-xs text-muted-foreground">kg</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <p className="text-xs text-muted-foreground">Inicial</p>
              <p className="text-xl font-bold text-foreground">—</p>
              <p className="text-xs text-muted-foreground">kg</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <p className="text-xs text-muted-foreground">Meta</p>
              <p className="text-xl font-bold text-accent">—</p>
              <p className="text-xs text-muted-foreground">kg</p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico placeholder */}
        <Card className="h-48 flex items-center justify-center">
          <p className="text-muted-foreground text-sm">Gráfico de evolução de peso</p>
        </Card>

        <Button variant="accent" className="w-full">
          <Plus size={18} />
          Registrar peso hoje
        </Button>
      </div>
    </AppShell>
  );
}
