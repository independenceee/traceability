"use client";

import { createContext, useContext, useEffect } from "react";
import useMintOneStore, { MintOneStore } from "./store";
import { toast } from "@/hooks/use-toast";
import { createMintTransaction } from "@/services/contract/mint";
import { useWallet } from "@/hooks/use-wallet";
import { isEmpty, isNil } from "lodash";
import { submitTx } from "@/services/blockchain/submitTx";
import { useQuery } from "@tanstack/react-query";
import { addMetadata, getMetadataById } from "@/services/database/metadata";
import { defineStepper } from "@stepperize/react";
import { parseError } from "@/utils/error/parse-error";

const { useStepper: useMintOneStepper, steps: mintOneSteps } = defineStepper(
  { id: "basic", title: "Basic" },
  { id: "metadata", title: "Metadata" },
  { id: "preview", title: "Preview" },
  { id: "transaction", title: "Transaction" },
  { id: "result", title: "Result" },
);

type MintOneContextType = MintOneStore & {
  metadataTemplate: Record<string, string> | null;
  mintOneStepper: ReturnType<typeof useMintOneStepper>;
  mintOneSteps: typeof mintOneSteps;
  startMinting: () => void;
};

export default function MintOneProvider({ metadataTemplateId, children }: { metadataTemplateId: string | null; children: React.ReactNode }) {
  const { signTx, address } = useWallet();
  const mintOneStepper = useMintOneStepper();
  const {
    metadataToMint,
    setMetadataToMint,
    loading,
    setLoading,
    basicInfoToMint,
    setBasicInfoToMint,
    tasks,
    updateTaskState,
    txhash,
    setTxHash,
    resetTasks,
    collectionToSave,
    setCollectionToSave,
  } = useMintOneStore();

  useEffect(() => {
    setBasicInfoToMint(null!);
    setMetadataToMint(null!);
    setCollectionToSave(null!);
    resetTasks();
  }, [resetTasks, setBasicInfoToMint, setCollectionToSave, setMetadataToMint]);

  const { data } = useQuery({
    queryKey: ["getMetadataById", metadataTemplateId],
    queryFn: () => getMetadataById({ metadataId: metadataTemplateId! }),
    enabled: !!metadataTemplateId,
  });

  const startMinting = async () => {
    resetTasks();
    mintOneStepper.goTo("transaction");
    try {
      updateTaskState("inprogress", "validate", "Validating Data");

      if (isNil(address)) {
        throw new Error("Wallet not connected");
      }

      if (isNil(metadataToMint) && isEmpty(metadataToMint)) {
        throw new Error("Metadata is required");
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      if (!isNil(collectionToSave) && !isEmpty(collectionToSave)) {
        updateTaskState("inprogress", "save_metadata", "Save Metadata to Database");
        const { result, message } = await addMetadata({
          collectionId: collectionToSave,
          listMetadata: [metadataToMint!],
        });
        if (!result) {
          throw new Error(message);
        }
      }

      const input = {
        assetName: basicInfoToMint.assetName,
        quantity: basicInfoToMint.quantity,
        metadata: metadataToMint!,
      };

      updateTaskState("inprogress", "create_transaction", "Creating Transaction");
      const {
        data: tx,
        message,
        result,
      } = await createMintTransaction({
        address: address,
        mintInput: [
          {
            assetName: input.assetName,
            metadata: input.metadata,
            quantity: input.quantity,
          },
        ],
      });
      if (!result || isNil(tx)) {
        throw new Error(message);
      }

      // wait for confirmation
      updateTaskState("inprogress", "sign_transaction", "Waiting for  sign Tx");
      const signedTx = await signTx(tx);
      updateTaskState("inprogress", "submit_transaction", "Submitting Transaction");
      // submit transaction
      const { data: txHash, result: txResult, message: txMessage } = await submitTx(signedTx);
      if (!txResult || isNil(txHash)) {
        throw new Error(txMessage);
      }
      setTxHash(txHash);
      updateTaskState("success");
      // show result
      mintOneStepper.goTo("result");
      // create transaction
    } catch (e) {
      updateTaskState("error", "", parseError(e));
      toast({
        title: "Error",
        description: parseError(e),
        variant: "destructive",
      });
    }
  };

  return (
    <MintOneContext.Provider
      value={{
        collectionToSave,
        setCollectionToSave,
        metadataTemplate: data?.data?.content as Record<string, string>,
        loading,
        setLoading,
        metadataToMint,
        setMetadataToMint,
        basicInfoToMint,
        setBasicInfoToMint,
        tasks,
        resetTasks,
        updateTaskState,
        startMinting,
        txhash,
        setTxHash,
        mintOneStepper,
        mintOneSteps,
      }}
    >
      {children}
    </MintOneContext.Provider>
  );
}

const MintOneContext = createContext<MintOneContextType>(null!);
export const useMintOneContext = function () {
  const context = useContext(MintOneContext);
  if (!context) {
    throw new Error("useMintOneContext must be used within a MintOneProvider");
  }
  return context;
};
