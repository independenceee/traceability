"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import Link from "next/link";
import { useMetadataContext } from "@/contexts/metadata";
import MetadataList from "../_components/metadata-list";
import MetadataGird from "../_components/metadata-gird";
import { Filter } from "../_components/filter";
import CollectionAction from "../_components/collection-action";
import Pagination from "@/components/pagination";

export default function MetadataPage() {
  const { collectionId, currentPage, totalPages, setCurrentPage } = useMetadataContext();
  return (
    <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
      <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5">
        <h1 className="text-2xl font-semibold leading-7">Metadata</h1>
        <div className="mt-5">
          <Tabs defaultValue="list" className="px-4">
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
                <CollectionAction />
                <Link href={`${collectionId}/create`}>
                  <Button className="bg-orange-500 text-white hover:bg-orange-600">Create New</Button>
                </Link>
              </div>
            </div>
            <Filter />
            <TabsContent value="list">
              <MetadataList />
            </TabsContent>
            <TabsContent value="grid">
              <MetadataGird />
            </TabsContent>
          </Tabs>

          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
