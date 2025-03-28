"use client";
import * as React from "react";
import { ResultStep, TransactionStep } from "../_components/mint-step";
import StepperNav from "../_components/stepper-nav";
import { useMintManyContext } from "@/contexts/mint-many";
import UploadSteps from "../_components/mint-step/upload";
import ManyPreview from "../_components/mint-step/many-preview";

export default function Page() {
  const { loading, mintManyStepper, mintManySteps, tasks, txhash, startMinting, assetInputToMint, setAssetInputToMint, uploadCsv } =
    useMintManyContext();

  return (
    <div className="pt-8 pb-20 px-10 m-auto flex flex-col">
      <div className="rounded-xl p-6 bg-section shadow-md flex flex-col gap-3">
        <h1 className="text-2xl font-medium leading-7 text-center">Mint Steps</h1>

        <StepperNav stepper={mintManyStepper} steps={mintManySteps} />
        <div className="space-y-4">
          {mintManyStepper.switch({
            upload: () => <UploadSteps loading={loading} uploadCSV={uploadCsv} />,
            preview: () => (
              <ManyPreview
                assetInputToMint={assetInputToMint}
                setAssetInputToMint={setAssetInputToMint}
                stepper={mintManyStepper}
                startMinting={startMinting}
              />
            ),
            transaction: () => <TransactionStep stepper={mintManyStepper} tasks={tasks} />,
            result: () => <ResultStep txhash={txhash} />,
          })}
        </div>
      </div>
    </div>
  );
}
