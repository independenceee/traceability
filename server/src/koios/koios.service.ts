import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios, { AxiosInstance, AxiosError } from "axios";

@Injectable()
export class KoiosService {
    private readonly api: AxiosInstance;

    constructor(config: ConfigService) {
        this.api = axios.create({
            baseURL: config.get("KOIOS_RPC_URL_PREPROD"),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyIjoic3Rha2UxdTh6bWh3cDNuemgwd3QzemozeHVnNWFhMzh2bGF0N3UyaDYzeno4ZjA2ZnRlbGM1dmVjNDgiLCJleHAiOjE3NTgxOTY3MDksInRpZXIiOjEsInByb2pJRCI6IjEyMyJ9.Ks7TmsHQiWV-siGet-oCIwiqApyF5jzl6-qqZR9scGM`,
            },
            // Optionally disable auto-parsing globally
            transformResponse: (data) => data,
        });
    }

    async getAssetsAddress({ walletAddress }: { walletAddress: string }) {
        try {
            const response = await this.api.post("/address_assets", {
                _addresses: [walletAddress],
            });
            const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
            return data;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error("Koios API error:", {
                message: axiosError.message,
                code: axiosError.code,
                config: axiosError.config,
                response: axiosError.response
                    ? {
                          status: axiosError.response.status,
                          data: axiosError.response.data,
                          headers: axiosError.response.headers,
                      }
                    : "No response received",
            });
            throw axiosError;
        }
    }

    async getAssetsInfo({ assetList }: { assetList: string[][] }) {
        try {
            const response = await this.api.post("/asset_info", {
                _asset_list: assetList,
            });

            const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
            return data;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error("Koios API error:", {
                message: axiosError.message,
                code: axiosError.code,
                config: axiosError.config,
                response: axiosError.response
                    ? {
                          status: axiosError.response.status,
                          data: axiosError.response.data,
                          headers: axiosError.response.headers,
                      }
                    : "No response received",
            });
            throw axiosError;
        }
    }
}
