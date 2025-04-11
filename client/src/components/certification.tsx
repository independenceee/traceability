import FileDisplay from "@/components/file-display";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Certification } from "@prisma/client";
import Link from "next/link";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Pencil, Trash2 } from "lucide-react";
import { FaBars } from "react-icons/fa";
export default function Certification({ data, onEdit, onDelete }: { data: Certification; onEdit: () => void; onDelete: () => void }) {
  const { certHash, expiryDate, issueDate, id, certName } = data;

  return (
    <div className="rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md hover:shadow-slate-800">
      <Card className="h-full pb-1 relative">
        <div>
          <AspectRatio ratio={4 / 3} className="bg-muted">
            <FileDisplay src={certHash || ""} alt={"image"} type="image/png" className="h-full w-full rounded-t-lg object-cover" />
          </AspectRatio>
        </div>
        <div className="flex flex-col items-center justify-start gap-1 self-stretch px-4 py-1">
          <div className="font-semibold self-stretch text-center text-base text-ellipsis overflow-hidden whitespace-nowrap">{certName}</div>
          <div className="font-medium self-stretch text-center text-sm text-secondary text-ellipsis overflow-hidden whitespace-nowrap">
            {expiryDate && issueDate
              ? Math.floor((new Date(expiryDate).getTime() - new Date(issueDate).getTime()) / (1000 * 60 * 60 * 24))
              : "Invalid dates"}{" "}
            days
          </div>
        </div>
        {/* Buttons for Edit and Delete */}

        <HoverCard>
          <HoverCardTrigger asChild>
            <Button className="absolute top-1 right-1 bg-slate-400" variant="ghost" size="sm">
              <FaBars className="h-4 w-4" color="#000" />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-40 p-2 flex flex-col gap-2 shadow-lg border rounded-md">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 text-blue-600 border-blue-600 hover:bg-blue-50"
              onClick={() => onEdit()}
            >
              <Pencil className="h-4 w-4" />
              <span>Edit</span>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="flex items-center gap-1 text-red-600 border-red-600 hover:bg-red-50"
              onClick={() => onDelete()}
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </Button>
          </HoverCardContent>
        </HoverCard>
      </Card>
    </div>
  );
}
