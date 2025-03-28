import { Network } from "@meshsdk/core";

const BLOCKFROST_API_KEY = process.env.BLOCKFROST_API_KEY || "";
const KOIOS_TOKEN = process.env.KOIOS_TOKEN || "";

const appNetwork: Network = (process.env.NEXT_PUBLIC_APP_NETWORK?.toLowerCase() as Network) || "preprod";

const appUrl: { [key: string]: string } = {
  mainnet: process.env.NEXT_PUBLIC_APP_URL_MAINNET || "https://cip68.cardano2vn.io",
  preview: process.env.NEXT_PUBLIC_APP_URL_PREVIEW || "https://cip68-preview.cardano2vn.io",
};

const appNetworkId = appNetwork === "mainnet" ? 1 : 0;
const IPFS_ENDPOINT = process.env.IPFS_ENDPOINT || "";
const IPFS_GATEWAY = process.env.NEXT_PUBLIC_IPFS_GATEWAY || "https://ipfs.io/";

export { appNetwork, appUrl, appNetworkId, BLOCKFROST_API_KEY, KOIOS_TOKEN, IPFS_ENDPOINT, IPFS_GATEWAY };
