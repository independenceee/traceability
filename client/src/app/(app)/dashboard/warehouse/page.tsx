"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createWarehouse, getAllWarehouses, deleteWarehouse, updateWarehouse } from "@/services/database/warehouse";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Loading from "@/components/loading";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Warehouse } from "@prisma/client";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Pencil, Trash2 } from "lucide-react";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Warehouse name must be at least 2 characters.",
  }),
  location: z.string().optional(),
  capacity: z.number().min(0, {
    message: "Capacity must be a positive number.",
  }),
});

export default function WarehousePage() {
  const [deleteWarehouseId, setDeleteWarehouseId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse>(null!);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      location: "",
      capacity: 0,
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteWarehouse,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Warehouse has been deleted successfully!",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["getAllWarehouses"] });
    },

    onError: (error) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to delete warehouse.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateWarehouse,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Warehouse has been updated successfully!",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["getAllWarehouses"] });
      setEditingWarehouse(null!);
    },

    onError: (error) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to update warehouse.",
        variant: "destructive",
      });
    },
  });

  const {
    data: warehousesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllWarehouses"],
    queryFn: getAllWarehouses,
  });

  const handleDelete = (warehouseId: string) => {
    setDeleteWarehouseId(warehouseId);
    setIsDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteWarehouseId) {
      deleteMutation.mutate(deleteWarehouseId);
    }
    setIsDialogOpen(false);
    setDeleteWarehouseId(null);
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
    setDeleteWarehouseId(null);
  };

  const handleEdit = (warehouse: Warehouse) => {
    setEditingWarehouse(warehouse);
    form.setValue("name", warehouse.name);
    form.setValue("location", warehouse.location || "");
    form.setValue("capacity", warehouse.capacity);
  };

  const handleSave = (data: z.infer<typeof FormSchema>) => {
    if (editingWarehouse) {
      updateMutation.mutate({
        warehouseId: editingWarehouse.id,
        name: data.name,
        location: data.location,
        capacity: data.capacity,
      });
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { result, message } = await createWarehouse({
        name: data.name,
        location: data.location,
        capacity: data.capacity,
      });

      if (result) {
        toast({
          title: "Success",
          variant: "default",
          description: "Warehouse has been created successfully!",
        });
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["getAllWarehouses"] });
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
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
      <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5">
        <div className="mt-2 flex gap-4">
          {/* Form Section */}
          <div className="flex-[2] rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md">
            <Card className="h-full p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(editingWarehouse ? handleSave : onSubmit)} className="w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Warehouse Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter warehouse name" {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>{"Provide the name of the warehouse. Example: Da Lat Cold Storage"}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter location (optional)" {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>
                          {"Provide the location of the warehouse (optional). Example: Phu Hoi Industrial Park, Lam Dong"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter capacity"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>{"Provide the capacity of the warehouse. Example: 1000Q"}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-end gap-6 space-x-2 pt-6">
                    {editingWarehouse ? (
                      <Button className="w-full self-stretch" type="submit">
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

          {/* Dialog for Delete Confirmation */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Delete</DialogTitle>
              </DialogHeader>
              <p>Are you sure you want to delete this warehouse? This action cannot be undone.</p>
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

          {/* Warehouse List Section */}
          <div className="flex-[3] rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md">
            <Card className="h-full p-4">
              <CardTitle className="text-2xl font-semibold">Warehouse List</CardTitle>
              <div className="h-[60vh] w-full overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full w-full">
                    <Loading />
                  </div>
                ) : isError ? (
                  <p className="text-center text-red-500">Error loading warehouses.</p>
                ) : warehousesData?.data?.length === 0 ? (
                  <div className="flex items-center justify-center w-full h-full">
                    <p className="text-center text-gray-500">No warehouses found.</p>
                  </div>
                ) : (
                  <Table className="table-auto w-full border-collapse border mt-4">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="border px-4 py-2 text-left">Name</TableHead>
                        <TableHead className="border px-4 py-2 text-left">Location</TableHead>
                        <TableHead className="border px-4 py-2 text-left">Capacity</TableHead>
                        <TableHead className="border px-4 py-2 text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {warehousesData?.data?.map((warehouse) => (
                        <TableRow key={warehouse.id}>
                          <TableCell className="border px-4 py-2">{warehouse.name}</TableCell>
                          <TableCell className="border px-4 py-2">{warehouse.location || "N/A"}</TableCell>
                          <TableCell className="border px-4 py-2">{warehouse.capacity}</TableCell>
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
                                  onClick={() => handleEdit(warehouse)}
                                >
                                  <Pencil className="h-4 w-4" />
                                  <span>Edit</span>
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="flex items-center gap-1 text-red-600 border-red-600 hover:bg-red-50"
                                  onClick={() => handleDelete(warehouse.id)}
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
