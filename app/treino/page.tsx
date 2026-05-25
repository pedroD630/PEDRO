import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Dumbbell, History, Calendar, Star } from "lucide-react";
import Link from "next/link";

export default function TreinoPage() {
  return (
    <AppShell>
      <div className="px-4 pt-6 pb-2 space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Treino</h1>

        <div className="grid grid-cols-1 gap-3">
          <Button asChild variant="accent" size="lg" className="w-full justify-start gap-3">
            <Link href="/treino/hoje">
              <Dumbbell size={20} />
              Treino de hoje
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full justify-start gap-3">
            <Link href="/treino/skills">
              <Star size={20} />
              Skills de calistenia
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full justify-start gap-3">
            <Link href="/treino/historico">
              <History size={20} />
              Histórico de treinos
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full justify-start gap-3">
            <Link href="/treino/rotina">
              <Calendar size={20} />
              Configurar rotina
            </Link>
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
