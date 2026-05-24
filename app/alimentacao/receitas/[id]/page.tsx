"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Flame, Beef, DollarSign, Plus, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

interface Recipe {
  id: string;
  name: string;
  category: string;
  prep_time_min: number | null;
  calories: number;
  protein_g: number;
  cost_brl: number | null;
  ingredients: Ingredient[];
  steps: string[];
  substitutions: string[] | null;
  calorie_tips: string[] | null;
}

const CATEGORY_LABELS: Record<string, string> = {
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

function formatUnit(amount: number, unit: string): string {
  const unitMap: Record<string, string> = {
    ml: "ml",
    g: "g",
    unidade: amount === 1 ? "unidade" : "unidades",
    colher_sopa: amount === 1 ? "col. sopa" : "col. sopa",
    colher_cha: amount === 1 ? "col. chá" : "col. chá",
    fatia: amount === 1 ? "fatia" : "fatias",
    xicara: amount === 1 ? "xícara" : "xícaras",
    copo: amount === 1 ? "copo" : "copos",
    pitada: "pitada",
  };
  return unitMap[unit] ?? unit;
}

export default function ReceitaPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [showSubs, setShowSubs] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("recipes")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    setRecipe(data as Recipe | null);
    setLoading(false);
  }, [id]);

  useEffect(() => { load(); }, [load]);

  async function addToDiary() {
    if (!recipe) return;
    setAdding(true);
    const today = new Date().toISOString().split("T")[0];
    await supabase.from("food_log").insert({
      name: recipe.name,
      calories: recipe.calories,
      protein_g: recipe.protein_g,
      recipe_id: recipe.id,
      date: today,
      logged_at: new Date().toISOString(),
    } as any);
    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  if (loading) {
    return (
      <AppShell>
        <div className="px-4 pt-8 space-y-4 animate-pulse">
          <div className="h-6 bg-surface rounded w-2/3" />
          <div className="h-4 bg-surface rounded w-1/3" />
          <div className="h-32 bg-surface rounded-xl mt-4" />
        </div>
      </AppShell>
    );
  }

  if (!recipe) {
    return (
      <AppShell>
        <div className="px-4 pt-8 text-center text-muted-foreground">
          <p className="text-sm">Receita não encontrada.</p>
          <Button variant="ghost" className="mt-4" onClick={() => router.back()}>
            Voltar
          </Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="pb-28">
        {/* Back button + header */}
        <div className="px-4 pt-5 pb-4 border-b border-border">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-xs text-muted-foreground mb-4 hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} />
            Receitas
          </button>

          <Badge variant="accent" className="mb-2 capitalize">
            {CATEGORY_LABELS[recipe.category] ?? recipe.category}
          </Badge>
          <h1 className="text-xl font-bold text-foreground leading-snug">
            {recipe.name}
          </h1>
        </div>

        {/* Info bar */}
        <div className="bg-surface border-b border-border">
          <div className="flex justify-around py-3">
            {[
              recipe.prep_time_min != null && {
                icon: Clock,
                label: `${recipe.prep_time_min} min`,
              },
              { icon: Flame, label: `${recipe.calories} kcal` },
              { icon: Beef, label: `${Number(recipe.protein_g).toFixed(0)} g prot` },
              recipe.cost_brl != null && {
                icon: DollarSign,
                label: `R$ ${Number(recipe.cost_brl).toFixed(2)}`,
              },
            ]
              .filter(Boolean)
              .map((item: any) => (
                <div key={item.label} className="flex flex-col items-center gap-1">
                  <item.icon size={16} className="text-accent" />
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="px-4 pt-5 space-y-6">
          {/* Ingredients */}
          <div>
            <h2 className="text-base font-bold text-foreground mb-3">Ingredientes</h2>
            <div className="space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-accent mt-0.5 leading-none">•</span>
                  <span>
                    <span className="font-medium">
                      {ing.amount} {formatUnit(ing.amount, ing.unit)}
                    </span>{" "}
                    {ing.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div>
            <h2 className="text-base font-bold text-foreground mb-3">Modo de preparo</h2>
            <div className="space-y-3">
              {recipe.steps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <span className="flex-none w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-sm text-foreground leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Substitutions */}
          {recipe.substitutions && recipe.substitutions.length > 0 && (
            <div>
              <button
                onClick={() => setShowSubs((v) => !v)}
                className="flex items-center justify-between w-full text-base font-bold text-foreground mb-1"
              >
                Substituições
                {showSubs ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {showSubs && (
                <div className="space-y-2 mt-2">
                  {recipe.substitutions.map((sub, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-accent mt-0.5">→</span>
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Calorie tips */}
          {recipe.calorie_tips && recipe.calorie_tips.length > 0 && (
            <div>
              <button
                onClick={() => setShowTips((v) => !v)}
                className="flex items-center justify-between w-full text-base font-bold text-foreground mb-1"
              >
                Dicas para aumentar calorias
                {showTips ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {showTips && (
                <div className="space-y-2 mt-2">
                  {recipe.calorie_tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-accent mt-0.5">💡</span>
                      {tip}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Fixed CTA button */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 md:left-60 flex justify-center px-4 pb-3 pt-2 bg-gradient-to-t from-background to-transparent pointer-events-none">
        <div className="w-full max-w-2xl pointer-events-auto">
          <Button
            variant="accent"
            className={cn("w-full shadow-lg", added && "opacity-80")}
            size="lg"
            onClick={addToDiary}
            disabled={adding}
          >
            <Plus size={18} />
            {added ? "Adicionado ao diário!" : adding ? "Adicionando…" : "Adicionar ao diário de hoje"}
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
