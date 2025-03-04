export type MenuOption = {
    title: string;
    href: string;
    icon: string;
    disabled: boolean;
};

export type WalletType = Wallet & {
    balance?: number;
    address?: string;
    downloadApi?: string;
    api?: () => Promise<void>;
    checkApi?: () => Promise<void>;
};
