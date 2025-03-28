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
      return await window.cardano.eternl?.isEnabled();
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
      return await window.cardano.lace?.isEnabled();
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
      return await window.cardano.nami?.isEnabled();
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
      return await window.cardano.flint?.isEnabled();
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
      return await window.cardano.gero?.isEnabled();
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
      return await window.cardano.typhon?.isEnabled();
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
      return await window.cardano.vespr?.isEnabled();
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
      return await window.cardano.yoroi?.isEnabled();
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
      return await window.cardano.nufi?.isEnabled();
    },
    downloadApi: "https://chromewebstore.google.com/detail/nufi/gpnihlnnodeiiaakbikldcihojploeca",
  },
];

export default wallets;
