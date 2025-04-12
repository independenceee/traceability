import { NavItem } from "@/types";
import { routes } from "./routes";
import { IoIosGitNetwork } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { GrCatalogOption } from "react-icons/gr";
import { AiFillApi } from "react-icons/ai";
import { SiImprovmx } from "react-icons/si";
import { FaServicestack } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { PiWarehouseLight } from "react-icons/pi";
export const landingMenu: NavItem[] = [
  {
    title: "Dashboard",
    href: routes.home.redirect,
    icon: "house",
    disabled: false,
  },
  {
    title: "Products",
    href: routes.product.redirect,
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
    title: "Download",
    href: routes.download.redirect,
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
    title: "Products",
    href: routes.products.redirect,
    icon: AiFillProduct,
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
    title: "Suppliers",
    href: routes.suppliers.redirect,
    icon: SiImprovmx,
    disabled: false,
  },
  {
    title: "Warehouse",
    href: routes.warehouse.redirect,
    icon: PiWarehouseLight,
    disabled: false,
  },

  {
    title: "Services",
    href: routes.services.redirect,
    icon: FaServicestack,
    disabled: false,
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
