"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCollection, getAllCollection, deleteCollection, updateCollection } from "@/services/database/collection";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardTitle } from "@/components/ui/card";
import Loading from "@/components/loading";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import FolderCard from "./_components/folder-card";
import { Collection } from "@prisma/client";

const FormSchema = z.object({
  name: z.string().min(2, { message: "Collection name must be at least 2 characters." }),
  description: z.string().optional(),
});

export default function CollectionPage() {
  const [deleteCollectionId, setDeleteCollectionId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection>(null!);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const {
    data: collectionsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllCollection"],
    queryFn: getAllCollection,
  });

  const createMutation = useMutation({
    mutationFn: createCollection,
    onSuccess: () => {
      toast({ title: "Success", description: "Collection created successfully!", variant: "default" });
      queryClient.invalidateQueries({ queryKey: ["getAllCollection"] });
      form.reset();
    },
    onError: (error) => {
      toast({ title: "Error", description: error?.message || "Failed to create collection.", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateCollection,
    onSuccess: () => {
      toast({ title: "Success", description: "Collection updated successfully!", variant: "default" });
      queryClient.invalidateQueries({ queryKey: ["getAllCollection"] });
      setEditingCollection(null!);
    },
    onError: (error) => {
      toast({ title: "Error", description: error?.message || "Failed to update collection.", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCollection,
    onSuccess: () => {
      toast({ title: "Success", description: "Collection deleted successfully!", variant: "default" });
      queryClient.invalidateQueries({ queryKey: ["getAllCollection"] });
    },
    onError: (error) => {
      toast({ title: "Error", description: error?.message || "Failed to delete collection.", variant: "destructive" });
    },
  });

  const confirmDelete = () => {
    if (deleteCollectionId) {
      deleteMutation.mutate(deleteCollectionId);
    }
    setIsDialogOpen(false);
    setDeleteCollectionId(null);
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
    setDeleteCollectionId(null);
  };

  const handleSave = (data: z.infer<typeof FormSchema>) => {
    if (editingCollection) {
      updateMutation.mutate({
        collectionId: editingCollection.id,
        name: data.name,
        description: data.description,
      });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
      <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5">
        <div className="mt-2 flex gap-4">
          <div className="flex-[2] rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md">
            <Card className="h-full p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSave)} className="w-full h-full gap-2 flex flex-col">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Collection Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter collection name" {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>Provide the name of the product.</FormDescription>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter description (optional)" {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>Provide the name of the product.</FormDescription>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full  mt-auto self-end">
                    {editingCollection ? "Save Changes" : "Create Collection"}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Delete</DialogTitle>
              </DialogHeader>
              <p>Are you sure you want to delete this collection? This action cannot be undone.</p>
              <DialogFooter>
                <Button variant="outline" onClick={cancelDelete}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmDelete}>
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="flex-[3] rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md">
            <Card className="h-full p-4">
              <CardTitle className="text-2xl font-semibold">Collection List</CardTitle>
              <div className="h-[60vh] w-full overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full w-full">
                    <Loading />
                  </div>
                ) : isError ? (
                  <p className="text-center text-red-500">Error loading collections.</p>
                ) : collectionsData?.data?.length === 0 ? (
                  <p className="text-center text-gray-500">No collections found.</p>
                ) : (
                  <div className="md:grid-col-2 py-4 gap-2 grid grid-cols-3">
                    {collectionsData?.data?.map((collection) => <FolderCard collection={collection} key={collection.id} />)}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
