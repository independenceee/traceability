"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMaterial, getAllMaterials, deleteMaterial, updateMaterial } from "@/services/database/material";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Loading from "@/components/loading";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import { Material } from "@prisma/client";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Pencil, Trash2 } from "lucide-react";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Material name must be at least 2 characters.",
  }),
  quantity: z.number().min(0, {
    message: "Quantity must be a positive number.",
  }),
  harvestDate: z.string().optional(),
});

export default function MaterialPage() {
  const queryClient = useQueryClient();

  const [deleteMaterialId, setDeleteMaterialId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material>(null!);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      quantity: 0,
      harvestDate: "",
    },
  });
  const params = useParams();
  const supplierId = params.id as string;

  const {
    data: materialsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllMaterials", supplierId],
    queryFn: () => getAllMaterials({ supplierId }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMaterial,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Material has been deleted successfully!",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["getAllMaterials", supplierId] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to delete material.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateMaterial,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Material has been updated successfully!",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["getAllMaterials", supplierId] });
      setEditingMaterial(null!);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to update material.",
        variant: "destructive",
      });
    },
  });

  if (!supplierId) return null;

  const handleDelete = (materialId: string) => {
    setDeleteMaterialId(materialId);
    setIsDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteMaterialId) {
      deleteMutation.mutate(deleteMaterialId);
    }
    setIsDialogOpen(false);
    setDeleteMaterialId(null);
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
    setDeleteMaterialId(null);
  };

  const handleEdit = (material: Material) => {
    setEditingMaterial(material);
    form.setValue("name", material.name);
    form.setValue("quantity", material.quantity);
    form.setValue("harvestDate", material.harvestDate ? new Date(material.harvestDate).toISOString().split("T")[0] : "");
  };

  const handleSave = (data: z.infer<typeof FormSchema>) => {
    if (editingMaterial) {
      updateMutation.mutate({
        materialId: editingMaterial.id,
        name: data.name,
        quantity: data.quantity,
        harvestDate: data.harvestDate ? new Date(data.harvestDate) : undefined,
      });
      form.reset();
      setEditingMaterial(null!);
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { result, message } = await createMaterial({
        name: data.name,
        supplierId,
        quantity: data.quantity,
        harvestDate: data.harvestDate ? new Date(data.harvestDate) : undefined,
      });

      if (result) {
        toast({
          title: "Success",
          variant: "default",
          description: "Material has been created successfully!",
        });
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["getAllMaterials", supplierId] });
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
        description: "An unexpected error occurred." + (error as Error).message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
      <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5">
        <div className="mt-2 flex gap-4">
          <div className="flex-[2] rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md">
            <Card className="h-full p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(editingMaterial ? handleSave : onSubmit)} className="w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Material Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter material name" {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>Provide the name of the material. Example: Fresh A2 Cow Milk</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter quantity"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>Provide the quantity of the material. Example: 500.0</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="harvestDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Harvest Date</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} className="w-full text-white" />
                        </FormControl>
                        <FormDescription>Provide the harvest date of the material (optional). Example: 2025-03-28T00:00:00Z</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-end gap-6 space-x-2 pt-6">
                    {editingMaterial ? (
                      <Button className="w-full self-stretch bg-green-600" type="submit">
                        Save
                      </Button>
                    ) : (
                      <Button className="w-full self-stretch" type="submit">
                        Submit
                      </Button>
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
              <p>Are you sure you want to delete this material? This action cannot be undone.</p>
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
              <CardTitle className="text-2xl font-semibold">Material List</CardTitle>
              <div className="h-[60vh] w-full overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full w-full">
                    <Loading />
                  </div>
                ) : isError ? (
                  <p className="text-center text-red-500">Error loading materials.</p>
                ) : materialsData?.data?.length === 0 ? (
                  <div className="flex items-center justify-center w-full h-full">
                    <p className="text-center text-gray-500">No materials found.</p>
                  </div>
                ) : (
                  <Table className="table-auto w-full border-collapse border mt-4">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="border px-4 py-2 text-left">Name</TableHead>
                        <TableHead className="border px-4 py-2 text-left">Quantity</TableHead>
                        <TableHead className="border px-4 py-2 text-left">Harvest Date</TableHead>
                        <TableHead className="border px-4 py-2 text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {materialsData?.data?.map((material) => (
                        <TableRow key={material.id}>
                          <TableCell className="border px-4 py-2">{material.name}</TableCell>
                          <TableCell className="border px-4 py-2">{material.quantity}</TableCell>
                          <TableCell className="border px-4 py-2">
                            {material.harvestDate ? new Date(material.harvestDate).toLocaleDateString() : "N/A"}
                          </TableCell>
                          <TableCell className="border px-4 py-2 text-center">
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Actions
                                </Button>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-40 p-2 flex flex-col gap-2 shadow-lg border rounded-md">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center gap-1 text-blue-600 border-blue-600 hover:bg-blue-50"
                                  onClick={() => handleEdit(material)}
                                >
                                  <Pencil className="h-4 w-4" />
                                  <span>Edit</span>
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="flex items-center gap-1 text-red-600 border-red-600 hover:bg-red-50"
                                  onClick={() => handleDelete(material.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span>Delete</span>
                                </Button>
                              </HoverCardContent>
                            </HoverCard>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
