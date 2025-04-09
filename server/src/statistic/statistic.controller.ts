import { Controller, Get, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { StatisticService } from "./statistic.service";

@Controller("statistic")
export class StatisticController {
    constructor(private statisticService: StatisticService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    getStatistics(@Query("wallet_address") walletAddress) {
        return this.statisticService.getStatistics({
            walletAddress: walletAddress,
        });
    }
}
