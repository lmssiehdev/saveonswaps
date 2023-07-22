import { getErrorMessage } from "@/utils/misc";
import axios from "axios";
import { z } from "zod";
import type { Params } from "./types";

const resultSchema = z.object({
  estimated_amount: z.string(),
});

/**
 * @see https://documenter.getpostman.com/view/11320959/T17J8mzw?version=latest
 */
async function stealthExFetcher({ from, to, amount }: Params) {
  const API_KEY = import.meta.env.STEALTHEX_API_KEY;

  try {
    if (!API_KEY) {
      throw new Error(" Please provide an api key ");
    }

    const { data } = await axios.get(
      `https://api.stealthex.io/api/v2/estimate/${from}/${to}`,
      {
        params: {
          amount,
          api_key: API_KEY,
          fixed: true,
        },
      }
    );

    const { estimated_amount } = resultSchema.parse(data);

    return Number(estimated_amount);
  } catch (e) {
    console.error(getErrorMessage(e));
    return;
  }
}

export { stealthExFetcher as STEALTH_EX_FETCHER };
