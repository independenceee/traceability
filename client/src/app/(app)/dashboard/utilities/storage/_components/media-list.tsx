"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useUploadContext } from "@/contexts/storage";
import { Media } from "@prisma/client";
import FileDisplay from "@/components/file-display";
import { Skeleton } from "@/components/ui/skeleton";
import { isEmpty } from "lodash";
import CopyButton from "@/components/copy";

export default function MediaList() {
  const { loading, listMedia, listSelected, setListSelected } = useUploadContext();

  const handleSellect = (media: Media, checked: boolean) => {
    if (checked) {
      setListSelected([...listSelected, media]);
    } else {
      setListSelected(listSelected.filter((item) => item !== media));
    }
  };

  return (
    <div className="w-full space-y-4 rounded-lg p-4">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px] font-normal">NAME</TableHead>
              <TableHead className="hidden font-normal md:table-cell">CID</TableHead>
              <TableHead className="hidden font-normal sm:table-cell">DATE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              [...Array(5)].map((_, index) => (
                <TableRow key={index} className="mb-2 rounded-lg">
                  <TableCell className="rounded-l-lg font-medium">
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-10 w-10 rounded-lg" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-3 w-[100px]" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-4 w-[200px]" />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                </TableRow>
              ))
            ) : !isEmpty(listMedia) ? (
              listMedia.map((file: Media, index: number) => (
                <TableRow key={index} className="mb-2 rounded-lg">
                  <TableCell className="rounded-l-lg font-medium">
                    <div className="flex items-center space-x-4">
                      <Checkbox
                        id={`checkbox-${index}`}
                        checked={listSelected.includes(file)}
                        className="rounded-full"
                        onClick={() => handleSellect(file, !listSelected.includes(file))}
                      />

                      <div className="h-10 w-10 overflow-hidden rounded-lg">
                        <AspectRatio ratio={10 / 10} className="bg-muted">
                          <FileDisplay src={file.url} alt={file.name} type={file.type} className="h-full w-full rounded-md object-cover" />
                        </AspectRatio>
                      </div>
                      <div>
                        <div className="font-bold">{file.name.length > 30 ? file.name.slice(0, 30) + "..." : file.name}</div>
                        <div className="text-sm font-light">{file.type}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center space-x-2">
                      <span className="">{file.url}</span>
                      <CopyButton content={file.url} />
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{file.createdAt.toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No media found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
