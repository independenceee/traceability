import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useUnitContext } from "@/contexts/unit";
import { hexToString } from "@meshsdk/core";
import { isNil } from "lodash";
import Link from "next/link";
import { useState } from "react";

export default function BasicStep() {
  const [open, setOpen] = useState(false);
  const { startBurning, unit, quantityToBurn, setQuantityToBurn, assetDetails } = useUnitContext();
  const [err, setErr] = useState<string | null>(null);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className=" max-w-[40vw]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              You are initiating a burn of {hexToString(assetDetails.asset_name.replace(/^000643b0/, ""))} for total quantity {quantityToBurn}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Please note: This action is permanent and will irreversibly remove your assets data on the blockchain.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={startBurning}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="h-full py-8 px-10 m-auto flex flex-col">
        <div className="rounded-md border border-dashed">
          <div className="flex flex-col space-y-2 text-left p-8">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">Quantity to Burn</h2>
              {err && <p className="text-red-500">{err}</p>}
              <div className="flex space-x-2 w-1/2 p-2 ">
                <Input
                  type="number"
                  value={quantityToBurn ?? 1}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val > Number(assetDetails.quantity)) {
                      setErr("Quantity to burn cannot be more than the available quantity");
                    } else if (val < 1) {
                      setErr("Quantity to burn cannot be less than 1");
                    } else {
                      setErr(null);
                    }
                    setQuantityToBurn({ quantity: val });
                  }}
                  required
                  min={1}
                  max={Number(assetDetails.quantity)}
                />
              </div>
              <Slider
                value={[quantityToBurn ?? 1]}
                onValueChange={([val]) => {
                  if (val > Number(assetDetails.quantity)) {
                    setErr("Quantity to burn cannot be more than the available quantity");
                  } else if (val < 1) {
                    setErr("Quantity to burn cannot be less than 1");
                  } else {
                    setErr(null);
                  }
                  setQuantityToBurn({ quantity: val });
                }}
                max={Number(assetDetails.quantity)}
                step={1}
                className="py-4 w-1/2"
              />
            </div>
          </div>
        </div>
        <div className="fixed right-0 bottom-0 z-10 max-h-16 w-full bg-section">
          <div className="mx-4 flex h-16 items-center sm:mx-8">
            <div className="flex flex-1 items-center justify-end space-x-2">
              <Link href={`/dashboard/asset/${unit}`}>
                <Button variant="secondary">Back</Button>
              </Link>
              <Button onClick={() => setOpen(true)} disabled={!isNil(err)}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
