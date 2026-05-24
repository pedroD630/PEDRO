import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";

const NOTIFICATIONS = [
  { label: "Café da manhã", time: "08:00" },
  { label: "Almoço", time: "12:00" },
  { label: "Jantar", time: "19:00" },
  { label: "Treino não registrado", time: "21:00" },
  { label: "Registrar sono", time: "07:30" },
  { label: "Streak ativo — não perca hoje", time: "20:00" },
];

export default function NotificacoesPage() {
  return (
    <AppShell>
      <div className="px-4 pt-6 pb-2 space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Notificações</h1>

        <Card>
          <CardContent className="pt-4 space-y-4">
            {NOTIFICATIONS.map((n, i) => (
              <div key={i}>
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-3">
                    <Bell size={16} className="text-accent" />
                    <div>
                      <p className="text-sm text-foreground">{n.label}</p>
                      <p className="text-xs text-muted-foreground">{n.time}</p>
                    </div>
                  </div>
                  {/* Toggle placeholder */}
                  <div className="w-10 h-6 bg-accent rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
                  </div>
                </div>
                {i < NOTIFICATIONS.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
