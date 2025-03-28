import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from "@nestjs/common";
import { ContractService } from "./contract.service";

@Controller("contract")
export class ContractController {
    constructor(private contractService: ContractService) {}

    @HttpCode(HttpStatus.OK)
    @Get("policy_id")
    getPolicyId(@Query("wallet_address") walletAddress: string) {
        return this.contractService.getPolicyId({ walletAddress: walletAddress });
    }
    @HttpCode(HttpStatus.OK)
    @Post("mint")
    createMint(
        @Body("wallet_address") walletAddress: string,
        @Body("assets")
        assets: Array<{
            asset_name: string;
            metadata?: Record<string, string>;
            quantity?: string;
            receiver?: string;
        }>,
    ) {
        return this.contractService.createMint({ walletAddress: walletAddress, assets: assets });
    }
    @HttpCode(HttpStatus.OK)
    @Post("update")
    createUpdate(
        @Body("wallet_address") walletAddress: string,
        @Body("assets")
        assets: Array<{
            asset_name: string;
            metadata?: Record<string, string>;
            quantity?: string;
            receiver?: string;
        }>,
    ) {
        return this.contractService.createUpdate({ walletAddress: walletAddress, assets: assets });
    }

    @HttpCode(HttpStatus.OK)
    @Post("burn")
    createBurn(
        @Body("wallet_address") walletAddress: string,
        @Body("assets")
        assets: Array<{
            asset_name: string;
            metadata?: Record<string, string>;
            quantity?: string;
            receiver?: string;
        }>,
    ) {
        return this.contractService.createBurn({ walletAddress: walletAddress, assets: assets });
    }
}
