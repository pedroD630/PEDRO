import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";

const WEEK_DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const DEFAULT_SLOTS = ["REST", "PUSH", "PULL", "REST", "LEGS", "FULL_BODY", "CARDIO"];
const SLOT_COLORS: Record<string, string> = {
  PUSH: "text-blue-400",
  PULL: "text-purple-400",
  LEGS: "text-green-400",
  FULL_BODY: "text-orange-400",
  CARDIO: "text-red-400",
  REST: "text-muted-foreground",
};

export default function RotinaPage() {
  return (
    <AppShell>
      <div className="px-4 pt-6 pb-2 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Minha Rotina</h1>
          <Button variant="ghost" size="icon">
            <Settings2 size={20} />
          </Button>
        </div>

        <div className="space-y-2">
          {WEEK_DAYS.map((day, i) => (
            <Card key={i}>
              <CardContent className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-8">{day}</span>
                  <span className={`text-sm font-semibold ${SLOT_COLORS[DEFAULT_SLOTS[i]]}`}>
                    {DEFAULT_SLOTS[i] === "REST" ? "Descanso" : DEFAULT_SLOTS[i]}
                  </span>
                </div>
                {DEFAULT_SLOTS[i] !== "REST" && (
                  <span className="text-xs text-muted-foreground">Calistenia 30min</span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Button variant="outline" className="w-full">
          Trocar rotina base
        </Button>
      </div>
    </AppShell>
  );
}
