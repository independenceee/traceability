import FileDisplay from "@/components/file-display";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@prisma/client";
import Link from "next/link";

export default function Product({ data, onEdit, onDelete }: { data: Product; onEdit: () => void; onDelete: () => void }) {
  const { imageUrl, description, id, name } = data;

  return (
    <div className="rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md hover:shadow-slate-800">
      <Card className="h-full p-1">
        <Link href={`/dashboard/products/${id}`}>
          <AspectRatio ratio={4 / 3} className="bg-muted">
            <FileDisplay src={imageUrl || ""} alt={"image"} type="image/png" className="h-full w-full rounded-t-lg object-cover" />
          </AspectRatio>
        </Link>
        <div className="flex flex-col items-center justify-start gap-1 self-stretch px-4 py-1">
          <div className="font-semibold self-stretch text-center text-base text-ellipsis overflow-hidden whitespace-nowrap">{name}</div>
          <div className="font-medium self-stretch text-center text-sm text-secondary text-ellipsis overflow-hidden whitespace-nowrap">
            {description}
          </div>
        </div>
        {/* Buttons for Edit and Delete */}
        <div className="flex justify-between items-center mt-1 px-1">
          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="destructive" className="text-red-600 border-red-600 hover:bg-red-50" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
}
