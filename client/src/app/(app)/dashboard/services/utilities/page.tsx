"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createService, getAllServices, deleteService, updateService } from "@/services/database/service";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Loading from "@/components/loading";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Service } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Pencil, Trash2 } from "lucide-react";

const FormSchema = z.object({
  name: z.string().min(2, { message: "Service name must be at least 2 characters." }),
  description: z.string().optional(),
  price: z.number().min(0, { message: "Price must be a positive number." }),
  duration: z.number().min(1, { message: "Duration must be at least 1 minute." }),
});

export default function ServicePage() {
  const [deleteServiceId, setDeleteServiceId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service>(null!);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      duration: 0,
    },
  });

  const {
    data: servicesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllServices"],
    queryFn: getAllServices,
  });

  const createMutation = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      toast({ title: "Success", description: "Service created successfully!", variant: "default" });
      queryClient.invalidateQueries({ queryKey: ["getAllServices"] });
      form.reset();
    },
    onError: (error) => {
      toast({ title: "Error", description: error?.message || "Failed to create service.", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateService,
    onSuccess: () => {
      toast({ title: "Success", description: "Service updated successfully!", variant: "default" });
      queryClient.invalidateQueries({ queryKey: ["getAllServices"] });
      setEditingService(null!);
    },
    onError: (error) => {
      toast({ title: "Error", description: error?.message || "Failed to update service.", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      toast({ title: "Success", description: "Service deleted successfully!", variant: "default" });
      queryClient.invalidateQueries({ queryKey: ["getAllServices"] });
    },
    onError: (error) => {
      toast({ title: "Error", description: error?.message || "Failed to delete service.", variant: "destructive" });
    },
  });

  const handleDelete = (serviceId: string) => {
    setDeleteServiceId(serviceId);
    setIsDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteServiceId) {
      deleteMutation.mutate(deleteServiceId);
    }
    setIsDialogOpen(false);
    setDeleteServiceId(null);
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
    setDeleteServiceId(null);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    form.setValue("name", service.name);
    form.setValue("description", service.description || "");
    form.setValue("price", service.price);
    form.setValue("duration", service.duration);
  };

  const handleSave = (data: z.infer<typeof FormSchema>) => {
    if (editingService) {
      updateMutation.mutate({
        serviceId: editingService.id,
        name: data.name,
        description: data.description,
        price: data.price,
        duration: data.duration,
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
                <form onSubmit={form.handleSubmit(handleSave)} className="w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter service name" {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>{"Provide the name of the product. Example: Organic A2 Cheese"}</FormDescription>

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
                        <FormDescription>{"Provide the name of the product. Example: Organic A2 Cheese"}</FormDescription>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter duration"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="w-full"
                          />
                        </FormControl>
                        <FormDescription>{"Provide the name of the product. Example: Organic A2 Cheese"}</FormDescription>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (minutes)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter duration"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="w-full"
                          />
                        </FormControl>
                        <FormDescription>{"Provide the duration in minutes. Example: 60"}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full mt-4">
                    {editingService ? "Save Changes" : "Create Service"}
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
              <p>Are you sure you want to delete this service? This action cannot be undone.</p>
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
              <CardTitle className="text-2xl font-semibold">Service List</CardTitle>
              <div className="h-[60vh] w-full overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full w-full">
                    <Loading />
                  </div>
                ) : isError ? (
                  <p className="text-center text-red-500">Error loading services.</p>
                ) : servicesData?.data?.length === 0 ? (
                  <p className="text-center text-gray-500">No services found.</p>
                ) : (
                  <Table className="table-auto w-full border-collapse border mt-4">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="border px-4 py-2 text-left">Name</TableHead>
                        <TableHead className="border px-4 py-2 text-left">Description</TableHead>
                        <TableHead className="border px-4 py-2 text-left">Price</TableHead>
                        <TableHead className="border px-4 py-2 text-left">Duration</TableHead>
                        <TableHead className="border px-4 py-2 text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {servicesData?.data?.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell className="border px-4 py-2">{service.name}</TableCell>
                          <TableCell className="border px-4 py-2">{service.description || "N/A"}</TableCell>
                          <TableCell className="border px-4 py-2">{service.price}</TableCell>
                          <TableCell className="border px-4 py-2">{service.duration}</TableCell>
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
                                  onClick={() => handleEdit(service)}
                                >
                                  <Pencil className="h-4 w-4" />
                                  <span>Edit</span>
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="flex items-center gap-1 text-red-600 border-red-600 hover:bg-red-50"
                                  onClick={() => handleDelete(service.id)}
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
