"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const STEPS = ["Dados pessoais", "Metas calóricas", "Rotina de treino", "Meta de sono"];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const isLast = step === STEPS.length - 1;

  return (
    <div className="min-h-screen bg-background flex flex-col px-4 py-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">
            Passo {step + 1} de {STEPS.length}
          </span>
          <span className="text-xs text-muted-foreground">{STEPS[step]}</span>
        </div>
        <div className="flex gap-1">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-accent" : "bg-surface"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">{STEPS[step]}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {step === 0 && "Vamos começar com suas informações básicas."}
          {step === 1 && "Calculamos suas metas automaticamente. Você pode ajustar."}
          {step === 2 && "Escolha sua rotina de treino base."}
          {step === 3 && "Quanto tempo você quer dormir por noite?"}
        </p>
      </div>

      {/* Step content */}
      <Card className="flex-1">
        <CardContent className="pt-6 space-y-4">
          {step === 0 && (
            <>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Nome</label>
                <input
                  className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Pedro"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Data de nascimento</label>
                <input
                  type="date"
                  className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Sexo biológico</label>
                <div className="flex gap-2">
                  {["Masculino", "Feminino"].map((s) => (
                    <button
                      key={s}
                      className="flex-1 py-2.5 rounded-lg border border-border text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Altura (cm)</label>
                  <input
                    type="number"
                    className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="175"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Peso atual (kg)</label>
                  <input
                    type="number"
                    className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="80"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Objetivo de peso (kg)</label>
                <input
                  type="number"
                  className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="90"
                />
              </div>
            </>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="bg-background rounded-lg p-4 space-y-1">
                <p className="text-xs text-muted-foreground">Calorias diárias calculadas (Harris-Benedict)</p>
                <p className="text-3xl font-bold text-accent">3.000 kcal</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Ajustar calorias diárias</label>
                <input
                  type="number"
                  className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  defaultValue="3000"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Meta de proteínas (g/dia)</label>
                <input
                  type="number"
                  className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  defaultValue="200"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              {[
                { id: "ppl_30min", name: "Push/Pull/Legs 30min", desc: "Seg–Sex + Full Body Sáb + Cardio Dom" },
                { id: "calistenia_4x", name: "Calistenia 4x", desc: "Push / Pull / Legs / Full Body" },
                { id: "full_body_fofo", name: "Full Body Calistênico", desc: "3 treinos rotativos" },
              ].map((r) => (
                <button
                  key={r.id}
                  className="w-full text-left rounded-xl border border-border p-4 hover:border-accent transition-colors"
                >
                  <p className="font-semibold text-foreground text-sm">{r.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.desc}</p>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Horas de sono por noite</label>
                <div className="flex items-center gap-4">
                  <button className="w-10 h-10 rounded-full bg-surface text-foreground text-xl font-bold">−</button>
                  <span className="text-4xl font-bold text-accent flex-1 text-center">8h</span>
                  <button className="w-10 h-10 rounded-full bg-surface text-foreground text-xl font-bold">+</button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Recomendado: 7–9 horas para adultos
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        {step > 0 && (
          <Button
            variant="outline"
            onClick={() => setStep((s) => s - 1)}
            className="flex-none"
          >
            <ChevronLeft size={18} />
          </Button>
        )}
        <Button
          variant="accent"
          className="flex-1"
          onClick={() => {
            if (isLast) {
              router.push("/dashboard");
            } else {
              setStep((s) => s + 1);
            }
          }}
        >
          {isLast ? "Começar" : "Próximo"}
          {!isLast && <ChevronRight size={18} />}
        </Button>
      </div>
    </div>
  );
}
