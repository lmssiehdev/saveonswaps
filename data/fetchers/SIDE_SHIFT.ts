import { getErrorMessage } from "@/utils/misc";
import axios from "axios";
import { z } from "zod";
import { Params } from "./types";

const resultSchema = z.object({
  settleAmount: z.string(),
});

/**
 *
 * @see https://documenter.getpostman.com/view/6895769/TWDZGvjd#3690a344-ec75-4a1c-9ec5-6dfded355637
 */
async function sideShiftFetcher({ from, to, amount }: Params) {
  try {
    var payload = JSON.stringify({
      depositCoin: from,
      settleCoin: to,
      depositAmount: amount,
    });

    const { data } = await axios.post(
      "https://sideshift.ai/api/v2/quotes",
      payload,
      {
        headers: {
          "x-sideshift-secret": process.env.SIDESHIFT_API_KEY,
          "x-user-ip": "1.2.3.4",
          "Content-Type": "application/json",
        },
      }
    );

    const { settleAmount } = resultSchema.parse(data);

    return Number(settleAmount);
  } catch (e) {
    console.error(getErrorMessage(e));
    return undefined;
  }
}

export { sideShiftFetcher as SIDE_SHIFT_FETCHER };
