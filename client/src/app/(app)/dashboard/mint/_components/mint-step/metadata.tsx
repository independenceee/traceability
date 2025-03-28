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
    <div className="h-full py-8 px-10 m-auto flex flex-col">
      <div className="rounded-md border border-dashed">
        {/* <div className="flex flex-col space-y-2 text-left p-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Metadata Build
          </h1>
        </div> */}
        <JsonBuilder />
      </div>
      <div className="fixed right-0 bottom-0 z-10 max-h-16 w-full bg-section">
        <div className="mx-4 flex h-16 items-center sm:mx-8">
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Button variant="secondary" onClick={stepper.prev} disabled={stepper.isFirst}>
              Back
            </Button>
            <Button onClick={handleNext}>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
