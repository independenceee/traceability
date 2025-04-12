import tien from "./founder/tien.jpg";
import hieu from "./founder/hieu.jpg";
import khanh from "./founder/khanh.jpg";
import son from "./founder/son.jpg";
import dung from "./founder/dung.jpg";
import thanh from "./founder/thanh.jpg";
import nami from "./wallet/nami.svg";
import flint from "./wallet/flint.svg";
import eternl from "./wallet/eternl.webp";
import typhon from "./wallet/typhon.svg";
import gero from "./wallet/gero.webp";
import vespr from "./wallet/vespr.png";
import lace from "./wallet/lace.png";
import yoroi from "./wallet/yoroi.png";
import nufi from "./wallet/nufi.png";
import faq from "./banner/faq.jpg";
import logo from "./common/logo.png";
import cardano from "./network/cardano.png";
import metadata from "./utilities/metadata.png";
import storegae from "./utilities/storage.png";
import collection from "./utilities/collection.png";
import fastCollection from "./utilities/fast-collection.png";
import api from "./utilities/api.png";
import marketplace from "./utilities/marketplace.png";
import mintOne from "./utilities/mint-one.png";
import mintMany from "./utilities/mint-many.png";
import login from "./common/login.png";
import startFromCratch from "./utilities/start-from-scratch.png";
import mainnet from "./network/mainnet.png";
import preprod from "./network/preprod.png";
import preview from "./network/preview.png";
import about from "./common/about.jpg";
import feedback from "./common/feedback.png";
import process from "./common/process.png";
import document from "./common/document.png";
import warehouse from "./common/warehouse.png";
import certification from "./common/certification.png";
import ggplay from "./common/ggplay.png";
import appstore from "./common/appstore.png";
export const founderImage = {
  son: son,
  tien: tien,
  hieu: hieu,
  khanh: khanh,
  dung: dung,
  thanh: thanh,
} as const;

export const appImage = {
  logo: logo,
  login: login,
  cardano: cardano,
  metadata: metadata,
  storegae: storegae,
  collection: collection,
  marketplace: marketplace,
  mintOne: mintOne,
  mintMany: mintMany,
  startFromCratch: startFromCratch,
  fastCollection: fastCollection,
  api: api,
  about: about,
  ggplay: ggplay,
  appstore: appstore,
  feedback: feedback,
  process: process,
  certification: certification,
  document: document,
  warehouse: warehouse,
} as const;

export const walletImage = {
  nami: nami,
  eternl: eternl,
  gero: gero,
  typhon: typhon,
  flint: flint,
  vespr: vespr,
  lace: lace,
  nufi: nufi,
  yoroi: yoroi,
} as const;

export const bannerImage = {
  faq: faq,
} as const;

export const networkImage = {
  mainnet: mainnet,
  preprod: preprod,
  preview: preview,
} as const;
