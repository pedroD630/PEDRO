import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, CheckCircle2, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function ResumoPage() {
  return (
    <AppShell hideNav>
      <div className="px-4 pt-6 pb-6 space-y-4">
        <div className="text-center py-6">
          <Trophy size={48} className="mx-auto text-accent mb-3" />
          <h1 className="text-2xl font-bold text-foreground">Treino concluído!</h1>
          <p className="text-sm text-muted-foreground mt-1">Push Calistenia 30min</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="pt-4 text-center">
              <Clock size={18} className="mx-auto text-accent mb-1" />
              <p className="text-lg font-bold text-foreground">—</p>
              <p className="text-xs text-muted-foreground">minutos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <CheckCircle2 size={18} className="mx-auto text-success mb-1" />
              <p className="text-lg font-bold text-foreground">—/—</p>
              <p className="text-xs text-muted-foreground">exercícios</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <TrendingUp size={18} className="mx-auto text-accent mb-1" />
              <p className="text-lg font-bold text-foreground">—</p>
              <p className="text-xs text-muted-foreground">volume</p>
            </CardContent>
          </Card>
        </div>

        {/* Insight */}
        <Card className="border border-accent/30 bg-accent/5">
          <CardHeader>
            <CardTitle className="text-accent">💡 Insight do treino</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground">
              Treino registrado! Continue assim — a consistência é o que gera resultados.
            </p>
          </CardContent>
        </Card>

        <Button asChild variant="accent" className="w-full" size="lg">
          <Link href="/dashboard">Salvar e voltar</Link>
        </Button>
      </div>
    </AppShell>
  );
}
