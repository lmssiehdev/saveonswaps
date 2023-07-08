import { getErrorMessage } from "@/utils/misc";
import axios from "axios";
import { Params } from "./types";
import { z } from "zod";

const resultSchema = z.object({
  estimate: z.number(),
});

/**
 *
 * @see https://api.xchange.me/
 */
async function xChangeFetcher({ from, to, amount }: Params) {
  try {
    const { data } = await axios.get("https://xchange.me/api/v1/ /estimate", {
      params: {
        amount,
        from_currency: from,
        to_currency: to,
      },
    });

    const { estimate } = resultSchema.parse(data);

    return estimate;
  } catch (e) {
    console.error(getErrorMessage(e));
    return undefined;
  }
}

export { xChangeFetcher as X_CHANGE_ME_FETCHER };
