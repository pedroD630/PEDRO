import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus, TrendingDown } from "lucide-react";
import Link from "next/link";

export default function AlimentacaoPage() {
  return (
    <AppShell>
      <div className="px-4 pt-6 pb-2 space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Alimentação</h1>

        <div className="grid grid-cols-1 gap-3">
          <Button asChild variant="accent" size="lg" className="w-full justify-start gap-3">
            <Link href="/alimentacao/diario">
              <Plus size={20} />
              Diário de hoje
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full justify-start gap-3">
            <Link href="/alimentacao/receitas">
              <BookOpen size={20} />
              Catálogo de receitas
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full justify-start gap-3">
            <Link href="/alimentacao/peso">
              <TrendingDown size={20} />
              Histórico de peso
            </Link>
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
