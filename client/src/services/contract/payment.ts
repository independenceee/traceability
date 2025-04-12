"use server";
import { appNetworkId } from "@/constants";
import { Cip68Contract } from "@/contract";
import { blockfrostProvider } from "@/lib/cardano";
import { parseError } from "@/utils/error/parse-error";
import { MeshWallet } from "@meshsdk/core";
import { isNil } from "lodash";

export const payment = async ({ address, amount }: { address: string; amount: string }) => {
  try {
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
    const tx = await cip68Contract.payment({ amount });
    return {
      result: true,
      data: tx,
      message: "Transaction created successfully",
    };
  } catch (e) {
    return {
      result: false,
      data: null,
      message: parseError(e),
    };
  }
};
