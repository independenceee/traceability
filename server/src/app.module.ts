import { Module } from '@nestjs/common';
import { AssetsModule } from './assets/assets.module';
import { BlockfrostModule } from './blockfrost/blockfrost.module';
import { KoiosModule } from './koios/koios.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { StatisticModule } from './statistic/statistic.module';
import { ContractModule } from './contract/contract.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AssetsModule,
        BlockfrostModule,
        KoiosModule,
        PrismaModule,
        StatisticModule,
        ContractModule,
    ],
    providers: [],
})
export class AppModule {}
