import { Module } from "@nestjs/common";
import { AssetsService } from "./assets.service";
import { AssetsController } from "./assets.controller";
import { BlockfrostService } from "src/blockfrost/blockfrost.service";
import { KoiosService } from "src/koios/koios.service";

@Module({
    providers: [AssetsService, BlockfrostService, KoiosService],
    controllers: [AssetsController],
})
export class AssetsModule {}
