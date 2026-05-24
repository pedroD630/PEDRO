import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Flame, Beef, DollarSign, Plus } from "lucide-react";

export default function ReceitaPage({ params }: { params: { id: string } }) {
  return (
    <AppShell>
      <div className="pb-24">
        {/* Header colorido */}
        <div className="bg-primary px-4 pt-8 pb-6">
          <Badge variant="accent" className="mb-3">Café da manhã</Badge>
          <h1 className="text-2xl font-bold text-foreground">Vitamina Hipercalórica</h1>
          <p className="text-sm text-muted-foreground mt-1">Rápida e nutritiva para ganho de massa</p>
        </div>

        {/* Info bar */}
        <div className="bg-surface px-4 py-3 flex justify-around border-b border-border">
          {[
            { icon: Clock, label: "5 min" },
            { icon: Flame, label: "500 kcal" },
            { icon: Beef, label: "35 g prot" },
            { icon: DollarSign, label: "R$ 8" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon size={16} className="text-accent" />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>

        <div className="px-4 pt-5 space-y-6">
          {/* Ingredientes */}
          <div>
            <h2 className="text-base font-bold text-foreground mb-3">Ingredientes</h2>
            <div className="space-y-2">
              {["250ml leite integral", "1 banana", "2 col sopa aveia", "30g whey protein"].map(
                (ing) => (
                  <div key={ing} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="text-accent mt-1">•</span>
                    {ing}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Modo de preparo */}
          <div>
            <h2 className="text-base font-bold text-foreground mb-3">Modo de preparo</h2>
            <div className="space-y-3">
              {[
                "Coloque todos os ingredientes no liquidificador.",
                "Bata por 1 minuto até ficar homogêneo.",
                "Sirva imediatamente.",
              ].map((step, i) => (
                <div key={i} className="flex gap-3">
                  <span className="flex-none w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-sm text-foreground leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Botão fixo */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 pb-3">
        <Button variant="accent" className="w-full shadow-lg" size="lg">
          <Plus size={18} />
          Adicionar ao diário de hoje
        </Button>
      </div>
    </AppShell>
  );
}
