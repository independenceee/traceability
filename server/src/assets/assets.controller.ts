import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { AssetsService } from './assets.service';

@Controller('assets')
export class AssetsController {
    constructor(private assetService: AssetsService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    getAssets(
        @Query('page') page: number = 1,
        @Query('page_size') pageSize: number = 12,
        @Query('wallet_address') walletAddress: string,
    ) {
        return this.assetService.getAssets({
            page: page,
            pageSize: pageSize,
            walletAddress: walletAddress,
        });
    }
}
