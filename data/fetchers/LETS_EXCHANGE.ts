import axios from "axios";
import { Params } from "./types";
import { getErrorMessage } from "@/utils/misc";
import { z } from "zod";

const returnSchema = z.object({
  amount: z.string(),
});

/**
 * @see https://api.letsexchange.io/doc
 */
async function letsexchangeFetcher({ from, to, amount }: Params) {
  const API_KEY = process.env.LETSEXCHANGE_API_KEY;

  try {
    if (!API_KEY) {
      throw new Error(" Please provide an api key ");
    }
    const { data } = await axios.post(
      "https://api.letsexchange.io/api/v1/info",
      {
        from,
        to,
        amount,
        float: false,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const result = returnSchema.parse(data);

    return Number(result.amount);
  } catch (e) {
    console.error(getErrorMessage(e));
    return undefined;
  }
}

export { letsexchangeFetcher as LETS_EXCHANGE_FETCHER };
