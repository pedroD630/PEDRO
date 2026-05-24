import { BottomNav } from "./BottomNav";
import { SideNav } from "./SideNav";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

export function AppShell({ children, hideNav = false }: AppShellProps) {
  return (
    <>
      {/* Desktop sidebar — hidden on mobile */}
      {!hideNav && <SideNav />}

      {/* Content area — offset left on desktop for sidebar */}
      <div
        className={cn(
          "min-h-screen flex flex-col",
          !hideNav && "md:ml-60",
          // bottom padding for mobile nav; removed on desktop
          !hideNav && "pb-16 md:pb-0",
        )}
      >
        {/* Centre content up to a readable max-width on wide screens */}
        <div className="flex-1 w-full max-w-2xl mx-auto flex flex-col">
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile bottom nav — hidden on desktop */}
      {!hideNav && <BottomNav />}
    </>
  );
}
