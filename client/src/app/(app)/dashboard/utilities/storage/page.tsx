"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import Link from "next/link";
import { routes } from "@/constants/routes";
import MediaGird from "./_components/media-gird";
import MediaList from "./_components/media-list";
import { Filter } from "./_components/filter";
import { useEffect } from "react";
import { useUploadContext } from "@/contexts/storage";
import Pagination from "@/components/pagination";
import StorageAction from "./_components/storage-action";
export default function StoragePage() {
  const { totalPages, currentPage, setCurrentPage, refetch } = useUploadContext();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
      <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5">
        <h1 className="text-2xl font-medium leading-7">Storage</h1>
        <div className="mt-5 flex flex-col h-full">
          <Tabs defaultValue="list" className="px-4 min-h-[70vh] flex-grow overflow-y-auto">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg p-2">
              <TabsList>
                <TabsTrigger value="list" className="data-[state=active]:bg-gray-600">
                  <Icons.squareMenu className="h-5 w-5" />
                </TabsTrigger>
                <TabsTrigger value="grid" className="data-[state=active]:bg-gray-600">
                  <Icons.layoutGrid className="h-5 w-5" />
                </TabsTrigger>
              </TabsList>
              <div className="flex items-center space-x-2">
                <StorageAction />
                <Link href={routes.utilities.children.storage.children.upload.redirect}>
                  <Button> Upload New</Button>
                </Link>
              </div>
            </div>
            <Filter />
            <TabsContent value="list">
              <MediaList />
            </TabsContent>
            <TabsContent value="grid">
              <MediaGird />
            </TabsContent>
          </Tabs>

          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
