"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCertification, getAllCertifications, deleteCertification, updateCertification } from "@/services/database/certification";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardTitle } from "@/components/ui/card";
import Loading from "@/components/loading";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import { Media } from "@prisma/client";
import { MediaPick } from "@/components/media-pick";
import Certification from "@/components/certification";
import Pagination from "@/components/pagination";

const FormSchema = z.object({
  certName: z.string().min(2, {
    message: "Certification name must be at least 2 characters.",
  }),
  issueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid issue date.",
  }),
  expiryDate: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Please enter a valid expiry date.",
    }),
  certHash: z.string().optional(),
});

export default function CertificationPage() {
  const params = useParams();
  const productId = params.id as string;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deleteCertificationId, setDeleteCertificationId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editingCertification, setEditingCertification] = useState<any>(null);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      certName: "",
      issueDate: "",
      expiryDate: "",
      certHash: "",
    },
  });

  const handleDelete = (certificationId: string) => {
    setDeleteCertificationId(certificationId);
    setIsDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteCertificationId) {
      deleteMutation.mutate(deleteCertificationId);
    }
    setIsDialogOpen(false);
    setDeleteCertificationId(null);
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
    setDeleteCertificationId(null);
  };

  const deleteMutation = useMutation({
    mutationFn: (certificationId: string) => deleteCertification(certificationId),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Certification has been deleted successfully!",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["getAllCertifications", productId] });
    },

    onError: (error) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to delete certification.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { certificationId: string; certName: string; issueDate: Date; expiryDate?: Date; certHash?: string }) =>
      updateCertification(data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Certification has been updated successfully!",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["getAllCertifications", productId] });
      setEditingCertification(null);
    },

    onError: (error) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to update certification.",
        variant: "destructive",
      });
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (certification: any) => {
    setEditingCertification(certification);
    form.setValue("certName", certification.certName);
    form.setValue("issueDate", new Date(certification.issueDate).toISOString().split("T")[0]);
    form.setValue("expiryDate", certification.expiryDate ? new Date(certification.expiryDate).toISOString().split("T")[0] : "");
    form.setValue("certHash", certification.certHash || "");
  };

  const handleSave = (data: z.infer<typeof FormSchema>) => {
    if (editingCertification) {
      updateMutation.mutate({
        certificationId: editingCertification.id,
        certName: data.certName,
        issueDate: new Date(data.issueDate),
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : undefined,
        certHash: data.certHash,
      });
    }
  };

  const {
    data: certificationsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllCertifications", productId],
    queryFn: async () => {
      const response = await getAllCertifications({ productId, page: currentPage, limit: itemsPerPage });
      if (response.result) {
        return { data: response.data, totalPages: response.totalPages };
      }
      throw new Error(response.message || "Failed to fetch certifications.");
    },
    staleTime: 5000,
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { result, message } = await createCertification({
        productId,
        certName: data.certName,
        issueDate: new Date(data.issueDate),
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : undefined,
        certHash: data.certHash,
      });

      if (result) {
        toast({
          title: "Success",
          variant: "default",
          description: "Certification has been created successfully!",
        });
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["getAllCertifications", productId] });
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
        description: error + " An unexpected error occurred.",
        variant: "destructive",
      });
    }
  }

  const totalPages = certificationsData?.totalPages || 1;

  const addMediaField = (mediaField: Media) => {
    form.setValue("certHash", mediaField.url);
  };

  return (
    <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
      <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5">
        <div className="mt-2 flex gap-4 ">
          <div className="flex-[2] rounded-lg shadow-none transition-shadow duration-300 hover:shadow-md">
            <Card className="h-full p-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(editingCertification ? handleSave : onSubmit)} className="w-full">
                  <FormField
                    control={form.control}
                    name="certName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Certification Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter certification name" {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>{"Provide the name of the certification. Example: USDA Organic"}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="issueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issue Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>{"Provide the issue date of the certification. Example: 2024-12-01T00:00:00Z"}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>{"Provide the expiry date of the certification (optional). Example: 2024-12-01T00:00:00Z"}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="certHash"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blockchain Hash</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter hash certificate (optional)." {...field} className="w-full" />
                        </FormControl>
                        <FormDescription>
                          {"Provide the blockchain hash of the certification (if applicable). Example: ipfs://QmZSLSNpbEBCLp9DhW8"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-end gap-6 space-x-2 pt-6">
                    {editingCertification ? (
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
              <p>Are you sure you want to delete this certification? This action cannot be undone.</p>
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
              <CardTitle className="text-2xl font-semibold">Certification List</CardTitle>

              <div className="h-[60vh] w-full overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full w-full">
                    <Loading />
                  </div>
                ) : isError ? (
                  <p className="text-center text-red-500">Error loading certifications.</p>
                ) : certificationsData?.data?.length === 0 ? (
                  <div className="flex items-center justify-center w-full h-full">
                    <p className="text-center text-gray-500">No certifications found.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                      {certificationsData?.data?.map((certification) => (
                        <Certification
                          key={certification.id}
                          data={certification}
                          onEdit={() => handleEdit(certification)}
                          onDelete={() => handleDelete(certification.id)}
                        />
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
