import { Injectable } from '@nestjs/common';
import { BlockfrostService } from 'src/blockfrost/blockfrost.service';

@Injectable()
export class StatisticService {
    constructor(private blockfrostService: BlockfrostService) {}
    async getStatistics({ walletAddress }: { walletAddress: string }) {
        try {
            const { stake_address } =
                await this.blockfrostService.addresses(walletAddress);
            return stake_address;
        } catch (error) {
            throw new Error(error);
        }
    }
}
