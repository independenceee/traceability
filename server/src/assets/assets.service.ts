import { Injectable } from '@nestjs/common';
import { BlockfrostService } from 'src/blockfrost/blockfrost.service';
import { KoiosService } from 'src/koios/koios.service';
import { isNil } from 'lodash';
import { MeshWallet, BlockfrostProvider } from '@meshsdk/core';
import { ConfigService } from '@nestjs/config';
import { TraceAbilityContract } from '../../contract/scripts/txbuilder/traceability.txbuilder';
import { Asset } from './interfaces/asset.interface';

@Injectable()
export class AssetsService {
    constructor(
        private koiosService: KoiosService,
        private configService: ConfigService,
        private blockfrostService: BlockfrostService,
    ) {}
    async getAssets({
        page,
        pageSize,
        walletAddress,
    }: {
        page: number;
        pageSize: number;
        walletAddress: string;
    }) {
        if (isNil(walletAddress)) {
            throw new Error('walletAddress is Null');
        }
        const blockfrost = new BlockfrostProvider(
            this.configService.get(
                'BLOCKFROST_PROJECT_API_KEY_PREPROD',
            ) as string,
        );
        const wallet = new MeshWallet({
            networkId: 0,
            fetcher: blockfrost,
            submitter: blockfrost,
            key: {
                type: 'address',
                address: walletAddress,
            },
        });
        const traceabilityContract: TraceAbilityContract =
            new TraceAbilityContract({
                wallet: wallet,
            });
        console.log(traceabilityContract.storeAddress);
        const assetsAddress: Asset[] = await this.koiosService.getAssetsAddress(
            {
                walletAddress:
                    (traceabilityContract.storeAddress as string) ||
                    walletAddress,
            },
        );
        return assetsAddress;
    }
}
