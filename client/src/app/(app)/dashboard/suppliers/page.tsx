"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSupplier, updateSupplier } from "@/services/database/supplier";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { createSupplier, getAllSuppliers } from "@/services/database/supplier";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import Loading from "@/components/loading";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { HoverCardContent, HoverCardTrigger, HoverCard } from "@/components/ui/hover-card";
import { Supplier } from "@prisma/client";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Supplier name must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  gpsCoordinates: z.string().min(2, {
    message: "GPS Coordinates must be at least 2 characters.",
  }),
  contactInfo: z.string().min(2, {
    message: "Contact Info must be at least 2 characters.",
  }),
});

export default function SupplierPage() {
  const router = useRouter();
  const [deleteSupplierId, setDeleteSupplierId] = useState<string | null>(null); // Lưu ID nhà cung cấp cần xóa
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Trạng thái hiển thị hộp thoại
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editingSupplier, setEditingSupplier] = useState<any>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      location: "",
      gpsCoordinates: "",
      contactInfo: "",
    },
  });

  const queryClient = useQueryClient();

  const handleDelete = (supplierId: string) => {
    setDeleteSupplierId(supplierId); // Lưu ID nhà cung cấp cần xóa
    setIsDialogOpen(true); // Mở hộp thoại xác nhận
  };

  const confirmDelete = () => {
    if (deleteSupplierId) {
      deleteMutation.mutate(deleteSupplierId); // Thực hiện xóa
    }
    setIsDialogOpen(false); // Đóng hộp thoại
    setDeleteSupplierId(null); // Reset trạng thái
  };

  const cancelDelete = () => {
    setIsDialogOpen(false); // Đóng hộp thoại
    setDeleteSupplierId(null); // Reset trạng thái
  };

  const deleteMutation = useMutation({
    mutationFn: deleteSupplier,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Supplier has been deleted successfully!",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["getAllSuppliers"] });
    },

    onError: (error) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to delete supplier.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateSupplier,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Supplier has been updated successfully!",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["getAllSuppliers"] });
      setEditingSupplier(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to update supplier.",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    form.setValue("name", supplier.name);
    form.setValue("location", supplier.location!);
    form.setValue("gpsCoordinates", supplier.gpsCoordinates!);
    form.setValue("contactInfo", supplier.contactInfo!);
  };

  const handleSave = (data: z.infer<typeof FormSchema>) => {
    if (editingSupplier) {
      updateMutation.mutate({
        supplierId: editingSupplier.id,
        name: data.name,
        location: data.location,
        gpsCoordinates: data.gpsCoordinates,
        contactInfo: data.contactInfo,
      });
    }
  };

  const {
    data: suppliersData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllSuppliers"],
    queryFn: getAllSuppliers,
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { result, message } = await createSupplier({
        name: data.name,
        contactInfo: data.contactInfo,
        location: data.location,
        gpsCoordinates: data.gpsCoordinates,
      });

      if (result) {
        toast({
          title: "Success",
          variant: "default",
          description: "Supplier has been created successfully!",
        });
        form.reset(); // Reset form sau khi tạo thành công
        queryClient.invalidateQueries({ queryKey: ["getAllSuppliers"] }); // Làm mới danh sách nhà cung cấp
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
                <form onSubmit={form.handleSubmit(editingSupplier ? handleSave : onSubmit)} className="w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supplier Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter supplier name" {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>Provide the name of the supplier. Example: Cau Dat Dairy Farm</FormDescription>
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
                          <Input placeholder="Enter location" {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>Provide the location of the supplier. Example: Da Lat</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gpsCoordinates"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GPS Coordinates</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter GPS coordinates" {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>Provide the GPS coordinates of the supplier. Example: 11.9386, 108.4558</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Info</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter contact information" {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>Provide the contact information of the supplier. Example: Phone Number 0123456789</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-end gap-6 space-x-2 pt-6">
                    {editingSupplier ? (
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
              <p>Are you sure you want to delete this supplier? This action cannot be undone.</p>
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
              <CardTitle className="text-2xl font-semibold">Supplier List</CardTitle>

              <div className="h-[60vh] w-full overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full w-full">
                    <Loading />
                  </div>
                ) : isError ? (
                  <p className="text-center text-red-500">Error loading suppliers.</p>
                ) : suppliersData?.data?.length === 0 ? (
                  <div className=" flex items-center justify-center w-full h-full">
                    {" "}
                    <p className="text-center text-gray-500">Data is Empty.</p>
                  </div>
                ) : (
                  <Table className="table-auto w-full border-collapse border mt-4 ">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="border px-4 py-2 text-left">Name</TableHead>
                        <TableHead className="border px-4 py-2 text-left">Location</TableHead>
                        <TableHead className="border px-4 py-2 text-left">GPS</TableHead>
                        <TableHead className="border px-4 py-2 text-left">Contact</TableHead>
                        <TableHead className="border px-4 py-2 text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {suppliersData?.data?.map((supplier) => (
                        <TableRow key={supplier.id}>
                          <TableCell className="border px-4 py-2">{supplier.name}</TableCell>
                          <TableCell className="border px-4 py-2">{supplier.location}</TableCell>
                          <TableCell className="border px-4 py-2">{supplier.gpsCoordinates}</TableCell>
                          <TableCell className="border px-4 py-2">{supplier.contactInfo}</TableCell>
                          <TableCell className="border px-4 py-2 text-right">
                            {/* HoverCard for Actions */}
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
                                  className="flex items-center gap-1"
                                  onClick={() => router.push(`/dashboard/suppliers/${supplier.id}/materials`)}
                                >
                                  <span>Material</span>
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center gap-1 text-blue-600 border-blue-600 hover:bg-blue-50"
                                  onClick={() => handleEdit(supplier)}
                                >
                                  <Pencil className="h-4 w-4" />
                                  <span>Edit</span>
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="flex items-center gap-1 text-red-600 border-red-600 hover:bg-red-50"
                                  onClick={() => handleDelete(supplier.id)}
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
