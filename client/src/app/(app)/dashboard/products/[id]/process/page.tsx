"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProductionProcess, getAllProductionProcesses, deleteProductionProcess, updateProductionProcess } from "@/services/database/process";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardTitle } from "@/components/ui/card";
import Loading from "@/components/loading";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useParams } from "next/navigation";

const FormSchema = z.object({
  startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid start time.",
  }),
  endTime: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Please enter a valid end time.",
    }),
  location: z.string().optional(),
});

export default function ProcessPage() {
  const params = useParams();
  const productId = params.id as string;

  const [deleteProcessId, setDeleteProcessId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProcess, setEditingProcess] = useState<any>(null);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      startTime: "",
      endTime: "",
      location: "",
    },
  });

  const handleDelete = (processId: string) => {
    setDeleteProcessId(processId);
    setIsDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteProcessId) {
      deleteMutation.mutate(deleteProcessId);
    }
    setIsDialogOpen(false);
    setDeleteProcessId(null);
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
    setDeleteProcessId(null);
  };

  const deleteMutation = useMutation({
    mutationFn: deleteProductionProcess,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Production process has been deleted successfully!",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["getAllProductionProcesses", productId] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to delete production process.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProductionProcess,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Production process has been updated successfully!",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["getAllProductionProcesses", productId] });
      setEditingProcess(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to update production process.",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (process: any) => {
    setEditingProcess(process);
    form.setValue("startTime", new Date(process.startTime).toISOString().split("T")[0]);
    form.setValue("endTime", process.endTime ? new Date(process.endTime).toISOString().split("T")[0] : "");
    form.setValue("location", process.location || "");
  };

  const handleSave = (data: z.infer<typeof FormSchema>) => {
    if (editingProcess) {
      updateMutation.mutate({
        productionProcessId: editingProcess.id,
        startTime: new Date(data.startTime),
        endTime: data.endTime ? new Date(data.endTime) : undefined,
        location: data.location,
      });
    }
  };

  const {
    data: processesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllProductionProcesses", productId],
    queryFn: () => getAllProductionProcesses({ productId }),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { result, message } = await createProductionProcess({
        productId,
        startTime: new Date(data.startTime),
        endTime: data.endTime ? new Date(data.endTime) : undefined,
        location: data.location,
      });

      if (result) {
        toast({
          title: "Success",
          variant: "default",
          description: "Production process has been created successfully!",
        });
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["getAllProductionProcesses", productId] });
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
        <div className="mt-2 flex gap-4 ">
          <div className="flex-[2] rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md">
            <Card className="h-full p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(editingProcess ? handleSave : onSubmit)} className="w-full">
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>Provide the start time of the production process.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Time</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>Provide the end time of the production process (optional).</FormDescription>
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
                        <FormDescription>Provide the location of the production process (optional).</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-end gap-6 space-x-2 pt-6">
                    {editingProcess ? (
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
              <p>Are you sure you want to delete this production process? This action cannot be undone.</p>
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
              <CardTitle className="text-2xl font-semibold">Production Process List</CardTitle>

              <div className="h-[60vh] w-full overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full w-full">
                    <Loading />
                  </div>
                ) : isError ? (
                  <p className="text-center text-red-500">Error loading production processes.</p>
                ) : processesData?.data?.length === 0 ? (
                  <div className="flex items-center justify-center w-full h-full">
                    <p className="text-center text-gray-500">No production processes found.</p>
                  </div>
                ) : (
                  <Table className="table-auto w-full border-collapse border mt-4">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="border px-4 py-2 text-left">Start Time</TableHead>
                        <TableHead className="border px-4 py-2 text-left">End Time</TableHead>
                        <TableHead className="border px-4 py-2 text-left">Location</TableHead>
                        <TableHead className="border px-4 py-2 text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {processesData?.data?.map((process) => (
                        <TableRow key={process.id}>
                          <TableCell className="border px-4 py-2">{new Date(process.startTime).toLocaleDateString()}</TableCell>
                          <TableCell className="border px-4 py-2">
                            {process.endTime ? new Date(process.endTime).toLocaleDateString() : "No end time"}
                          </TableCell>
                          <TableCell className="border px-4 py-2">{process.location || "No location provided"}</TableCell>
                          <TableCell className="border px-4 py-2 text-center">
                            <div className="flex justify-center gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleEdit(process)}>
                                Edit
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleDelete(process.id)}>
                                Delete
                              </Button>
                            </div>
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
