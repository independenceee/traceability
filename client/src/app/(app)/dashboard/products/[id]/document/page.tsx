"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDocument, getAllDocuments, deleteDocument, updateDocument } from "@/services/database/document";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardTitle } from "@/components/ui/card";
import Loading from "@/components/loading";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import Document from "@/components/document";
import { MediaPick } from "@/components/media-pick";
import { Media } from "@prisma/client";

const FormSchema = z.object({
  docType: z.string().min(2, {
    message: "Document type must be at least 2 characters.",
  }),
  url: z.string().url({
    message: "Please enter a valid URL.",
  }),
  hash: z.string().optional(),
});

export default function DocumentPage() {
  const params = useParams();
  const productId = params.id as string;

  const [deleteDocumentId, setDeleteDocumentId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editingDocument, setEditingDocument] = useState<any>(null);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      docType: "",
      url: "",
      hash: "",
    },
  });

  const handleDelete = (documentId: string) => {
    setDeleteDocumentId(documentId);
    setIsDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteDocumentId) {
      deleteMutation.mutate(deleteDocumentId);
    }
    setIsDialogOpen(false);
    setDeleteDocumentId(null);
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
    setDeleteDocumentId(null);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Document has been deleted successfully!",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["getAllDocuments", productId] });
    },

    onError: (error) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to delete document.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateDocument,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Document has been updated successfully!",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["getAllDocuments", productId] });
      setEditingDocument(null);
    },

    onError: (error) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to update document.",
        variant: "destructive",
      });
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (document: any) => {
    setEditingDocument(document);
    form.setValue("docType", document.docType);
    form.setValue("url", document.url);
    form.setValue("hash", document.hash || "");
  };

  const handleSave = (data: z.infer<typeof FormSchema>) => {
    if (editingDocument) {
      updateMutation.mutate({
        documentId: editingDocument.id,
        docType: data.docType,
        url: data.url,
        hash: data.hash,
      });
    }
  };

  const {
    data: documentsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllDocuments", productId],
    queryFn: () => getAllDocuments({ productId }),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { result, message } = await createDocument({
        productId,
        docType: data.docType,
        url: data.url,
        hash: data.hash,
      });

      if (result) {
        toast({
          title: "Success",
          variant: "default",
          description: "Document has been created successfully!",
        });
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["getAllDocuments", productId] });
      } else {
        toast({
          title: "Error",
          variant: "destructive",
          description: message,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error + "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  }

  const addMediaField = (mediaField: Media) => {
    form.setValue("hash", mediaField.url);
  };

  return (
    <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
      <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5">
        <div className="mt-2 flex gap-4 ">
          <div className="flex-[2] rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md">
            <Card className="h-full p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(editingDocument ? handleSave : onSubmit)} className="w-full">
                  <FormField
                    control={form.control}
                    name="docType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Document Type</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter document type" {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>{"Provide the type of the document (e.g., Certificate). Example: specification"}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Document URL</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter document URL" {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>{"Provide the URL of the document. Example: https://example.com/docs/cheese_spec.pdf"}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hash"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Document Hash</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter blockchain hash (optional)" {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>
                          {"Provide the blockchain hash of the document (if applicable). Example: ipfs://ssjaeuhflkajsdfassdfvt"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-end gap-6 space-x-2 pt-6">
                    {editingDocument ? (
                      <div className="flex items-center justify-end gap-2 w-full self-end">
                        <Button className="w-full self-stretch " type="submit">
                          Save
                        </Button>
                        <MediaPick addMediaField={addMediaField} />
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-2 w-full self-end">
                        <Button className="w-full self-stretch" type="submit">
                          Submit
                        </Button>
                        <MediaPick addMediaField={addMediaField} />
                      </div>
                    )}
                  </div>
                </form>
              </Form>
            </Card>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Delete</DialogTitle>
              </DialogHeader>
              <p>Are you sure you want to delete this document? This action cannot be undone.</p>
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
              <CardTitle className="text-2xl font-semibold">Document List</CardTitle>

              <div className="h-[60vh] w-full overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full w-full">
                    <Loading />
                  </div>
                ) : isError ? (
                  <p className="text-center text-red-500">Error loading documents.</p>
                ) : documentsData?.data?.length === 0 ? (
                  <div className="flex items-center justify-center w-full h-full">
                    <p className="text-center text-gray-500">No documents found.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                      {documentsData?.data?.map((document) => (
                        <Document key={document.id} data={document} onEdit={() => handleEdit(document)} onDelete={() => handleDelete(document.id)} />
                      ))}
                    </div>

                    {/* <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} /> */}
                  </>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
