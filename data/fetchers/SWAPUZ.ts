import { getErrorMessage } from "@/utils/misc";
import axios from "axios";
import { z } from "zod";
import { Params } from "./types";

const resultSchema = z.object({
  result: z.object({
    result: z.number(),
  }),
});

/**
 *
 * @see https://partner.swapuz.com/api-docs
 */
async function swapuzFetcher({ from, to, amount }: Params) {
  try {
    const { data } = await axios.get(
      `https://api.swapuz.com/api/home/v1/rate/`,
      {
        params: {
          from: from.toUpperCase(),
          to: to.toUpperCase(),
          amount: amount,
        },
      }
    );

    const {
      result: { result },
    } = resultSchema.parse(data);

    return result;
  } catch (e) {
    console.error(getErrorMessage(e));
    return undefined;
  }
}

export { swapuzFetcher as SWAPUZ_FETCHER };
