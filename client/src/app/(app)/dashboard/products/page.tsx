"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, getAllProducts, deleteProduct, updateProduct } from "@/services/database/products";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Loading from "@/components/loading";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Pagination from "@/components/pagination";
import Product from "@/components/product";
import { MediaPick } from "@/components/media-pick";
import { Media } from "@prisma/client";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  imageUrl: z.string().optional(),
  description: z.string().optional(),
});

export default function ProductPage() {
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      description: "",
    },
  });

  const queryClient = useQueryClient();

  const handleDelete = (productId: string) => {
    setDeleteProductId(productId);
    setIsDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteProductId) {
      deleteMutation.mutate(deleteProductId);
    }
    setIsDialogOpen(false);
    setDeleteProductId(null);
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
    setDeleteProductId(null);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Product has been deleted successfully!",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
    },

    onError: (error) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to delete product.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Product has been updated successfully!",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
      setEditingProduct(null);
    },

    onError: (error) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to update product.",
        variant: "destructive",
      });
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (product: any) => {
    setEditingProduct(product);
    form.setValue("name", product.name);

    form.setValue("imageUrl", product.imageUrl);
    form.setValue("description", product.description);
  };

  const handleSave = (data: z.infer<typeof FormSchema>) => {
    if (editingProduct) {
      updateMutation.mutate({
        productId: editingProduct.id,
        name: data.name,
        imageUrl: data.imageUrl,
        description: data.description,
      });
      form.reset();
      setEditingProduct(null!);
    }
  };

  const addMediaField = (mediaField: Media) => {
    form.setValue("imageUrl", mediaField.url);
  };

  const {
    data: productsData,
    isLoading,
    isError,
  } = useQuery<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Array<any>;
    totalPages: number;
  }>({
    queryKey: ["getAllProducts", currentPage],
    queryFn: () => getAllProducts({ page: currentPage, limit: itemsPerPage }),
    staleTime: 5000, // Keeps previous data for 5 seconds
  });

  const totalPages = productsData?.totalPages || 1;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { result, message } = await createProduct({
        name: data.name,
        imageUrl: data.imageUrl,
        description: data.description,
      });

      if (result) {
        toast({
          title: "Success",
          variant: "default",
          description: "Product has been created successfully!",
        });
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
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

  return (
    <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
      <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5">
        <div className="mt-2 flex gap-4 ">
          <div className="flex-[2] rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md">
            <Card className="h-full p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(editingProduct ? handleSave : onSubmit)} className="w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>{"Provide the name of the product. Example: Organic A2 Cheese"}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter image URL" {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>{"Provide the image URL of the product. Example: ipfs://QmZSLSNpbEBCLp9DhW8JB2Jmv1KwHSA"}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter description" {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>
                          {
                            "Provide a description of the product. Example: Rich in flavor, creamy in texture, and naturally easier to digest for many individuals, Organic A2 Cheese offers a nutritious and ethically sourced option for health-conscious consumers."
                          }
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-end gap-6 space-x-2 pt-6">
                    {editingProduct ? (
                      <div className="flex items-center justify-end gap-2 w-full self-end">
                        <Button className="w-full self-stretch" type="submit">
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
              <p>Are you sure you want to delete this product? This action cannot be undone.</p>
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
              <CardTitle className="text-2xl font-semibold">Product List</CardTitle>

              <div className="h-[60vh] w-full overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full w-full">
                    <Loading />
                  </div>
                ) : isError ? (
                  <p className="text-center text-red-500">Error loading products.</p>
                ) : productsData?.data?.length === 0 ? (
                  <div className="flex items-center justify-center w-full h-full">
                    <p className="text-center text-gray-500">No products found.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                      {productsData?.data?.map((product) => (
                        <Product key={product.id} data={product} onEdit={() => handleEdit(product)} onDelete={() => handleDelete(product.id)} />
                      ))}
                    </div>

                    <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
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
