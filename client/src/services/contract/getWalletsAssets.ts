"use server";
import { blockfrostFetcher, koiosFetcher } from "@/lib/cardano";
import { AssetType } from "@/types";
import { convertToKeyValue } from "@/utils";
import { parseError } from "@/utils/error/parse-error";
import { hexToString } from "@meshsdk/core";
import { APP_WALLET_ADDRESS } from "../../../contract/script/constants";

export async function getAssets({ query = "", page = 1, limit = 12 }: { query?: string; page?: number; limit?: number }) {
  try {
    const specAddress = await blockfrostFetcher.fetchSpecicalAddress(APP_WALLET_ADDRESS);

    const addresses = await blockfrostFetcher.fetchAddressesFromStakeAddress(specAddress.stake_address);
    const allAssets = (
      await Promise.all(
        addresses.map(async ({ address }) => {
          const assetsAddress: AssetType[] = await koiosFetcher.fetchAssetsFromAddress(address);
          const filteredAssetsAddress = assetsAddress.filter((asset) => asset.policy_id);
          const assetList = filteredAssetsAddress.map((asset) => [asset.policy_id, asset.asset_name]);
          const data = await koiosFetcher.fetchAssetsInfo(assetList);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return data.map((asset: any) => ({
            policy_id: asset.policy_id,
            asset_name: asset.asset_name,
            fingerprint: asset.fingerprint,
            quantity: asset.quantity,
            onchain_metadata: convertToKeyValue(asset.cip68_metadata?.["100"]?.fields[0].map),
            onchain: true,
          }));
        }),
      )
    ).flat();

    const filteredAssets = allAssets.filter((asset) => {
      const assetNameString = hexToString(asset.asset_name);
      return assetNameString.toLowerCase().includes(query.toLowerCase());
    });
    const total = filteredAssets.length;
    const paginatedAssets = filteredAssets.slice((page - 1) * limit, page * limit);

    return {
      totalUserAssets: allAssets.length,
      data: paginatedAssets,
      totalItem: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  } catch (e) {
    return { data: [], message: parseError(e) };
  }
}
