import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Beef, Moon } from "lucide-react";

export default function MetasPage() {
  return (
    <AppShell>
      <div className="px-4 pt-6 pb-2 space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Metas</h1>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame size={14} />
              Alimentação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Calorias diárias</label>
              <input
                type="number"
                defaultValue="3000"
                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Proteínas diárias (g)</label>
              <input
                type="number"
                defaultValue="200"
                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon size={14} />
              Sono
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <label className="text-xs text-muted-foreground">Horas de sono por noite</label>
            <input
              type="number"
              defaultValue="8"
              className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </CardContent>
        </Card>

        <Button variant="accent" className="w-full">
          Salvar metas
        </Button>
      </div>
    </AppShell>
  );
}
