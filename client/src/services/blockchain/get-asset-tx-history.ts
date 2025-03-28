"use server";

import { blockfrostFetcher } from "@/lib/cardano";
import { SpecialTransaction, Transaction, TransactionAsset } from "@/types";
import { parseError } from "@/utils/error/parse-error";
import { isNil } from "lodash";

export async function getAssetTxHistory({ unit, page = 1, limit = 12 }: { unit: string; page?: number; limit?: number }) {
  try {
    const assetTxs: TransactionAsset[] = await blockfrostFetcher.fetchAssetTransactions(unit);
    const total = assetTxs.length;
    const assetsSlice = assetTxs.slice((page - 1) * limit, page * limit);

    const assetHistories = await Promise.all(
      assetsSlice.map(async function (assetTx) {
        const specialTransaction: SpecialTransaction = await blockfrostFetcher.fetchSpecialTransaction(assetTx.tx_hash);
        const assetTxUTxO: Transaction = await blockfrostFetcher.fetchTransactionsUTxO(assetTx.tx_hash);
        const assetInput = assetTxUTxO.inputs.find(function (input) {
          const asset = input.amount.find(function (amt) {
            return amt.unit === unit;
          });
          return asset !== undefined;
        });

        const assetOutput = assetTxUTxO.outputs.find(function (output) {
          const asset = output.amount.find(function (amt) {
            return amt.unit === unit;
          });
          return asset !== undefined;
        });

        if (!assetInput && assetOutput) {
          return {
            txHash: assetTx.tx_hash,
            datetime: assetTx.block_time,
            fee: specialTransaction.fees,
            status: "Completed",
            action: "Mint",
          };
        }

        if (!assetOutput && assetInput) {
          return {
            txHash: assetTx.tx_hash,
            datetime: assetTx.block_time,
            fee: specialTransaction.fees,
            status: "Completed",
            action: "Burn",
          };
        }

        if (assetInput && assetOutput) {
          return {
            txHash: assetTx.tx_hash,
            datetime: assetTx.block_time,
            fee: specialTransaction.fees,
            status: "Completed",
            action: "Update",
          };
        }
      }),
    );

    const response = assetHistories.filter((history) => !isNil(history));

    return {
      data: response,
      totalItem: total,
      totalPage: Math.ceil(total / limit),
      currentPage: page,
    };
  } catch (e) {
    return {
      data: [],
      message: parseError(e),
    };
  }
}
