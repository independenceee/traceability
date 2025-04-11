import FileDisplay from "@/components/file-display";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { AssetDetails } from "@/types";
import { hexToString } from "@meshsdk/core";
import Link from "next/link";

export default function ProductCard({ data }: { data: AssetDetails }) {
  const { asset_name, policy_id, onchain_metadata, fingerprint } = data;

  const imgSrc = onchain_metadata?.image || "";

  const mediaType = onchain_metadata?.type || "image/png";

  const assetNameString = hexToString(asset_name.replace(/^000643b0/, ""));

  return (
    <Link href={`/products/${policy_id + asset_name}`}>
      <div className="rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md hover:shadow-slate-800">
        <Card className="h-full ">
          <AspectRatio ratio={4 / 3} className="bg-muted">
            <FileDisplay src={imgSrc} alt={"image"} type={mediaType} className="h-full w-full rounded-t-lg object-cover" />
          </AspectRatio>
          <div className="flex flex-col items-center justify-start p-2 gap-2 self-stretch px-4 py-2">
            <div className="font-semibold self-stretch text-center text-base text-ellipsis overflow-hidden whitespace-nowrap">{assetNameString}</div>
            <div className="font-medium self-stretch text-center text-sm text-secondary text-ellipsis overflow-hidden whitespace-nowrap">
              {fingerprint}
            </div>
          </div>
        </Card>
      </div>
    </Link>
  );
}
