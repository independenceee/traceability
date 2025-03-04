"use client";

import images from "~/public/images";
import { WalletType } from "~/types";

/* eslint-disable @typescript-eslint/no-explicit-any */

declare const window: any;

export const wallets: Record<string, WalletType> = {
    nami: {
        id: "nami",
        name: "Nami",
        version: "",
        icon: images.nami.src,
        api: async function () {
            return await window.cardano.nami.enable();
        },
        checkApi: async function () {
            return await window.cardano.nami;
        },
        downloadApi:
            "https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo",
    },
    eternl: {
        id: "eternl",
        name: "Eternl",
        icon: images.eternl.src,
        version: "",
        api: async function () {
            return window.cardano.eternl.enable();
        },
        checkApi: async function () {
            return await window.cardano.eternl;
        },
        downloadApi:
            "https://chrome.google.com/webstore/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka",
    },
    flint: {
        id: "flint",
        name: "Flint",
        version: "",
        icon: images.flint.src,
        api: async function () {
            return await window.cardano.flint.enable();
        },
        checkApi: async function () {
            return await window.cardano.flint;
        },
        downloadApi:
            "https://chrome.google.com/webstore/detail/flint-wallet/hnhobjmcibchnmglfbldbfabcgaknlkj",
    },
    lace: {
        id: "lace",
        name: "Lace",
        version: "",
        icon: images.lace.src,
        api: async function () {
            return await window.cardano.lace.enable();
        },
        checkApi: async function () {
            return await window.cardano.lace;
        },
        downloadApi:
            "https://chromewebstore.google.com/detail/lace/gafhhkghbfjjkeiendhlofajokpaflmk",
    },
    gero: {
        id: "gero",
        name: "Gero",
        version: "",
        icon: images.gero.src,
        api: async function () {
            return await window.cardano.gero.enable();
        },
        checkApi: async function () {
            return await window.cardano.gero;
        },
        downloadApi:
            "https://chrome.google.com/webstore/detail/gerowallet/bgpipimickeadkjlklgciifhnalhdjhe",
    },
    typhon: {
        id: "typhon",
        name: "Typhon",
        version: "",
        icon: images.typhon.src,
        api: async function () {
            return await window.cardano.typhon.enable();
        },
        checkApi: async function () {
            return await window.cardano.typhon;
        },
        downloadApi:
            "https://chrome.google.com/webstore/detail/typhon-wallet/kfdniefadaanbjodldohaedphafoffoh",
    },
    vespr: {
        id: "vespr",
        name: "Vespr",
        icon: images.vespr.src,
        version: "",
        api: async function () {
            return await window.cardano.vespr.enable();
        },
        checkApi: async function () {
            return await window.cardano.vespr;
        },
        downloadApi: "https://play.google.com/store/apps/details?id=art.nft_craze.gallery.main",
    },
    yoroi: {
        id: "yoroi",
        name: "Yoroi",
        version: "",
        icon: images.yoroi.src,
        api: async function () {
            return await window.cardano.yoroi.enable();
        },
        checkApi: async function () {
            return await window.cardano.yoroi;
        },
        downloadApi:
            "https://chromewebstore.google.com/detail/yoroi/ffnbelfdoeiohenkjibnmadjiehjhajb",
    },
    nufi: {
        id: "nufi",
        name: "Nufi",
        version: "",
        icon: images.nufi.src,
        api: async function () {
            return await window.cardano.nufi.enable();
        },
        checkApi: async function () {
            return await window.cardano.nufi;
        },
        downloadApi:
            "https://chromewebstore.google.com/detail/nufi/gpnihlnnodeiiaakbikldcihojploeca",
    },
};

export default wallets;
