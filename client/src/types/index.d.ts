import { StaticImageData } from "next/image";
import { IconType } from "react-icons";

export type MenuOption = {
    title: string;
    href: string;
    icon: string | IconType;
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
