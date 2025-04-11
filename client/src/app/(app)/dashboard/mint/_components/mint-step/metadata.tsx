import JsonBuilder from "@/components/json-builder";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useJsonBuilderStore } from "@/components/store";
import { isEmpty, isNil } from "lodash";

export default function MetadataStep({
  stepper,
  setMetadataToMint,
  metadataToMint,
}: {
  stepper: { next: () => void; prev: () => void; isFirst: boolean };
  setMetadataToMint: (metadata: Record<string, string>) => void;
  metadataToMint: Record<string, string> | null;
}) {
  const { init, getJsonResult, setErrors } = useJsonBuilderStore();

  useEffect(() => {
    init(metadataToMint || {});
  }, [init, metadataToMint]);

  const handleNext = () => {
    const json = getJsonResult();

    if (isEmpty(json) || isNil(json) || Object.values(json).some((value) => isEmpty(value))) {
      setErrors("Please fill all fields");
      return;
    }

    setMetadataToMint(json);
    stepper.next();
  };
  return (
    <div className="h-full py-8 m-auto flex w-full gap-4">
      <div className="rounded-md flex-1 pb-4">
        <JsonBuilder className="flex h-full justify-between w-full" />
        <div className=" z-10 max-h-16 w-full ">
          <div className="ml-4 flex h-16 items-center">
            <div className="flex flex-1 items-center justify-end space-x-2">
              <Button className="w-1/4" variant="secondary" onClick={stepper.prev} disabled={stepper.isFirst}>
                Back
              </Button>
              <Button className="w-1/4" onClick={handleNext}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
