import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell, Target, User, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function PerfilPage() {
  return (
    <AppShell>
      <div className="px-4 pt-6 pb-2 space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Perfil</h1>

        {/* Dados do usuário */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={14} />
              Dados pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Nome</span>
              <span className="text-foreground font-medium">Pedro</span>
            </div>
            <Separator />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Peso atual</span>
              <span className="text-foreground font-medium">— kg</span>
            </div>
            <Separator />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Objetivo</span>
              <span className="text-foreground font-medium">— kg</span>
            </div>
          </CardContent>
        </Card>

        {/* Links de configuração */}
        <div className="space-y-2">
          <Link href="/perfil/metas">
            <Card className="active:opacity-80 transition-opacity">
              <CardContent className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Target size={18} className="text-accent" />
                  <span className="text-sm font-medium text-foreground">Metas calóricas e sono</span>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/perfil/notificacoes">
            <Card className="active:opacity-80 transition-opacity">
              <CardContent className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell size={18} className="text-accent" />
                  <span className="text-sm font-medium text-foreground">Notificações</span>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="pt-4 text-center">
          <p className="text-xs text-muted-foreground">PEDRO v0.1.0</p>
        </div>
      </div>
    </AppShell>
  );
}
