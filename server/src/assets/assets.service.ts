import { Injectable } from "@nestjs/common";
import { BlockfrostService } from "src/blockfrost/blockfrost.service";
import { KoiosService } from "src/koios/koios.service";
import { isNil } from "lodash";
import { MeshWallet, BlockfrostProvider, hexToString } from "@meshsdk/core";
import { ConfigService } from "@nestjs/config";
import { TraceAbilityContract } from "../../contract/scripts/txbuilder/traceability.txbuilder";
import { Asset } from "./interfaces/asset.interface";
import { convertToKeyValue, datumToJson, parseError } from "contract/scripts/utils";

@Injectable()
export class AssetsService {
    constructor(
        private koiosService: KoiosService,
        private configService: ConfigService,
        private blockfrostService: BlockfrostService,
    ) {}
    async getAssets({ page = 1, pageSize = 12, walletAddress }: { page: number; pageSize: number; walletAddress: string }) {
        if (isNil(walletAddress)) {
            throw new Error("walletAddress is Null");
        }
        const blockfrost = new BlockfrostProvider(this.configService.get("BLOCKFROST_PROJECT_API_KEY_PREPROD") as string);
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
        const assetsAddress: Asset[] = await this.koiosService.getAssetsAddress({
            walletAddress: (traceabilityContract.storeAddress as string) || walletAddress,
        });
        const filteredAssetsAddress = assetsAddress.filter((asset) => asset.policy_id === traceabilityContract.policyId);
        const filteredAssetsAddressQuery = filteredAssetsAddress.filter((asset) => {
            const assetNameString = hexToString(asset.asset_name);
            return assetNameString.toLowerCase().includes("".toLowerCase());
        });
        const total = filteredAssetsAddressQuery.length;
        const assetsSlice: Asset[] = filteredAssetsAddressQuery.slice((page - 1) * pageSize, page * pageSize);
        const assetList = assetsSlice.map((asset) => {
            return [asset.policy_id, asset.asset_name]; //replace("'000de140", "000643b0")
        });
        const data = await this.koiosService.getAssetsInfo({ assetList: assetList });
        const assets: Array<{
            asset: string;
            policy_id: string;
            asset_name: string;
            fingerprint: string;
            quantity: string;
            initial_mint_tx_hash: string;
            mint_or_burn_count: number;
            onchain_metadata: Record<string, string>;
            onchain_metadata_standard: Record<string, string>;
            onchain_metadata_extra: Record<string, string>;
            metadata: Record<string, string>;
        }> = data.map((asset: any) => {
            return {
                policy_id: asset.policy_id,
                asset_name: asset.asset_name,
                fingerprint: asset.fingerprint,
                quantity: asset.quantity,
                onchain_metadata: convertToKeyValue(asset.cip68_metadata?.["100"]?.fields[0].map),
                onchain: true,
            };
        });

        return {
            total_user_assets: filteredAssetsAddress.length,
            data: assets,
            total_item: total,
            total_page: Math.ceil(total / pageSize),
            page: page,
        };
    }

    async getAsset({ unit }: { unit: string }) {
        try {
            const assetDetails = await this.blockfrostService.assetsById(unit);
            const userAssetsDetails = await this.blockfrostService.assetsById(unit.replace("000643b0", "000de140"));
            if (isNil(assetDetails)) {
                throw new Error("Asset not found");
            }
            assetDetails.quantity = userAssetsDetails.quantity;
            const assetTxs = await this.blockfrostService.assetsHistory(unit);
            const transaction = await this.blockfrostService.txsUtxos(assetTxs[0].tx_hash);
            const assetOutput = transaction.outputs.find(function (output) {
                const asset = output.amount.find(function (amt) {
                    return amt.unit === unit;
                });
                return asset !== undefined;
            });
            const metadata = assetOutput?.inline_datum
                ? ((await datumToJson(assetOutput.inline_datum, {
                      contain_pk: true,
                  })) as Record<string, string>)
                : {};
            const assetTransactions = await this.blockfrostService.assetsHistory(unit);
            const data = {
                ...assetDetails,
                metadata: metadata,
                transaction_history: assetTransactions,
            };
            return {
                data,
                message: "Success",
            };
        } catch (error) {
            return {
                data: null,
                message: parseError(error),
            };
        }
    }

    async getAssetHistory({ unit, page = 1, pageSize = 12 }: { unit: string; page: number; pageSize: number }) {
        try {
            const assetTxs = await this.blockfrostService.assetsTransactions(unit);
            const total = assetTxs.length;
            const assetsSlice = assetTxs.slice((page - 1) * pageSize, page * pageSize);

            const assetHistories = await Promise.all(
                assetsSlice.map(async (assetTx) => {
                    const specialTransaction = await this.blockfrostService.txs(assetTx.tx_hash);
                    const assetTxUTxO = await this.blockfrostService.txsUtxos(assetTx.tx_hash);
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
                totalPage: Math.ceil(total / pageSize),
                currentPage: page,
            };
        } catch (e) {
            return {
                data: [],
                message: parseError(e),
            };
        }
    }
}
