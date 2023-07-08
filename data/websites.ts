import { Params } from "./fetchers/types";
import { SIMPLE_SWAP_FETCHER } from "./fetchers/SIMPLE_SWAP";
import { SIDE_SHIFT_FETCHER } from "./fetchers/SIDE_SHIFT";
import { GODEX_FETCHER } from "./fetchers/GODEX";
import { EXCH_FETCHER } from "./fetchers/EXCH";
import { EXOLIX_FETCHER } from "./fetchers/EXOLIX";
import { X_CHANGE_ME_FETCHER } from "./fetchers/X_CHANGE_ME";
import { CHANGE_NOW_FETCHER } from "./fetchers/CHANGE_NOW";
import { MAJESTIC_BANK_FETCHER } from "./fetchers/MAJESTIC_BANK";
import { STEALTH_EX_FETCHER } from "./fetchers/STEALTH_EX";
import { SWAPUZ_FETCHER } from "./fetchers/SWAPUZ";
import { FIXED_FLOAT_FETCHER } from "./fetchers/FIXED_FLOAT";
import { LETS_EXCHANGE_FETCHER } from "./fetchers/LETS_EXCHANGE";

const fetchers = {
  SIMPLE_SWAP_FETCHER,
  SIDE_SHIFT_FETCHER,
  GODEX_FETCHER,
  EXCH_FETCHER,
  EXOLIX_FETCHER,
  X_CHANGE_ME_FETCHER,
  CHANGE_NOW_FETCHER,
  MAJESTIC_BANK_FETCHER,
  STEALTH_EX_FETCHER,
  SWAPUZ_FETCHER,
  FIXED_FLOAT_FETCHER,
  LETS_EXCHANGE_FETCHER,
};

type KYC_RATING = "A" | "B" | "C" | "D";
type EXCHANGE_TYPE = "INSTANT_EXCHANGE" | "P2P_EXCHANGE";

type WebsiteInfo = {
  name?: string;
  image?: string;
  acceptDynamicUrl: boolean;
  generateDynamicUrl?: ({ from, to, amount }: Params) => string;
  affiliateID?: string;
  affiliateWebsite: string;
  type: EXCHANGE_TYPE;
  kyc?: {
    rating: KYC_RATING;
  };
  getEstimate: ({ from, to, amount }: Params) => Promise<number | undefined>;
};

const CHANGE_NOW: WebsiteInfo = {
  name: "Change Now",
  image: "",
  getEstimate: CHANGE_NOW_FETCHER,
  type: "INSTANT_EXCHANGE",
  acceptDynamicUrl: true,
  generateDynamicUrl: ({ from, to, amount }: Params) =>
    `https://changenow.io/?from=${from}&to=${to}&amount=${amount}`,
  affiliateID: "b3f140d17a9a29",
  affiliateWebsite:
    "https://changenow.app.link/referral?link_id=b3f140d17a9a29&amount=0.23&to=etharb",
};

const MAJESTIC_BANK: WebsiteInfo = {
  name: "Majestic Bank",
  image: "",
  type: "INSTANT_EXCHANGE",
  // I should contact them
  acceptDynamicUrl: false,
  getEstimate: MAJESTIC_BANK_FETCHER,
  affiliateWebsite: "dancing_cat_fix_me",
};

const SIDE_SHIFT: WebsiteInfo = {
  name: "Side Shift",
  image: "",
  getEstimate: SIDE_SHIFT_FETCHER,
  type: "INSTANT_EXCHANGE",
  acceptDynamicUrl: true,
  generateDynamicUrl: ({ from, to, amount }: Params) =>
    `https://sideshift.ai/${from}/${to}`,
  affiliateID: "hxGyGDGdyI",
  affiliateWebsite: "https://sideshift.ai/a/hxGyGDGdyI",
};

const SWAPUZ: WebsiteInfo = {
  name: "Swapuz",
  image: "",
  getEstimate: SWAPUZ_FETCHER,
  type: "INSTANT_EXCHANGE",
  acceptDynamicUrl: false,
  affiliateWebsite: "dancing_cat_fix_me",
};

