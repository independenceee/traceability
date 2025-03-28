import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useMetadataContext } from "@/contexts/metadata";
import FileDisplay from "@/components/file-display";
import { isEmpty, isNil } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import { ViewMetadataContent } from "../../../../../../components/view-json";
import MetadataAction from "./metadata-action";
import { shortenString } from "@/utils";
import { PMetadata } from "@/types";

export default function MetadataList() {
  const { loading, listMetadata, setListSelected, listSelected } = useMetadataContext();

  const handleSellect = (metadata: PMetadata, checked: boolean) => {
    if (checked) {
      setListSelected([...listSelected, metadata]);
    } else {
      setListSelected(listSelected.filter((item) => item !== metadata));
    }
  };

  return (
    <div className="w-full space-y-4 rounded-lg p-4">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px] font-normal">NAME</TableHead>
              <TableHead className="hidden font-normal md:table-cell">CONTENT</TableHead>
              <TableHead className="hidden font-normal sm:table-cell">DATE</TableHead>
              <TableHead className="text-right font-normal">ACTION</TableHead>
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
                  <TableCell className="rounded-r-lg text-right">
                    <Button variant="ghost" size="icon" className="hover:">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : !isNil(listMetadata) && !isEmpty(listMetadata) ? (
              listMetadata.map((item, index) => {
                const { name } = item.content as Record<string, string>;
                return (
                  <TableRow key={index} className="mb-2 rounded-lg">
                    <TableCell className="rounded-l-lg font-medium">
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          id={`checkbox-${index}`}
                          checked={listSelected.includes(item)}
                          className="rounded-full"
                          onClick={() => handleSellect(item, !listSelected.includes(item))}
                        />
                        <div className="h-10 w-10 overflow-hidden rounded-lg">
                          <AspectRatio ratio={10 / 10} className="bg-muted">
                            <FileDisplay src={``} alt={name} type={"text/plain"} className="h-full w-full rounded-md object-cover" />
                          </AspectRatio>
                        </div>
                        <div>
                          <div className="">{shortenString(name, 15)}</div>
                          <div className="text-sm">application/json</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center space-x-2">
                        <ViewMetadataContent json={item.content} />
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{item.createdAt.toLocaleDateString()}</TableCell>
                    <TableCell className="rounded-r-lg text-right">
                      <MetadataAction metadata={item} />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No metadata found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
