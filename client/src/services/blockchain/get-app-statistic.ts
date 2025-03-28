"use server";

import { blockfrostFetcher } from "@/lib/cardano";
import { parseError } from "@/utils/error/parse-error";
import { APP_WALLET_ADDRESS } from "../../../contract/script/constants";

export const getAppStatistic = async () => {
  try {
    const { stake_address } = await blockfrostFetcher.fetchSpecicalAddress(APP_WALLET_ADDRESS);
    const addresses = await blockfrostFetcher.fetchAccountAssociate(stake_address);
    const accounts = await blockfrostFetcher.fetchDetailsAccount(stake_address);
    const totalTransaction = accounts.tx_count;
    const totalMint = accounts.received_sum.length - 1;
    const totalBurn = accounts.received_sum.length - accounts.sent_sum.length;
    const data = {
      transaction: totalTransaction,
      mint: totalMint,
      burn: totalBurn,
      update: addresses.length,
    };

    return {
      data,
      message: "Success",
    };
  } catch (e) {
    return {
      data: null,
      message: parseError(e),
    };
  }
};
