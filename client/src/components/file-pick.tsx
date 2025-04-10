"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Media } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { filterDefault } from "@/constants";
import { getMedia } from "@/services/database/media";
import FileDisplay from "@/components/file-display";
import Link from "next/link";
import { useJsonBuilderStore } from "./store";

export function FilePick() {
  const { addMediaField } = useJsonBuilderStore() || {};

  const [query, setQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["getMedia", 1, query],
    queryFn: () =>
      getMedia({
        page: 1,
        query: query,
        limit: 10,
        range: filterDefault.range,
      }),
  });

  const listMedia = data?.data || [];

  const handleSelectImage = (file: Media) => {
    if (addMediaField) {
      addMediaField(file);
    }
    setDialogOpen(false);
  };

  return (
    <div className="w-full self-stretch">
      <Button className="w-full self-stretch" onClick={() => setDialogOpen(!dialogOpen)}>
        Add Image
      </Button>
      <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
        <DialogContent className="max-w-[90vw] w-full max-h-[90vh] h-full overflow-y-auto p-0">
          <div className="flex flex-col h-full">
            <DialogHeader className="px-6 py-4 border-b">
              <DialogTitle>Select an Media</DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="mb-4">
                <Input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search images..." className="w-full" />
              </div>
              {isLoading ? (
                <div className="text-center py-4">Loading...</div>
              ) : listMedia.length === 0 ? (
                <div className="text-center py-4">
                  No Media found, go to{" "}
                  <Link className="underline" href="/dashboard/utilities/storage">
                    Storage
                  </Link>{" "}
                  to upload new media
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                  {listMedia.map((file) => (
                    <Button
                      key={file.id}
                      variant="outline"
                      className={`h-full p-4 flex flex-col items-start justify-start rounded-lg overflow-hidden`}
                      onClick={() => handleSelectImage(file)}
                    >
                      <div className="aspect-square relative w-full mb-2">
                        <FileDisplay
                          src={file.url}
                          alt={file.name}
                          objectFit="cover"
                          className="absolute inset-0 w-full h-full object-cover rounded-lg"
                          type={file.type}
                        />
                      </div>
                      <div className="w-full text-left">
                        <p className="text-sm truncate">{file.name}</p>
                        <p className="text-xs text-gray-400 truncate">{file.url}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
