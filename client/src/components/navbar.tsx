import { Images } from "@/components/images";
import { WalletConnectButton } from "@/components/cardano-wallet";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { BreadcrumbDashboard } from "./breadcrumb";
import { cn } from "@/utils";

export function Navbar() {
  const sidebar = useSidebarToggle();
  return (
    <header className="fixed right-0 top-0 z-10 max-h-16 w-full bg-section">
      <div className="mx-4 flex h-16 items-center sm:mx-8">
        <div className="flex flex-1 items-center justify-start md:hidden">
          <Images.logo className="h-full w-full object-cover" />
        </div>

        <div
          className={cn(
            "flex-1 hidden md:flex items-center justify-start transition-all duration-300 ease-in-out",
            sidebar?.isOpen === false ? "ml-[73px]" : "ml-[300px]",
          )}
        >
          <BreadcrumbDashboard />
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <WalletConnectButton />
        </div>
      </div>
    </header>
  );
}
