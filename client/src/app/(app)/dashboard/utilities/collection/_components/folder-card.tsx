"use client";
import { CircleCheck, FolderIcon, MoreVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Collection } from "@prisma/client";
import Link from "next/link";
import { routes } from "@/constants/routes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteCollection, updateCollection } from "@/services/database/collection";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { parseError } from "@/utils/error/parse-error";

export default function FolderCard({ collection }: { collection: Collection }) {
  const router = useRouter();
  const [openRenameInput, setOpenRenameInput] = useState(false);
  const [name, setName] = useState(collection.name);
  const [dialogDelete, setDialogDelete] = useState(false);

  const handleDelete = async () => {
    try {
      const { result, message } = await deleteCollection(collection.id);
      if (!result) {
        throw new Error(message);
      }
      toast({ title: "Success", description: message });
    } catch (e) {
      toast({
        title: "Error",
        description: parseError(e),
        variant: "destructive",
      });
    } finally {
      setOpenRenameInput(false);
      router.refresh();
    }
  };

  const handleRename = async () => {
    try {
      if (!name || name === collection.name) {
        return;
      }
      const { result, message } = await updateCollection({
        collectionId: collection.id,
        name,
      });
      if (!result) {
        throw new Error(message);
      }
      toast({ title: "Success", description: message });
    } catch (e) {
      toast({
        title: "Error",
        description: parseError(e),
        variant: "destructive",
      });
    } finally {
      setOpenRenameInput(false);
      router.refresh();
    }
  };

  return (
    <>
      <AlertDialog open={dialogDelete} onOpenChange={setDialogDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your Collection and Metadata from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDialogDelete(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Yes, Delete It</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card className="rounded-lg p-2">
        <div>
          {openRenameInput ? (
            <div className="flex items-center justify-between">
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                // onBlur={handleRename}
                className="text-sm h-9 mr-1"
              />
              <Button onClick={handleRename} variant="ghost" className="hover:bg-white/10 hover:text-green-500">
                <CircleCheck className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <Link href={routes.utilities.children.collection.redirect + `/${collection.id}`} className="flex items-center space-x-3">
                  <FolderIcon className="h-5 w-5 text-yellow-400" />
                  <label htmlFor="file-select" className="cursor-pointer truncate text-sm">
                    {collection.name}
                  </label>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className=" hover:bg-white/10">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-32">
                    <DropdownMenuItem onClick={() => setOpenRenameInput(true)}>
                      <span>Update</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDialogDelete(true)}>
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}
        </div>
      </Card>
    </>
  );
}
