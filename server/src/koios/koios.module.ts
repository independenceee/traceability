import { Module } from "@nestjs/common";
import { KoiosService } from "./koios.service";
import { KoiosController } from "./koios.controller";

@Module({
    controllers: [KoiosController],
    providers: [KoiosService],
    exports: [KoiosService],
})
export class KoiosModule {}
