import type { Params } from "./fetchers/types";
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
  tor?: string;
};

const CHANGE_NOW: WebsiteInfo = {
  name: "Change Now",
  image: "CHANGE_NOW.svg",
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
  image: "MAJESTIC_BANK.png",
  type: "INSTANT_EXCHANGE",
  // I should contact them
  acceptDynamicUrl: false,
  getEstimate: MAJESTIC_BANK_FETCHER,
  affiliateWebsite: "https://majesticbank.sc/?ref=R5qQvM",
  affiliateID: "R5qQvM",
  tor: "http://majestictfvnfjgo5hqvmuzynak4kjl5tjs3j5zdabawe6n2aaebldad.onion/",
  kyc: {
    rating: "A",
  },
};

const SIDE_SHIFT: WebsiteInfo = {
  name: "Side Shift",
  image: "SIDE_SHIFT.svg",
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
  image: "SWAPUZ.svg",
  getEstimate: SWAPUZ_FETCHER,
  type: "INSTANT_EXCHANGE",
  acceptDynamicUrl: false,
  affiliateWebsite: "dancing_cat_fix_me",
};

const X_CHANGE_ME: WebsiteInfo = {
  name: "X change",
  image: "X_CHANGE_ME.png",
  acceptDynamicUrl: true,
  getEstimate: X_CHANGE_ME_FETCHER,
  type: "INSTANT_EXCHANGE",
  generateDynamicUrl: ({ from, to, amount }: Params) =>
    `https://xchange.me/exchange/create?from_amount=${amount}&from_currency=${from.toLowerCase()}&to_currency=${to.toLowerCase()}`,
  // require PGP to get an affiliate ID
  affiliateWebsite: "https://xchange.me",
  affiliateID: "null",
  tor: "http://xmxmrjoqo63c5notr2ds2t3pdpsg4ysqqe6e6uu2pycecmjs4ekzpmyd.onion/",
  kyc: {
    rating: "A",
  },
};

const STEALTH_EX: WebsiteInfo = {
  name: "Stealth Ex",
  image: "STEALTH_EX.svg",
  getEstimate: STEALTH_EX_FETCHER,
  type: "INSTANT_EXCHANGE",
  acceptDynamicUrl: true,
  generateDynamicUrl: ({ from, to, amount }: Params) =>
    `https://stealthex.io/?from=${from}&to=${to}&amount=${amount}`,
  affiliateWebsite: "https://stealthex.io/?ref=dutdznrc55w",
  affiliateID: "dutdznrc55w",
};

const EXOLIX: WebsiteInfo = {
  name: "Exolix",
  image: "EXOLIX.svg",
  getEstimate: EXOLIX_FETCHER,
  type: "INSTANT_EXCHANGE",
  acceptDynamicUrl: true,
  // * affiliate id doesn't work with dynamic url, already email the company and waiting for a response.
  // generateDynamicUrl: ({ from, to, amount }: Params) =>
  //   `https://exolix.com/pairs/${from}to-${to}`,
  affiliateWebsite: "https://exolix.com?ref=EAE7E820C749C753EAE2F44707E7CD12",
  affiliateID: "EAE7E820C749C753EAE2F44707E7CD12",
};

const LETS_EXCHANGE: WebsiteInfo = {
  name: "Lets Exchange",
  image: "LETS_EXCHANGE.svg",
  getEstimate: LETS_EXCHANGE_FETCHER,
  type: "INSTANT_EXCHANGE",
  acceptDynamicUrl: true,
  generateDynamicUrl: ({ from, to, amount }: Params) =>
    `https://letsexchange.io/exchange/${from}-to-${to}`,
  affiliateWebsite: "https://letsexchange.io/?ref_id=eiIcQUFJWFMWdkZ4",
  affiliateID: "eiIcQUFJWFMWdkZ4",
};

const EXCH: WebsiteInfo = {
  name: "Exch",
  image: "EXCH.png",
  getEstimate: EXCH_FETCHER,
  type: "INSTANT_EXCHANGE",
  acceptDynamicUrl: true,
  generateDynamicUrl: ({ from, to, amount }: Params) =>
    `https://exch.cx/?from_currency=${from}&from_amount=${amount}&to_currency=${to}`,
  affiliateWebsite: "http://exch.cx/?ref=BD5a1a6C",
  affiliateID: "BD5a1a6C",
  tor: "http://hszyoqwrcp7cxlxnqmovp6vjvmnwj33g4wviuxqzq47emieaxjaperyd.onion/",
  kyc: {
    rating: "A",
  },
};

const FIXED_FLOAT: WebsiteInfo = {
  name: "Fixed Float",
  image: "FIXED_FLOAT.svg",
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
  image: "GODEX.svg",
  getEstimate: GODEX_FETCHER,
  type: "INSTANT_EXCHANGE",
  acceptDynamicUrl: true,
  // * affiliate id doesn't work with dynamic url, already email the company and waiting for a response.
  // generateDynamicUrl: ({ from, to, amount }: Params) =>
  //   `https://godex.io/exchange/?coin_from=${from}&coin_to=${to}&amoun
  //   t=${amount}`,
  affiliateWebsite: "https://godex.io/?aff_id=sxq7f20HT86trCSG",
  affiliateID: "sxq7f20HT86trCSG",
  //
};

const SIMPLE_SWAP: WebsiteInfo = {
  name: "Simple Swap",
  image: "SIMPLE_SWAP.svg",
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
