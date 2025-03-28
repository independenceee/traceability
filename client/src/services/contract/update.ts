"use server";
import { appNetworkId } from "@/constants";
import { Cip68Contract } from "@/contract";
import { blockfrostProvider } from "@/lib/cardano";
import { AssetInput } from "@/types";
import { parseError } from "@/utils/error/parse-error";
import { deserializeAddress, MeshWallet } from "@meshsdk/core";
import { isNil } from "lodash";

export const createUpdateTransaction = async ({ address, input }: { address: string; input: AssetInput[] }) => {
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
    const walletPk = deserializeAddress(wallet.getChangeAddress()).pubKeyHash;
    const updateInput = input.map((asset) => ({
      assetName: asset.assetName,
      metadata: {
        ...asset.metadata,
        _pk: walletPk,
      },
    }));
    const tx = await cip68Contract.update(updateInput);
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
