"use server";
import { appNetworkId } from "@/constants";
import { Cip68Contract } from "@/contract";
import { blockfrostProvider } from "@/lib/cardano";
import { AssetInput } from "@/types";
import { parseError } from "@/utils/error/parse-error";
import { MeshWallet } from "@meshsdk/core";
import { isNil } from "lodash";

export const createBurnTransaction = async ({ address, input }: { address: string; input: AssetInput[] }) => {
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
    const burnInput = input.map((asset) => ({
      ...asset,
      quantity: asset.quantity ?? "1",
    }));

    const tx = await cip68Contract.burn(burnInput);
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
