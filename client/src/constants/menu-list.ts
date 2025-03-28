import { NavItem } from "@/types";
import { routes } from "./routes";
import { IoIosGitNetwork } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { GrCatalogOption } from "react-icons/gr";
import { AiFillApi } from "react-icons/ai";

export const landingMenu: NavItem[] = [
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

export const mainMenu: NavItem[] = [
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

export const bottomItem: NavItem[] = [
  {
    title: "Website",
    href: "",
    icon: IoIosGitNetwork,
    disabled: false,
  },
  {
    title: "Telegram",
    href: "",
    icon: FaGithub,
    disabled: false,
  },
  {
    title: "Catalyst",
    href: "https://projectcatalyst.io/funds/12/cardano-use-cases-concept/open-source-dynamic-assets-tokennft-generator-cip68",
    icon: GrCatalogOption,
    disabled: false,
  },
  {
    title: "Youtube",
    href: "",
    icon: AiFillApi,
    disabled: false,
  },
];
