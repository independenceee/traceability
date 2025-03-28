import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useMetadataContext } from "@/contexts/metadata";
import Image from "next/image";
import { isNil } from "lodash";
import MetadataAction from "./metadata-action";
import { PMetadata } from "@/types";

export default function MetadataCard({ metadata }: { metadata: PMetadata }) {
  const { listSelected, setListSelected } = useMetadataContext();
  const handleSellect = (metadata: PMetadata, checked: boolean) => {
    if (checked) {
      setListSelected([...listSelected, metadata]);
    } else {
      setListSelected(listSelected.filter((item) => item !== metadata));
    }
  };

  const { name } = metadata.content as Record<string, string>;

  return (
    <Card className="rounded-lg p-2">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Checkbox
            className="h-4 w-4 rounded-full"
            checked={listSelected.includes(metadata)}
            onClick={() => handleSellect(metadata, !listSelected.includes(metadata))}
          />
          <label htmlFor="metadata-select" className="cursor-pointer truncate text-sm">
            {!isNil(name) && name.length > 15 ? name.slice(0, 15) + "..." : name}
          </label>
        </div>
        <MetadataAction metadata={metadata} />
      </div>
      <AspectRatio ratio={4 / 3} className="bg-muted">
        <Image
          src={`/metadata-image?metadata=${encodeURIComponent(JSON.stringify(metadata.content))}`}
          alt={name || "Metadata"}
          width={800}
          height={600}
          className="h-full w-full rounded-lg border object-cover"
        />
      </AspectRatio>
    </Card>
  );
}
