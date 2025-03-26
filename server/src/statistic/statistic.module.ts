import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { KoiosService } from 'src/koios/koios.service';
import { StatisticController } from './statistic.controller';
import { BlockfrostService } from 'src/blockfrost/blockfrost.service';

@Module({
    providers: [StatisticService, KoiosService, BlockfrostService],
    controllers: [StatisticController],
})
export class StatisticModule {}
