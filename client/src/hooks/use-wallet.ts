import { create } from "zustand";
import { BrowserWallet, Wallet } from "@meshsdk/core";
import { isNil } from "lodash";
// import { isNil } from "lodash";
// import { signIn, signOut } from "next-auth/react";
// import { appNetwork, appNetworkId } from "~/constants/environments";

export interface WalletStoreType {
    wallet: Wallet | null;
    address: string | null;
    stakeAddress: string | null;
    browserWallet: BrowserWallet | null;
    getBalance: () => Promise<number>;
    signTx: (message: string) => Promise<string>;
    submitTx: (signedTx: string) => Promise<string>;
    disconnect: () => Promise<void>;
    connectWallet: (wallet: Wallet) => Promise<void>;
}

export const useWallet = create<WalletStoreType>((set, get) => ({
    wallet: null,
    browserWallet: null,
    address: null,
    stakeAddress: null,
    getBalance: async () => {
        const { browserWallet } = get();
        if (!browserWallet) {
            return 0;
        }
        const balance = await browserWallet.getLovelace();
        return Number(balance);
    },
    signTx: async (unsignedTx: string) => {
        const { browserWallet, wallet } = get();
        if (!browserWallet || !wallet) {
            throw new Error("Wallet not connected");
        }
        const signedTx = await browserWallet.signTx(unsignedTx);
        if (!signedTx) {
            throw new Error("Failed to sign data");
        }
        return signedTx;
    },

    submitTx: async (signedTx: string) => {
        const { browserWallet } = get();
        if (!browserWallet) {
            throw new Error("Wallet not connected");
        }
        const txHash = await browserWallet.submitTx(signedTx);
        if (!txHash) {
            throw new Error("Failed to submit transaction");
        }
        return txHash;
    },
    /* eslint-disable @typescript-eslint/no-unused-vars */
    connectWallet: async (wallet: Wallet) => {
        try {
            console.log(wallet);
            const browserWallet: BrowserWallet = await BrowserWallet.enable(
                wallet.name.toLowerCase(),
            );
            const network = await browserWallet.getNetworkId();
            const address = await browserWallet.getChangeAddress();
            if (address.length === 0) {
                throw new Error("Cant get address");
            }
            const stakeList = await browserWallet.getRewardAddresses();
            if (stakeList.length === 0) {
                throw new Error("Cant get stake address");
            }
            document.cookie = `browserWallet=${browserWallet}; path=/; max-age=${
                60 * 60 * 24 * 7
            }; secure=${process.env.NODE_ENV === "production" ? "true" : "false"}; samesite=strict`;
            document.cookie = `wallet=${wallet}; path=/; max-age=${60 * 60 * 24 * 7}; secure=${
                process.env.NODE_ENV === "production" ? "true" : "false"
            }; samesite=strict`;
            const stakeAddress = stakeList[0];
            const signature = await browserWallet.signData(address);
            if (isNil(signature)) {
                throw new Error("Cant get signature");
            }
            set({
                browserWallet: browserWallet,
                wallet: wallet,
                address: address,
                stakeAddress: stakeAddress,
            });
        } catch (error) {
            console.log(error);
        }
    },

    disconnect: async () => {
        set({ browserWallet: null!, wallet: null! });
    },
}));
