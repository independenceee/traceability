"use client";

import { walletImage } from "@/public/images";
import { WalletType } from "@/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare const window: any;

export const wallets: WalletType[] = [
  {
    name: "Eternl",
    image: walletImage.eternl,
    version: "",
    api: async function () {
      return window.cardano.eternl.enable();
    },
    checkApi: async function () {
      if (typeof window !== "undefined" && window.cardano?.eternl) {
        return await window.cardano.eternl.isEnabled();
      }
      return false;
    },
    downloadApi: "https://chrome.google.com/webstore/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka",
  },
  {
    name: "Lace",
    version: "",
    image: walletImage.lace,
    api: async function () {
      return await window.cardano.lace.enable();
    },
    checkApi: async function () {
      if (typeof window !== "undefined" && window.cardano?.lace) {
        return await window.cardano.lace.isEnabled();
      }
      return false;
    },
    downloadApi: "https://chromewebstore.google.com/detail/lace/gafhhkghbfjjkeiendhlofajokpaflmk",
  },
  {
    name: "Nami",
    version: "",
    image: walletImage.nami,
    api: async function () {
      return await window.cardano.nami.enable();
    },
    checkApi: async function () {
      if (typeof window !== "undefined" && window.cardano?.nami) {
        return await window.cardano.nami.isEnabled();
      }
      return false;
    },
    downloadApi: "https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo",
  },
  {
    name: "Flint",
    version: "",
    image: walletImage.flint,
    api: async function () {
      return await window.cardano.flint.enable();
    },
    checkApi: async function () {
      if (typeof window !== "undefined" && window.cardano?.flint) {
        return await window.cardano.flint.isEnabled();
      }
      return false;
    },
    downloadApi: "https://chrome.google.com/webstore/detail/flint-wallet/hnhobjmcibchnmglfbldbfabcgaknlkj",
  },

  {
    name: "Gero",
    version: "",
    image: walletImage.gero,
    api: async function () {
      return await window.cardano.gero.enable();
    },
    checkApi: async function () {
      if (typeof window !== "undefined" && window.cardano?.gero) {
        return await window.cardano.gero.isEnabled();
      }
      return false;
    },
    downloadApi: "https://chrome.google.com/webstore/detail/gerowallet/bgpipimickeadkjlklgciifhnalhdjhe",
  },
  {
    name: "Typhon",
    version: "",
    image: walletImage.typhon,
    api: async function () {
      return await window.cardano.typhon.enable();
    },
    checkApi: async function () {
      if (typeof window !== "undefined" && window.cardano?.typhon) {
        return await window.cardano.typhon.isEnabled();
      }
      return false;
    },
    downloadApi: "https://chrome.google.com/webstore/detail/typhon-wallet/kfdniefadaanbjodldohaedphafoffoh",
  },
  {
    name: "Vespr",
    image: walletImage.vespr,
    version: "",
    api: async function () {
      return await window.cardano.vespr.enable();
    },
    checkApi: async function () {
      if (typeof window !== "undefined" && window.cardano?.vespr) {
        return await window.cardano.vespr.isEnabled();
      }
      return false;
    },
    downloadApi: "https://play.google.com/store/apps/details?id=art.nft_craze.gallery.main",
  },
  {
    name: "Yoroi",
    version: "",
    image: walletImage.yoroi,
    api: async function () {
      return await window.cardano.yoroi.enable();
    },
    checkApi: async function () {
      if (typeof window !== "undefined" && window.cardano?.yoroi) {
        return await window.cardano.yoroi.isEnabled();
      }
      return false;
    },
    downloadApi: "https://chromewebstore.google.com/detail/yoroi/ffnbelfdoeiohenkjibnmadjiehjhajb",
  },
  {
    name: "Nufi",
    version: "",
    image: walletImage.nufi,
    api: async function () {
      return await window.cardano.nufi.enable();
    },
    checkApi: async function () {
      if (typeof window !== "undefined" && window.cardano?.nufi) {
        return await window.cardano.nufi.isEnabled();
      }
      return false;
    },
    downloadApi: "https://chromewebstore.google.com/detail/nufi/gpnihlnnodeiiaakbikldcihojploeca",
  },
];

export default wallets;