const X_CHANGE_ME: WebsiteInfo = {
  name: "X change",
  acceptDynamicUrl: true,
  getEstimate: X_CHANGE_ME_FETCHER,
  type: "INSTANT_EXCHANGE",
  generateDynamicUrl: ({ from, to, amount }: Params) =>
    `https://xchange.me/exchange/create?from_amount=${amount}&from_currency=${from.toLowerCase()}&to_currency=${to.toLowerCase()}`,
  affiliateWebsite: "dancing_cat_fix_me",
};

const STEALTH_EX: WebsiteInfo = {
  name: "Stealth Ex",
  image: "",
  getEstimate: STEALTH_EX_FETCHER,
  type: "INSTANT_EXCHANGE",
  acceptDynamicUrl: true,
  generateDynamicUrl: ({ from, to, amount }: Params) =>
    `https://stealthex.io/?from=${from}&to=${to}&amount=${amount}`,
  affiliateWebsite: "dancing_cat_fix_me",
};

const EXOLIX: WebsiteInfo = {
  name: "Exolix",
  image: "",
  getEstimate: EXOLIX_FETCHER,
  type: "INSTANT_EXCHANGE",
  acceptDynamicUrl: true,
  generateDynamicUrl: ({ from, to, amount }: Params) =>
    `https://exolix.com/pairs/${from}to-${to}`,
  affiliateWebsite: "dancing_cat_fix_me",
};

const LETS_EXCHANGE: WebsiteInfo = {
  name: "Lets Exchange",
  image: "",
  getEstimate: LETS_EXCHANGE_FETCHER,
  type: "INSTANT_EXCHANGE",
  acceptDynamicUrl: true,
  generateDynamicUrl: ({ from, to, amount }: Params) =>
    `https://letsexchange.io/exchange/${from}-to-${to}`,
  affiliateWebsite: "dancing_cat_fix_me",
};

const EXCH: WebsiteInfo = {
  name: "Exch",
  image: "",
  getEstimate: EXCH_FETCHER,
  type: "INSTANT_EXCHANGE",
  acceptDynamicUrl: true,
  generateDynamicUrl: ({ from, to, amount }: Params) =>
    `https://exch.cx/?from_currency=${from}&from_amount=${amount}&to_currency=${to}`,
  affiliateWebsite: "dancing_cat_fix_me",
};

const FIXED_FLOAT: WebsiteInfo = {
  name: "Fixed Float",
  image: "",
  getEstimate: FIXED_FLOAT_FETCHER,
  type: "INSTANT_EXCHANGE",
  acceptDynamicUrl: true,
  generateDynamicUrl: ({ from, to, amount }: Params) =>
    ` https://fixedfloat.com/exchange/${from}-to-${to}`,

  affiliateID: "ecdk5n8b",
  affiliateWebsite: "https://fixedfloat.com/?ref=ecdk5n8b",
};

const GODEX: WebsiteInfo = {
  name: "Godex",
  image: "",
  getEstimate: GODEX_FETCHER,
  type: "INSTANT_EXCHANGE",
  acceptDynamicUrl: true,
  generateDynamicUrl: ({ from, to, amount }: Params) =>
    `https://godex.io/exchange/?coin_from=${from}&coin_to=${to}&amoun
    t=${amount}`,
  affiliateWebsite: "dancing_cat_fix_me",

  //
};

const SIMPLE_SWAP: WebsiteInfo = {
  name: "Simple Swap",
  image: "",
  getEstimate: SIMPLE_SWAP_FETCHER,
  type: "INSTANT_EXCHANGE",
  acceptDynamicUrl: true,
  generateDynamicUrl: ({ from, to, amount }: Params) =>
    `https://simpleswap.io/crypto-to-crypto/${from}-${to}`,
  affiliateID: "fa4ad33152b6",
  affiliateWebsite: "https://simpleswap.io/?ref=fa4ad33152b6",
};

export const websiteData: {
  [key: string]: WebsiteInfo;
} = {
  CHANGE_NOW,
  SIDE_SHIFT,
  MAJESTIC_BANK,
  SWAPUZ,
  X_CHANGE_ME,
  EXOLIX,
  LETS_EXCHANGE,
  STEALTH_EX,
  SIMPLE_SWAP,
  GODEX,
  FIXED_FLOAT,
  EXCH,
};

export type Website = keyof typeof websiteData;
