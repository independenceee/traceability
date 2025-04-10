/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "@/hooks/use-toast";
import { useWallet } from "@/hooks/use-wallet";
import { isNil } from "lodash";
import { parseError } from "@/utils/error/parse-error";
import { Card } from "@/components/ui/card";

const nftFormSchema = z.object({
  assetName: z
    .string()
    .min(1, {
      message: "Name must be at least 1 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  assetQuantity: z.string().refine(
    (val) => {
      const parsedValue = parseInt(val, 10);
      return !Number.isNaN(parsedValue) && parsedValue > 0;
    },
    {
      message: "Invalid value",
    },
  ),
});

type NftFormValues = z.infer<typeof nftFormSchema>;

export default function BasicStep({
  stepper,
  basicInfoToMint,
  setBasicInfoToMint,
}: {
  stepper: any;
  basicInfoToMint: { assetName: string; quantity: string };
  setBasicInfoToMint: (data: { assetName: string; quantity: string }) => void;
}) {
  const { address } = useWallet();
  const defaultValues: Partial<NftFormValues> = {
    assetQuantity: basicInfoToMint?.quantity || "1",
    assetName: basicInfoToMint?.assetName,
  };

  const form = useForm<NftFormValues>({
    resolver: zodResolver(nftFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: NftFormValues) {
    try {
      if (!(parseInt(data.assetQuantity || "0", 10) > 0)) {
        throw new Error("Invalid quantity");
      }

      if (isNil(address)) {
        throw new Error("Wallet not connected");
      }

      setBasicInfoToMint({
        assetName: data.assetName,
        quantity: data.assetQuantity,
      });
      stepper.next();
    } catch (e) {
      toast({
        title: "Error",
        description: parseError(e),
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="py-8 m-auto flex gap-4">
          <Card className="h-full flex-[2]">
            <div className="space-y-8">
              <div className="relative flex-col items-center justify-center">
                <div className="lg:p-4">
                  <div className="mx-auto flex w-full flex-col  space-y-6">
                    <div className="flex flex-col space-y-2 text-left">
                      <h1 className="text-2xl font-semibold tracking-tight">Basic Information</h1>
                    </div>
                    <div className="space-y-6">
                      <div className="border-none p-0 outline-none gap-2 flex flex-col">
                        <FormField
                          control={form.control}
                          name="assetName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Product Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter a Name" {...field} />
                              </FormControl>
                              <FormDescription>Provide the name of the product.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="assetQuantity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Product Quantity</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormDescription>Provide the quantity of the product.</FormDescription>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex items-center justify-end gap-6 space-x-2 pt-6">
                          <Button className="w-full self-stretch" type="submit">
                            Next
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card className="flex-[3]"></Card>
        </div>
      </form>
    </Form>
  );
}
