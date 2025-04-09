import { Module } from "@nestjs/common";
import { BlockfrostController } from "./blockfrost.controller";
import { BlockfrostService } from "./blockfrost.service";

@Module({
    controllers: [BlockfrostController],
    providers: [BlockfrostService],
    exports: [BlockfrostService],
})
export class BlockfrostModule {}
