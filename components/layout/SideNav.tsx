"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  UtensilsCrossed,
  Dumbbell,
  Moon,
  BarChart2,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard",   icon: Home,            label: "Home" },
  { href: "/alimentacao", icon: UtensilsCrossed,  label: "Alimentação" },
  { href: "/treino",      icon: Dumbbell,         label: "Treino" },
  { href: "/sono",        icon: Moon,             label: "Sono" },
  { href: "/insights",    icon: BarChart2,        label: "Insights" },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col fixed inset-y-0 left-0 w-60 bg-surface border-r border-border z-50">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-border">
        <span className="text-xl font-bold tracking-wider text-accent">PEDRO</span>
        <p className="text-[11px] text-muted-foreground mt-0.5">Saúde &amp; Rotina</p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive =
            pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
                isActive
                  ? "bg-accent/10 text-accent"
                  : "text-muted-foreground hover:bg-background hover:text-foreground"
              )}
            >
              <Icon
                size={18}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="p-3 border-t border-border">
        <Link
          href="/perfil"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
            pathname.startsWith("/perfil")
              ? "bg-accent/10 text-accent"
              : "text-muted-foreground hover:bg-background hover:text-foreground"
          )}
        >
          <User size={18} strokeWidth={1.8} />
          Perfil
        </Link>
      </div>
    </aside>
  );
}
