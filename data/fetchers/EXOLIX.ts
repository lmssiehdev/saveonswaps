import { getErrorMessage } from "@/utils/misc";
import axios from "axios";
import { z } from "zod";
import { Params } from "./types";

const resultSchema = z.object({
  toAmount: z.number(),
});

/**
 *
 * @see https://exolix.com/developers
 */
async function exolixFetcher({ from, to, amount }: Params) {
  try {
    const { data } = await axios.get("https://exolix.com/api/v2/rate", {
      params: {
        coinFrom: from,
        coinTo: to,
        amount: amount.toString(),
        rateType: "fixed",
      },
    });

    const { toAmount } = resultSchema.parse(data);
    return toAmount;
  } catch (e) {
    console.error(getErrorMessage(e));
    return undefined;
  }
}

export { exolixFetcher as EXOLIX_FETCHER };
