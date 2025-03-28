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
    <div className="h-full py-8 px-10 m-auto flex flex-col">
      <div className="rounded-md border border-dashed">
        <JsonBuilder />
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <Button onClick={handleNext} disabled={!isEmpty(error)}>
          Create Metadata
        </Button>
      </div>
    </div>
  );
}
