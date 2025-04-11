"use client";

import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Images } from "@/components/images";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProductIdPage() {
  const params = useParams();
  const id = params.id as string;

  if (!id) return null;
  return (
    <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
      <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5">
        <div className="mt-2 grid  gap-4 grid-cols-3 max-md:grid-cols-1">
          <Link href={`/dashboard/products/${id}/document`} className="rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md">
            <Card className="h-full">
              <AspectRatio ratio={5 / 3} className="bg-muted">
                <Images.document className="h-full w-full rounded-t-lg object-cover" />
              </AspectRatio>
              <div className="flex flex-col items-center justify-start gap-3 self-stretch px-4 py-2">
                <div className="font-semibol self-stretch text-center text-base">Supporting Document</div>
                <div className="font- self-stretch text-center text-sm text-secondary">
                  Stores external documents related to products such as certificates or audits, with associated hash values.
                </div>
              </div>
            </Card>
          </Link>

          <Link href={`/dashboard/products/${id}/warehouse`} className="rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md">
            <Card className="h-full">
              <AspectRatio ratio={5 / 3} className="bg-muted">
                <Images.warehouse className="h-full w-full rounded-t-lg object-cover" />
              </AspectRatio>
              <div className="flex flex-col items-center justify-start gap-3 self-stretch px-4 py-2">
                <div className="font-semibol self-stretch text-center text-base">Warehouse Storage</div>
                <div className="font- self-stretch text-center text-sm text-secondary">
                  Tracks product storage in a warehouse, including entry and exit timestamps and storage conditions
                </div>
              </div>
            </Card>
          </Link>
          <Link href={`/dashboard/products/${id}/process`} className="rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md">
            <Card className="h-full">
              <AspectRatio ratio={5 / 3} className="bg-muted">
                <Images.process className="h-full w-full rounded-t-lg object-cover" />
              </AspectRatio>
              <div className="flex flex-col items-center justify-start gap-3 self-stretch px-4 py-2">
                <div className="font-semibol self-stretch text-center text-base">Production Process</div>
                <div className="font- self-stretch text-center text-sm text-secondary">
                  Describes the stages of a product manufacturing process, including start/end time and location
                </div>
              </div>
            </Card>
          </Link>

          <Link href={`/dashboard/products/${id}/certification`} className="rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md">
            <Card className="h-full">
              <AspectRatio ratio={5 / 3} className="bg-muted">
                <Images.certification className="h-full w-full rounded-t-lg object-cover" />
              </AspectRatio>
              <div className="flex flex-col items-center justify-start gap-3 self-stretch px-4 py-2">
                <div className="font-semibol self-stretch text-center text-base">Certification</div>
                <div className="font- self-stretch text-center text-sm text-secondary">
                  Represents certificates issued to products, including issue/expiry dates and optional blockchain hashes.
                </div>
              </div>
            </Card>
          </Link>

          <Link href={`/dashboard/products/${id}/feedback`} className="rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md">
            <Card className="h-full">
              <AspectRatio ratio={5 / 3} className="bg-muted">
                <Images.feedback className="h-full w-full rounded-t-lg object-cover" />
              </AspectRatio>
              <div className="flex flex-col items-center justify-start gap-3 self-stretch px-4 py-2">
                <div className="font-semibol self-stretch text-center text-base">Product Feedback</div>
                <div className="font- self-stretch text-center text-sm text-secondary">
                  Stores customer feedback on products, including content, rating, and timestamps.
                </div>
              </div>
            </Card>
          </Link>
          <Card className="h-full opacity-50">
            <AspectRatio ratio={5 / 3} className="bg-muted">
              <Images.api className="h-full w-full rounded-t-lg object-cover" />
            </AspectRatio>
            <div className="flex flex-col items-center justify-start gap-3 self-stretch px-4 py-2">
              <div className="font-semibol self-stretch text-center text-base">API Service</div>
              <div className="font- self-stretch text-center text-sm text-secondary">Comming Soon</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
