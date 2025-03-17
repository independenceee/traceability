import { create } from "zustand";
import { BrowserWallet, Wallet } from "@meshsdk/core";
import { Session } from "next-auth";
import { isNil } from "lodash";
import { signIn, signOut } from "next-auth/react";
import { appNetwork, appNetworkId } from "~/constants/environments";

export interface WalletStoreType {
    wallet: Wallet | null;
    address: string | null;
    stakeAddress: string | null;
    browserWallet: BrowserWallet | null;
    getBalance: () => Promise<number>;
    signTx: (message: string) => Promise<string>;
    submitTx: (signedTx: string) => Promise<string>;
    disconnect: () => Promise<void>;
    signIn: (session: Session | null, wallet: Wallet) => Promise<void>;
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

    signIn: async (session: Session | null, wallet: Wallet) => {},

    disconnect: async () => {
        set({ browserWallet: null!, wallet: null! });
    },
}));
