import { Icons } from "@/components/icons";
import { cn } from "@/utils";

export default function Spinner() {
  return (
    <div className="grid h-screen place-content-center px-4">
      <Icons.spinner className={cn("my-28 h-16 w-16 animate-spin text-primary/60")} />
    </div>
  );
}
