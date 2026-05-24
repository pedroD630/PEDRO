import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, ChevronRight, SkipForward, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function TreinoHojePage() {
  return (
    <AppShell>
      <div className="px-4 pt-6 pb-2 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="accent" className="mb-2">Segunda-feira</Badge>
            <h1 className="text-2xl font-bold text-foreground">Push</h1>
            <p className="text-sm text-muted-foreground">Push Calistenia 30min</p>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground gap-1">
            <RefreshCw size={14} />
            Trocar
          </Button>
        </div>

        {/* Lista de exercícios placeholder */}
        <div className="space-y-2">
          {["Flexão de braço", "Flexão declinada", "Flexão diamante", "Dips em cadeira", "Pike push-up"].map(
            (ex, i) => (
              <Card key={i}>
                <CardContent className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{ex}</p>
                    <p className="text-xs text-muted-foreground">3 × 10–12 reps</p>
                  </div>
                  <span className="text-muted-foreground text-xs">—</span>
                </CardContent>
              </Card>
            )
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button asChild variant="accent" className="flex-1" size="lg">
            <Link href="/treino/executar/new">
              <Play size={18} />
              Iniciar treino
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            <SkipForward size={18} />
            Pular
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
