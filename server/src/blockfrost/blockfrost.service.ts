import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { parseError } from "contract/scripts/utils";

@Injectable()
export class BlockfrostService extends BlockFrostAPI {
    constructor(config: ConfigService) {
        super({
            projectId: config.get("BLOCKFROST_PROJECT_API_KEY_PREPROD") as string,
        });
    }

    async submitTx({ signedTx }: { signedTx: string }) {
        try {
            const txHash = await this.txSubmit(signedTx);
            return {
                data: txHash,
                result: true,
                message: "Transaction submitted successfully",
            };
        } catch (error) {
            return {
                data: null,
                result: false,
                message: parseError(error),
            };
        }
    }
}
