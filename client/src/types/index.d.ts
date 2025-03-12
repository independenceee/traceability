import { StaticImageData } from "next/image";

export type MenuOption = {
    title: string;
    href: string;
    icon: string;
    disabled: boolean;
};

export type WalletType = {
    name: string;
    version?: string;
    image: StaticImageData;
    downloadApi?: string;
    api?: () => Promise<void>;
    checkApi?: (() => Promise<boolean>) | undefined;
};
