"use server";

import { blockfrostProvider } from "@/lib/cardano";
import { parseError } from "@/utils/error/parse-error";

export async function submitTx(tx: string): Promise<{
  data: string | null;
  result: boolean;
  message: string;
}> {
  try {
    const txHash = await blockfrostProvider.submitTx(tx);
    return {
      data: txHash,
      result: true,
      message: "Transaction submitted successfully",
    };
  } catch (e) {
    return {
      data: null,
      result: false,
      message: parseError(e),
    };
  }
}
