import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

export default function DiarioPage() {
  const today = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <AppShell>
      <div className="px-4 pt-6 pb-2 space-y-4">
        {/* Navegação de data */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon">
            <ChevronLeft size={20} />
          </Button>
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">{today}</p>
            <p className="text-xs text-muted-foreground">Hoje</p>
          </div>
          <Button variant="ghost" size="icon">
            <ChevronRight size={20} />
          </Button>
        </div>

        {/* Barra calórica */}
        <Card>
          <CardContent className="pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-accent">0 kcal</span>
              <span className="text-muted-foreground">meta 3.000 kcal</span>
            </div>
            <Progress value={0} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Proteínas: 0 g / 200 g</span>
            </div>
          </CardContent>
        </Card>

        {/* Lista vazia */}
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">Nenhuma refeição registrada hoje.</p>
          <p className="text-xs mt-1">Adicione sua primeira refeição abaixo.</p>
        </div>

        {/* Botão de adicionar */}
        <Button variant="accent" className="w-full" size="lg">
          <Plus size={20} />
          Adicionar refeição
        </Button>
      </div>
    </AppShell>
  );
}
