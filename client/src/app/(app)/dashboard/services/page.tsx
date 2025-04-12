import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Images } from "@/components/images";
import Link from "next/link";
export default function UtilitiesPage() {
  return (
    <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
      <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5">
        <div className="mt-2 grid  gap-4 grid-cols-3 max-md:grid-cols-1">
          <Link href="/dashboard/services/payment" className="rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md">
            <Card className="h-full">
              <AspectRatio ratio={5 / 3} className="bg-muted">
                <Images.collection className="h-full w-full rounded-t-lg object-cover" />
              </AspectRatio>
              <div className="flex flex-col items-center justify-start gap-3 self-stretch px-4 py-2">
                <div className="font-semibol self-stretch text-center text-base">Payment Service</div>
                <div className="font- self-stretch text-center text-sm text-secondary">Have data but need JSON? We got you covered!</div>
              </div>
            </Card>
          </Link>

          <Link href="/dashboard/services/subscription" className="rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md">
            <Card className="h-full">
              <AspectRatio ratio={5 / 3} className="bg-muted">
                <Images.storegae className="h-full w-full rounded-t-lg object-cover" />
              </AspectRatio>
              <div className="flex flex-col items-center justify-start gap-3 self-stretch px-4 py-2">
                <div className="font-semibol self-stretch text-center text-base">Subcription</div>
                <div className="font- self-stretch text-center text-sm text-secondary">Upload and manage your media</div>
              </div>
            </Card>
          </Link>
          <Link href="/dashboard/services/utilities" className="rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md">
            <Card className="h-full">
              <AspectRatio ratio={5 / 3} className="bg-muted">
                <Images.storegae className="h-full w-full rounded-t-lg object-cover" />
              </AspectRatio>
              <div className="flex flex-col items-center justify-start gap-3 self-stretch px-4 py-2">
                <div className="font-semibol self-stretch text-center text-base">Utilities</div>
                <div className="font- self-stretch text-center text-sm text-secondary">Upload and manage your media</div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
