import { FaArrowLeft } from "react-icons/fa6";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";

interface SidebarToggleProps {
  isOpen: boolean;
  toggle: () => void;
}

export function SidebarToggle({ isOpen, toggle }: SidebarToggleProps) {
  return (
    <div className="invisible absolute -right-[16px] top-[52px] z-20 lg:visible">
      <Button onClick={() => toggle?.()} className="h-6 w-6 rounded-full bg-slate-500" variant="outline" size="icon">
        <FaArrowLeft className={cn("h-3 w-3 transition-transform duration-700 ease-in-out", isOpen === false ? "rotate-180" : "rotate-0")} />
      </Button>
    </div>
  );
}
