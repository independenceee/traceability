import type { Network } from "@meshsdk/core";

const BLOCKFROST_API_KEY = process.env.BLOCKFROST_API_KEY || "";
const KOIOS_TOKEN = process.env.KOIOS_TOKEN || "";

const appNetwork: Network =
    (process.env.NEXT_PUBLIC_APP_NETWORK?.toLowerCase() as Network) || "preprod";

const appNetworkId = appNetwork === "mainnet" ? 1 : 0;
const IPFS_ENDPOINT = process.env.IPFS_ENDPOINT || "";
const IPFS_GATEWAY = process.env.NEXT_PUBLIC_IPFS_GATEWAY || "https://ipfs.io/";
export const APP_WALLET_ADDRESS = process.env.APP_WALLET_ADDRESS || "";
export const EXCHANGE_FEE_PRICE = process.env.EXCHANGE_FEE_PRICE || "1000000"; //lovelace

export const MINT_REFERENCE_SCRIPT_HASH = process.env.MINT_REFERENCE_SCRIPT_HASH || "";
export const STORE_REFERENCE_SCRIPT_HASH = process.env.STORE_REFERENCE_SCRIPT_HASH || "";

export const title = {
    mint: "mint.mint.mint",
    store: "store.store.spend",
};

export { appNetwork, appNetworkId, BLOCKFROST_API_KEY, KOIOS_TOKEN, IPFS_ENDPOINT, IPFS_GATEWAY };
