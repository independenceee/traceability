import { assetName, BlockfrostProvider, deserializeAddress, MeshWallet } from "@meshsdk/core";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TraceAbilityContract } from "contract/scripts/txbuilder/traceability.txbuilder";
import { isEmpty, isNil, result } from "lodash";

@Injectable()
export class ContractService {
    constructor(private configService: ConfigService) {}
    async createMint({
        walletAddress,
        assets,
    }: {
        walletAddress: string;
        assets: Array<{
            asset_name: string;
            metadata?: Record<string, string>;
            quantity?: string;
            receiver?: string;
        }>;
    }) {
        try {
            if (isEmpty(assets)) {
                throw new Error("No assets to mint");
            }
            if (isNil(walletAddress)) {
                throw new Error("walletAddress is Null");
            }
            const blockfrost = new BlockfrostProvider(
                (this.configService.get("BLOCKFROST_PROJECT_API_KEY_PREPROD") as string) || "preprodKz0sm15W5bVxaQNCd3PjDU8ZXeN1iCGm",
            );
            const wallet = new MeshWallet({
                networkId: 0,
                fetcher: blockfrost,
                submitter: blockfrost,
                key: {
                    type: "address",
                    address: walletAddress,
                },
            });
            const traceabilityContract: TraceAbilityContract = new TraceAbilityContract({
                wallet: wallet,
            });
            const assetMints = await Promise.all(
                assets.map(async (mint) => ({
                    assetName: mint.asset_name,
                    quantity: mint.quantity ?? "1",
                    receiver: mint.receiver ?? walletAddress,
                    metadata: {
                        ...mint.metadata,
                        _pk: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
                    },
                })),
            );

            const unsignedTx = await traceabilityContract.mint(assetMints);
            return {
                result: true,
                data: unsignedTx,
                message: "Transaction created successfully",
            };
        } catch (error) {
            return {
                result: false,
                data: null,
                message: error,
            };
        }
    }
    async createUpdate({
        walletAddress,
        assets,
    }: {
        walletAddress: string;
        assets: Array<{
            asset_name: string;
            metadata?: Record<string, string>;
            quantity?: string;
            receiver?: string;
        }>;
    }) {
        try {
            if (isNil(walletAddress)) {
                throw new Error("walletAddress is Null");
            }
            const blockfrost = new BlockfrostProvider(
                (this.configService.get("BLOCKFROST_PROJECT_API_KEY_PREPROD") as string) || "preprodKz0sm15W5bVxaQNCd3PjDU8ZXeN1iCGm",
            );
            const wallet = new MeshWallet({
                networkId: 0,
                fetcher: blockfrost,
                submitter: blockfrost,
                key: {
                    type: "address",
                    address: walletAddress,
                },
            });
            const traceabilityContract: TraceAbilityContract = new TraceAbilityContract({
                wallet: wallet,
            });
            const assetUpdates = assets.map((asset) => ({
                assetName: asset.asset_name,
                metadata: {
                    ...asset.metadata,
                    _pk: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
                },
            }));

            const unsignedTx = await traceabilityContract.update(assetUpdates);
            return {
                result: true,
                data: unsignedTx,
                message: "Transaction created successfully",
            };
        } catch (error) {
            return {
                result: false,
                data: null,
                message: error,
            };
        }
    }

    async createBurn({
        walletAddress,
        assets,
    }: {
        walletAddress: string;
        assets: Array<{
            asset_name: string;
            metadata?: Record<string, string>;
            quantity?: string;
            receiver?: string;
        }>;
    }) {
        try {
            if (isNil(walletAddress)) {
                throw new Error("walletAddress is Null");
            }
            const blockfrost = new BlockfrostProvider(
                (this.configService.get("BLOCKFROST_PROJECT_API_KEY_PREPROD") as string) || "preprodKz0sm15W5bVxaQNCd3PjDU8ZXeN1iCGm",
            );
            const wallet = new MeshWallet({
                networkId: 0,
                fetcher: blockfrost,
                submitter: blockfrost,
                key: {
                    type: "address",
                    address: walletAddress,
                },
            });
            const traceabilityContract: TraceAbilityContract = new TraceAbilityContract({
                wallet: wallet,
            });
            const assetBurns = assets.map(function (asset) {
                return {
                    assetName: asset.asset_name,
                    quantity: asset.quantity ?? "-1",
                };
            });

            const unsignedTx = await traceabilityContract.burn(assetBurns);
            return {
                result: true,
                data: unsignedTx,
                message: "Transaction created successfully",
            };
        } catch (error) {
            return {
                result: false,
                data: null,
                message: error,
            };
        }
    }
}
