"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createWarehouseStorage,
  getAllWarehouseStorage,
  deleteWarehouseStorage,
  updateWarehouseStorage,
} from "@/services/database/warehouse-storage";
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
import { getAllWarehouses } from "@/services/database/warehouse";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Pencil, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  warehouseId: z.string().min(1, { message: "Warehouse ID is required." }),
  entryTime: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Please enter a valid entry time." }),
  exitTime: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), { message: "Please enter a valid exit time." }),
  conditions: z.string().optional(),
});

interface Storage {
  id: string;
  warehouseId: string; // Adjust based on actual type
  entryTime: string | Date;
  exitTime?: string | Date | null; // Optional, can be null/undefined
  conditions?: string | null; // Optional, can be null/undefined
}

export default function WarehouseStoragePage() {
  const params = useParams();
  const productId = params.id as string;

  const [deleteStorageId, setDeleteStorageId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editingStorage, setEditingStorage] = useState<any>(null);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      warehouseId: "",
      entryTime: "",
      exitTime: "",
      conditions: "",
    },
  });

  const {
    data: storageData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllWarehouseStorage", productId],
    queryFn: () => getAllWarehouseStorage({ productId: productId }),
  });

  console.log(storageData);

  const deleteMutation = useMutation({
    mutationFn: deleteWarehouseStorage,
    onSuccess: () => {
      toast({ title: "Success", description: "Record deleted successfully!", variant: "default" });
      queryClient.invalidateQueries({ queryKey: ["getAllWarehouseStorage", productId] });
    },
    onError: (error) => {
      toast({ title: "Error", description: error?.message || "Failed to delete record.", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateWarehouseStorage,
    onSuccess: () => {
      toast({ title: "Success", description: "Record updated successfully!", variant: "default" });
      queryClient.invalidateQueries({ queryKey: ["getAllWarehouseStorage", productId] });
      setEditingStorage(null);
    },
    onError: (error) => {
      toast({ title: "Error", description: error?.message || "Failed to update record.", variant: "destructive" });
    },
  });

  const handleDelete = (storageId: string) => {
    setDeleteStorageId(storageId);
    setIsDialogOpen(true);
  };

  const { data: warehousesData } = useQuery({
    queryKey: ["getAllWarehouses"],
    queryFn: getAllWarehouses,
  });

  const confirmDelete = () => {
    if (deleteStorageId) {
      deleteMutation.mutate(deleteStorageId as string);
    }
    setIsDialogOpen(false);
    setDeleteStorageId(null);
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
    setDeleteStorageId(null);
  };

  const handleEdit = (storage: Storage) => {
    setEditingStorage(storage);
    form.setValue("warehouseId", storage.warehouseId);
    form.setValue("entryTime", new Date(storage.entryTime).toISOString().split("T")[0]);
    form.setValue("exitTime", storage.exitTime ? new Date(storage.exitTime).toISOString().split("T")[0] : "");
    form.setValue("conditions", storage.conditions || "");
  };

  const handleSave = (data: z.infer<typeof FormSchema>) => {
    if (editingStorage) {
      updateMutation.mutate({
        warehouseStorageId: editingStorage.id,
        entryTime: new Date(data.entryTime),
        exitTime: data.exitTime ? new Date(data.exitTime) : undefined,
        conditions: data.conditions,
      });
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const { result, message } = await createWarehouseStorage({
        productId,
        warehouseId: data.warehouseId,
        entryTime: new Date(data.entryTime),
        exitTime: data.exitTime ? new Date(data.exitTime) : undefined,
        conditions: data.conditions,
      });

      if (result) {
        toast({ title: "Success", description: "Record created successfully!", variant: "default" });
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["getAllWarehouseStorage", productId] });
      } else {
        toast({ title: "Error", description: message, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: error + "An unexpected error occurred." + error, variant: "destructive" });
    }
  };

  return (
    <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
      <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5">
        <div className="mt-2 flex gap-4">
          {/* Form Section */}
          <div className="flex-[2] rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md">
            <Card className="h-full p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(editingStorage ? handleSave : onSubmit)} className="w-full">
                  <FormField
                    control={form.control}
                    name="warehouseId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Warehouse</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                            defaultValue=""
                          >
                            <option
                              className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                              value=""
                              disabled
                            >
                              Select a warehouse
                            </option>
                            {warehousesData?.data?.map((warehouse) => (
                              <option
                                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                                key={warehouse.id}
                                value={warehouse.id}
                              >
                                {warehouse.name}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormDescription>{"Select the warehouse for this record. Example: Phu Hoi Industrial Park, Lam Dong"}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="entryTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entry Time</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>{"Provide the entry time of the product. Example: 2025-04-10T10:18:00Z"}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="exitTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exit Time</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>{"Provide the exit time of the product (optional). Example: 2025-04-10T10:18:00Z"}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="conditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Conditions</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter storage conditions (optional)" {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>{"Provide the storage conditions (optional). Example: Temperature 4°C, Humidity 60%"}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-end gap-6 space-x-2 pt-6">
                    {editingStorage ? (
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
              <p>Are you sure you want to delete this record? This action cannot be undone.</p>
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

          {/* Warehouse Storage List Section */}
          <div className="flex-[3] rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md">
            <Card className="h-full p-4">
              <CardTitle className="text-2xl font-semibold">Warehouse Storage List</CardTitle>
              <div className="h-[60vh] w-full overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full w-full">
                    <Loading />
                  </div>
                ) : isError ? (
                  <p className="text-center text-red-500">Error loading records.</p>
                ) : storageData?.data?.length === 0 ? (
                  <div className="flex items-center justify-center w-full h-full">
                    <p className="text-center text-gray-500">No records found.</p>
                  </div>
                ) : (
                  <Table className="table-auto w-full border-collapse border mt-4">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="border px-4 py-2 text-left">Warehouse Name</TableHead>
                        <TableHead className="border px-4 py-2 text-left">Entry Time</TableHead>
                        <TableHead className="border px-4 py-2 text-left">Exit Time</TableHead>
                        <TableHead className="border px-4 py-2 text-left">Conditions</TableHead>
                        <TableHead className="border px-4 py-2 text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {storageData?.data?.map((storage) => (
                        <TableRow key={storage.id}>
                          <TableCell className="border px-4 py-2">{storage.warehouse.name}</TableCell>
                          <TableCell className="border px-4 py-2">{new Date(storage.entryTime).toLocaleDateString()}</TableCell>
                          <TableCell className="border px-4 py-2">
                            {storage.exitTime ? new Date(storage.exitTime).toLocaleDateString() : "N/A"}
                          </TableCell>
                          <TableCell className="border px-4 py-2">{storage.conditions || "N/A"}</TableCell>
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
                                  onClick={() => handleEdit(storage)}
                                >
                                  <Pencil className="h-4 w-4" />
                                  <span>Edit</span>
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="flex items-center gap-1 text-red-600 border-red-600 hover:bg-red-50"
                                  onClick={() => handleDelete(storage.id)}
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
