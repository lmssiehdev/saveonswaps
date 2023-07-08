import { getErrorMessage, getFromMap } from "@/utils/misc";
import { formatPrice, getPrice } from "@/utils/price";
import { exchangeDisplayInfoSchema, paramsSchema } from "@/utils/schemas";
import type { z } from "zod";
import { websiteData } from "../../data/websites";

// const fetchers = {
//   SIMPLE_SWAP_FETCHER,
//   SIDE_SHIFT_FETCHER,
//   GODEX_FETCHER,
//   EXCH_FETCHER,
//   EXOLIX_FETCHER,
//   X_CHANGE_ME_FETCHER,
//   CHANGE_NOW_FETCHER,
//   MAJESTIC_BANK_FETCHER,
//   STEALTH_EX_FETCHER,
//   SWAPUZ_FETCHER,
//   FIXED_FLOAT_FETCHER,
//   LETS_EXCHANGE_FETCHER,
// };
const mock = {
  from: "btc",
  to: "xmr",
  amount: 0.1,
};

const schema = exchangeDisplayInfoSchema;

export function sortByKey(array: any[], key: string) {
  return array.sort(function (a, b) {
    const x = a[key];
    const y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

export async function GET(req: Request) {
  try {
    // const { searchParams } = new URL(req.url);

    // const paramsResult = paramsSchema.parse(getFromMap(searchParams));

    const { from, to, amount } = mock;

    // const params = {
    //   to: paramsResult.to,
    //   from: paramsResult.from,
    //   amount Number(paramsResult.amount),
    // };:

    const formatResponse = (r, v) =>
      ({
        provider: v.name,
        estimate: r,
        usdEstimate: formatPrice(r!, price),
        url: v.affiliateWebsite,
        type: v.type,
      } as z.infer<typeof exchangeDisplayInfoSchema>);

    // @ts-ignore
    const price = await getPrice(to);

    const r = await Promise.allSettled(
      Object.values(websiteData).map((v) =>
        v.getEstimate(mock).then((r) => r && formatResponse(r, v))
      )
    );

    // @ts-ignorex
    const rValue = r.map((r) => r.value).filter(Boolean);
    const sortedValue = sortByKey(rValue, "estimate").reverse();

    sortedValue[0].bestValue = true;

    return {
      from,
      to,
      fees: sortedValue,
    };
  } catch (e) {
    console.log(e);
    return new Response("failed", {
      status: 500,
      statusText: getErrorMessage(e),
    });
  }
}
