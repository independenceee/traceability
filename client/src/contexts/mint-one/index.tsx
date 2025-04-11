"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
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
import { getProductById } from "@/services/database/products";

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

export default function MintOneProvider({
  metadataTemplateId,
  productId,
  children,
}: {
  metadataTemplateId: string | null;
  productId: string | null;
  children: React.ReactNode;
}) {
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

  const { data: productData } = useQuery({
    queryKey: ["getProductById", productId],
    queryFn: () => getProductById({ productId: productId! }),
    enabled: !!productId,
  });

  const productMetadata = useMemo(() => {
    if (!productData?.data) return null;

    const { name, imageUrl, description, Certification, Document, ProductionProcess, WarehouseStorage } = productData.data;

    const flattenedCertificates = Certification?.reduce(
      (acc, cert, index) => {
        acc[`cerfiticate_name_${index + 1}`] = cert.certName || `Certificate Name ${index + 1}`;
        acc[`cerfiticate_image_${index + 1}`] = cert.certHash || `Certificate Image ${index + 1}`;
        acc[`cerfiticate_issue_date_${index + 1}`] = cert.issueDate ? cert.issueDate.toISOString() : `Certificate Issue Date ${index + 1}`;
        acc[`cerfiticate_expiry_date_${index + 1}`] =
          cert.expiryDate instanceof Date ? cert.expiryDate.toISOString() : cert.expiryDate || `Certificate Expiry Date ${index + 1}`;
        return acc;
      },
      {} as Record<string, string>,
    );

    const flattenedDocuments = Document?.reduce(
      (acc, document, index) => {
        acc[`document_type_${index + 1}`] = document.docType || `Document Type ${index + 1}`;
        acc[`document_image_${index + 1}`] = document.hash || `Document Image ${index + 1}`;
        acc[`document_url_${index + 1}`] = document.url || `Document Url ${index + 1}`;
        return acc;
      },
      {} as Record<string, string>,
    );

    const flattenedWarehouse = WarehouseStorage?.reduce(
      (acc, warehouse, index) => {
        acc[`warehouse_conditions_${index + 1}`] = warehouse.conditions || `Warehouse Conditions ${index + 1}`;
        acc[`warehouse_name_${index + 1}`] = warehouse.warehouse.name || `Warehouse Name ${index + 1}`;
        acc[`warehouse_entry_date_${index + 1}`] = warehouse.entryTime ? warehouse.entryTime.toISOString() : `Warehouse Entry Date ${index + 1}`;
        acc[`warehouse_exit_date_${index + 1}`] =
          warehouse.exitTime instanceof Date ? warehouse.exitTime.toISOString() : warehouse.exitTime || `Warehouse Exit Date ${index + 1}`;
        return acc;
      },
      {} as Record<string, string>,
    );

    const flattenedProcesses = ProductionProcess?.reduce(
      (acc, process, index) => {
        acc[`warehouse_location_${index + 1}`] = process.location || `Product Process Location ${index + 1}`;
        acc[`process_start_date_${index + 1}`] = process.startTime ? process.startTime.toISOString() : `Process Start Date ${index + 1}`;
        acc[`process_end_date_${index + 1}`] =
          process.endTime instanceof Date ? process.endTime.toISOString() : process.endTime || `Process End Date ${index + 1}`;
        return acc;
      },
      {} as Record<string, string>,
    );

    return {
      name: name || "Unknown Product",
      image: imageUrl || "",
      description: description || "No description available",
      media_type: "image/png",
      ...flattenedCertificates,
      ...flattenedDocuments,
      ...flattenedWarehouse,
      ...flattenedProcesses,
    };
  }, [productData]);

  const metadataTemplate = useMemo(() => {
    return data?.data?.content || productMetadata;
  }, [data?.data?.content, productMetadata]);

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
        metadataTemplate: metadataTemplate as Record<string, string>,
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
