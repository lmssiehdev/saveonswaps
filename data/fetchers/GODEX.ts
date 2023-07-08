import axios from "axios";
import { Params } from "./types";
import { getErrorMessage } from "@/utils/misc";
import { z } from "zod";

const resultSchema = z.object({
  amount: z.string(),
});

/**
 * @see https://api.godex.io/?javascript#coin-info
 */
async function godexFetcher({ from, to, amount }: Params) {
  try {
    const { data } = await axios.post(
      "https://api.godex.io/api/v1/info",
      {
        from: from.toUpperCase(),
        to: to.toUpperCase(),
        amount,
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    const { amount: resultAmount } = resultSchema.parse(data);

    return Number(resultAmount);
  } catch (e) {
    console.error(getErrorMessage(e));
    return undefined;
  }
}

export { godexFetcher as GODEX_FETCHER };
