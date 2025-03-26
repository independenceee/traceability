import { Injectable } from "@nestjs/common";
import { BlockfrostService } from "src/blockfrost/blockfrost.service";
import { KoiosService } from "src/koios/koios.service";
import { isNil } from "lodash";
import { MeshWallet, BlockfrostProvider, hexToString } from "@meshsdk/core";
import { ConfigService } from "@nestjs/config";
import { TraceAbilityContract } from "../../contract/scripts/txbuilder/traceability.txbuilder";
import { Asset } from "./interfaces/asset.interface";
import { convertToKeyValue } from "contract/scripts/utils";

@Injectable()
export class AssetsService {
    constructor(
        private koiosService: KoiosService,
        private configService: ConfigService,
        private blockfrostService: BlockfrostService,
    ) {}
    async getAssets({ page, pageSize, walletAddress }: { page: number; pageSize: number; walletAddress: string }) {
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
}
