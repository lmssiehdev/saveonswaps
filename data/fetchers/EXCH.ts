import { getErrorMessage } from "@/utils/misc";
import axios from "axios";
import { Params } from "./types";
import { z } from "zod";

const returnSchema = z.object({
  rate: z.string(),
});

/**
 *
 * @see https://exch.cx/api
 */
async function exchFetcher({ from, to, amount }: Params) {
  try {
    const { data } = await axios.get("https://exch.cx/api/rates", {
      params: {
        rate_mode: "flat",
      },
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    const pair = `${from}_${to}`.toUpperCase();
    const { rate } = returnSchema.parse(data[pair]);

    return Number(rate) * Number(amount);
  } catch (e) {
    console.error(getErrorMessage(e));
    return undefined;
  }
}

export { exchFetcher as EXCH_FETCHER };
