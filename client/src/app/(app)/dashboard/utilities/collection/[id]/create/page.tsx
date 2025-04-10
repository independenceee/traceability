"use client";
import JsonBuilder from "@/components/json-builder";
import { Button } from "@/components/ui/button";
import { isEmpty, isNil } from "lodash";
import { useMetadataContext } from "@/contexts/metadata";
import { useJsonBuilderStore } from "@/components/store";
import { useEffect } from "react";

export default function MetadataStep() {
  const { createMetadata } = useMetadataContext();
  const { init, getJsonResult, error, setErrors } = useJsonBuilderStore();

  useEffect(() => {
    init(null!);
  }, [init]);

  const handleNext = () => {
    const json = getJsonResult();

    if (Object.values(json).some((value) => isEmpty(value))) {
      setErrors("Please fill all fields");
      return;
    }

    if (isEmpty(json) || isNil(json)) {
      return;
    }
    createMetadata(json);
  };

  return (
    <div className="pt-8 pb-20 px-10 m-auto flex flex-col">
      <div className="rounded-xl p-6 bg-section shadow-md flex flex-col gap-3">
        <h1 className="text-2xl font-medium leading-7 text-center">Create Metadata</h1>
        <div className="h-full py-8 m-auto flex w-full gap-4">
          <div className="rounded-md flex-1 pb-4">
            <JsonBuilder />
          </div>

          <div className="fixed right-0 bottom-0 z-10 max-h-16 w-full bg-section">
            <div className="mx-4 flex h-16 items-center sm:mx-8">
              <div className="flex flex-1 items-center justify-end space-x-2">
                <Button onClick={handleNext} disabled={!isEmpty(error)}>
                  Create Metadata
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
