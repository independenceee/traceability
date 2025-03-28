import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
export default function AssetCardSkeleton() {
  return (
    <div>
      <AspectRatio ratio={5 / 3} className="bg-muted rounded-lg">
        <Skeleton className="h-[125px] w-[250px] rounded-xl " />
      </AspectRatio>
      <div className="flex flex-col items-center justify-start gap-2 self-stretch px-4 py-2">
        <div className="font-semibol self-stretch text-center text-base">
          <Skeleton className="h-5 w-[250px]" />
        </div>
        <div className="font- self-stretch text-center text-sm text-secondary">
          <Skeleton className="h-5 w-[200px]" />
        </div>
      </div>
    </div>
  );
}
