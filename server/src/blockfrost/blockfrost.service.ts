import { BlockFrostAPI } from '@blockfrost/blockfrost-js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BlockfrostService extends BlockFrostAPI {
    constructor(config: ConfigService) {
        super({
            projectId: config.get(
                'BLOCKFROST_PROJECT_API_KEY_PREPROD',
            ) as string,
        });
    }
}
