import { Controller, Get, HttpCode, HttpStatus, Param, Query } from "@nestjs/common";
import { AssetsService } from "./assets.service";

@Controller("assets")
export class AssetsController {
    constructor(private assetService: AssetsService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    getAssets(@Query("page") page: number = 1, @Query("page_size") pageSize: number = 12, @Query("wallet_address") walletAddress: string) {
        return this.assetService.getAssets({
            page: page,
            pageSize: pageSize,
            walletAddress: walletAddress,
        });
    }

    @HttpCode(HttpStatus.OK)
    @Get(":unit")
    getAsset(@Param("unit") unit: string) {
        return this.assetService.getAsset({
            unit: unit,
        });
    }

    @HttpCode(HttpStatus.OK)
    @Get("history/:unit")
    getAssetHistory(@Param("unit") unit: string, @Query("page") page: number = 1, @Query("page_size") pageSize: number = 12) {
        return this.assetService.getAssetHistory({
            unit: unit,
            page: page,
            pageSize: pageSize,
        });
    }
}
