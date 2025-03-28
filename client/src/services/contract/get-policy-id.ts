"use server";

import { appNetworkId } from "@/constants";
import { Cip68Contract } from "@/contract";
import { blockfrostProvider } from "@/lib/cardano";
import { MeshWallet } from "@meshsdk/core";
import { isNil } from "lodash";

export const getContractPolicyId = async ({ address }: { address: string }) => {
  if (isNil(address)) {
    throw new Error("User not found");
  }
  const wallet = new MeshWallet({
    networkId: appNetworkId,
    fetcher: blockfrostProvider,
    submitter: blockfrostProvider,
    key: {
      type: "address",
      address: address,
    },
  });
  const cip68Contract: Cip68Contract = new Cip68Contract({
    wallet: wallet,
  });
  return cip68Contract.policyId;
};
