"use client";

import { isNil } from "lodash";
import { PropsWithChildren, useEffect, useState } from "react";
import { useWallet, WalletStoreType } from "~/hooks/use-wallet";
import { BrowserWallet, MeshWallet, Wallet } from "@meshsdk/core";

function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(";").shift() || null;
    }
    return null;
}

export default function BlockchainProvider({ children }: PropsWithChildren) {
    const { connectWallet, wallet, browserWallet, address }: WalletStoreType =
        useWallet();

    useEffect(() => {
        (async () => {
            if (isNil(wallet)) {
                const browserWallet = getCookie("browserWallet") as unknown as
                    | BrowserWallet
                    | MeshWallet;

                // connectWallet(wallet, "interln");
            }
        })();
    }, [ wallet, browserWallet, address]);

    return children;
}
