import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle2 } from "lucide-react";

export default function HistoricoPage() {
  return (
    <AppShell>
      <div className="px-4 pt-6 pb-2 space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Histórico</h1>

        <div className="text-center py-12 text-muted-foreground">
          <CheckCircle2 size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Nenhum treino registrado ainda.</p>
          <p className="text-xs mt-1">Complete seu primeiro treino para ver o histórico.</p>
        </div>
      </div>
    </AppShell>
  );
}
