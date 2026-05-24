"use client";

import { useEffect, useState, useCallback } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Clock, Flame, Beef } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface Recipe {
  id: string;
  name: string;
  category: string;
  prep_time_min: number | null;
  calories: number;
  protein_g: number;
  cost_brl: number | null;
}

const CATEGORY_LABELS: Record<string, string> = {
  "todos": "Todos",
  "café da manhã": "Café da manhã",
  "lanche rápido": "Lanche rápido",
  "almoço": "Almoço",
  "pré-treino": "Pré-treino",
  "pós-treino": "Pós-treino",
  "jantar": "Jantar",
  "ceia": "Ceia",
  "vitaminas hipercalóricas": "Vitaminas",
  "lanche noturno": "Lanche noturno",
};

export default function ReceitasPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<string[]>(["todos"]);
  const [activeCategory, setActiveCategory] = useState("todos");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("recipes")
      .select("id, name, category, prep_time_min, calories, protein_g, cost_brl")
      .order("category")
      .order("name");

    if (data) {
      setRecipes(data);
      const cats = Array.from(new Set(data.map((r: Recipe) => r.category)));
      setCategories(["todos", ...cats]);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered =
    activeCategory === "todos"
      ? recipes
      : recipes.filter((r) => r.category === activeCategory);

  return (
    <AppShell>
      <div className="px-4 pt-6 pb-6 space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Receitas</h1>

        {/* Category filter chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4">
          {categories.map((cat) => {
            const label = CATEGORY_LABELS[cat] ?? cat;
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "bg-surface text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-surface rounded-xl p-4 animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">Nenhuma receita encontrada.</p>
            <p className="text-xs mt-1 opacity-70">
              Rode o seed para popular as receitas.
            </p>
          </div>
        )}

        {/* Recipe cards */}
        {!loading && filtered.length > 0 && (
          <div className="space-y-3">
            {filtered.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/alimentacao/receitas/${recipe.id}`}
                className="block bg-surface rounded-xl p-4 hover:bg-surface/80 active:scale-[0.99] transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
                      {recipe.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 capitalize">
                      {CATEGORY_LABELS[recipe.category] ?? recipe.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3">
                  {recipe.prep_time_min != null && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={12} className="text-accent" />
                      {recipe.prep_time_min} min
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Flame size={12} className="text-accent" />
                    {recipe.calories} kcal
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Beef size={12} className="text-accent" />
                    {Number(recipe.protein_g).toFixed(0)} g prot
                  </span>
                  {recipe.cost_brl != null && (
                    <span className="text-xs text-muted-foreground ml-auto">
                      R$ {Number(recipe.cost_brl).toFixed(2)}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
