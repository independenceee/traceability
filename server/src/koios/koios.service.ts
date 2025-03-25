import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Axios } from 'axios';

@Injectable()
export class KoiosService extends Axios {
    constructor(config: ConfigService) {
        super({
            baseURL: config.get('KOIOS_RPC_URL_PREPROD'),
        });
    }

    async getAssetsAddress({ walletAddress }: { walletAddress: string }) {
        console.log(walletAddress)
        try {
            const { data, status } = await this.post('/address_assets', {
                _addresses: [walletAddress],
            });
            console.log(data)
            if (status === 200) return data;
        } catch (error) {
            throw new Error(error);
        }
    }

}
