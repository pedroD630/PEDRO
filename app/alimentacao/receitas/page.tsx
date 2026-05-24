import { AppShell } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Flame, Beef, ChevronRight } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  "Todos",
  "Café da manhã",
  "Almoço",
  "Pré-treino",
  "Pós-treino",
  "Jantar",
  "Lanche rápido",
  "Vitaminas",
];

export default function ReceitasPage() {
  return (
    <AppShell>
      <div className="px-4 pt-6 pb-2 space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Receitas</h1>

        {/* Filtros de categoria */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                cat === "Todos"
                  ? "bg-accent text-accent-foreground"
                  : "bg-surface text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Placeholder — receitas virão do seed data */}
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">Receitas serão carregadas do banco de dados.</p>
          <p className="text-xs mt-1">Configure o Supabase e rode o seed para ver as receitas.</p>
        </div>
      </div>
    </AppShell>
  );
}
