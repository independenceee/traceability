"use server";

import { blockfrostFetcher } from "@/lib/cardano";
import { SpecialTransaction } from "@/types";
import { datumToJson } from "@/utils";
import { parseError } from "@/utils/error/parse-error";

export const getHistoryMetadata = async function ({ unit, txHash }: { unit: string; txHash: string }) {
  try {
    const specialTransaction: SpecialTransaction = await blockfrostFetcher.fetchSpecialTransaction(txHash);
    const transaction = await blockfrostFetcher.fetchTransactionsUTxO(txHash);

    const assetInput = transaction.inputs.find(function (input) {
      const asset = input.amount.find(function (amt) {
        return amt.unit === unit;
      });
      return asset !== undefined;
    });

    const assetOutput = transaction.outputs.find(function (output) {
      const asset = output.amount.find(function (amt) {
        return amt.unit === unit;
      });
      return asset !== undefined;
    });

    if (!assetInput && assetOutput) {
      return {
        metadata: {
          from: null!,
          to: assetOutput.inline_datum ? await datumToJson(assetOutput.inline_datum) : {},
        },
        txHash: txHash,
        datetime: specialTransaction.block_time,
        fee: specialTransaction.fees,
        status: "Completed",
        action: "Mint",
      };
    }

    if (!assetOutput && assetInput) {
      return {
        metadata: {
          from: assetInput.inline_datum ? await datumToJson(assetInput.inline_datum) : {},
          to: null!,
        },
        txHash: txHash,
        datetime: specialTransaction.block_time,
        fee: specialTransaction.fees,
        status: "Completed",
        action: "Burn",
      };
    }

    if (assetInput && assetOutput) {
      return {
        metadata: {
          from: assetInput.inline_datum ? await datumToJson(assetInput.inline_datum) : {},
          to: assetOutput.inline_datum ? await datumToJson(assetOutput.inline_datum) : {},
        },
        txHash: txHash,
        datetime: specialTransaction.block_time,
        fee: specialTransaction.fees,
        status: "Completed",
        action: "Update",
      };
    }
  } catch (e) {
    return {
      data: null,
      message: parseError(e),
    };
  }
};
