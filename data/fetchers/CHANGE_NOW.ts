import { getErrorMessage } from "@/utils/misc";
import type { Params } from "./types";
import axios from "axios";
import { z } from "zod";

const resultSchema = z.object({
  estimatedAmount: z.number(),
});

/** 
  @see https://documenter.getpostman.com/view/8180765/SVfTPnM8#ef213b82-c9ff-497a-baac-587deda872a1
*/
async function changeNowFetcher({ from, to, amount }: Params) {
  const API_KEY = process.env.CHANGENOW_API_KEY;

  try {
    if (!API_KEY) {
      throw new Error(" Please provide an api key ");
    }

    const { data } = await axios.get(
      `https://api.changenow.io/v1/exchange-amount/fixed-rate/${amount}/${from}_${to}`,
      {
        params: {
          api_key: API_KEY,
        },
      }
    );

    const { estimatedAmount } = resultSchema.parse(data);

    return estimatedAmount;
  } catch (e) {
    console.error(getErrorMessage(e));
    return undefined;
  }
}

export { changeNowFetcher as CHANGE_NOW_FETCHER };
