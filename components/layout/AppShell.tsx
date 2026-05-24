import { BottomNav } from "./BottomNav";

interface AppShellProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

export function AppShell({ children, hideNav = false }: AppShellProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className={`flex-1 overflow-y-auto ${hideNav ? "" : "pb-20"}`}>
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
