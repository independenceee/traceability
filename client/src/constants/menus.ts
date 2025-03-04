import { MenuOption } from "~/types";
import { routes } from "~/constants/routes";

export const headers: MenuOption[] = [
    {
        title: "Dashboard",
        href: routes.home.redirect,
        icon: "house",
        disabled: false,
    },
    {
        title: "Mint",
        href: routes.mint.redirect,
        icon: "imagePlus",
        disabled: false,
    },
    {
        title: "Utilities",
        href: routes.utilities.redirect,
        icon: "circuitBoard",
        disabled: false,
    },
    {
        title: "Documentation",
        href: routes.document.redirect,
        icon: "bookText",
        disabled: true,
    },
];

export const sidebar: MenuOption[] = [
    {
        title: "Dashboard",
        href: routes.home.redirect,
        icon: "house",
        disabled: false,
    },
    {
        title: "Mint",
        href: routes.mint.redirect,
        icon: "imagePlus",
        disabled: false,
    },
    {
        title: "Utilities",
        href: routes.utilities.redirect,
        icon: "circuitBoard",
        disabled: false,
    },
    {
        title: "Documentation",
        href: "",
        icon: "bookText",
        disabled: true,
    },
];

export const footer: MenuOption[] = [
    {
        title: "Website",
        href: "",
        icon: "globe",
        disabled: false,
    },
    {
        title: "Telegram",
        href: "",
        icon: "send",
        disabled: false,
    },
    {
        title: "Catalyst",
        href: "https://projectcatalyst.io/funds/12/cardano-use-cases-concept/open-source-dynamic-assets-tokennft-generator-cip68",
        icon: "catalyst",
        disabled: false,
    },
    {
        title: "Youtube",
        href: "",
        icon: "youtube",
        disabled: false,
    },
];
