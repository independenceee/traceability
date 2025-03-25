export interface Asset {
    asset: string;
    policy_id: string;
    asset_name: string;
    fingerprint: string;
    quantity: string;
    initial_mint_tx_hash: string;
    mint_or_burn_count: number;
    onchain_metadata: Record<string, string>;
    onchain_metadata_standard: Record<string, string>;
    onchain_metadata_extra: Record<string, string>;
    metadata: Record<string, string>;
}
