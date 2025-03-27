import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { BlockfrostService } from "./blockfrost.service";

@Controller("blockfrost")
export class BlockfrostController {
    constructor(private blockfrostService: BlockfrostService) {}

    @HttpCode(HttpStatus.OK)
    @Post()
    submitTx(@Body("signed_tx") signedTx) {
        return this.blockfrostService.submitTx({ signedTx: signedTx });
    }
}
