import { getErrorMessage } from "@/utils/misc";
import axios from "axios";
import { z } from "zod";
import { Params } from "./types";

const resultSchema = z.string();

async function simpleswapFetcher({ from, to, amount }: Params) {
  const API_KEY = import.meta.env.SIMPLE_SWAP_API_KEY;
  try {
    if (!API_KEY) {
      throw new Error(" Please provide an api key ");
    }

    const { data } = await axios.get(
      "https://api.simpleswap.io/get_estimated",
      {
        params: {
          api_key: API_KEY,
          currency_from: from,
          currency_to: to,
          amount,
          fixed: true,
        },
      }
    );

    const result = resultSchema.parse(data);

    return Number(result);
  } catch (e) {
    console.error(getErrorMessage(e));
    return undefined;
  }
}

export { simpleswapFetcher as SIMPLE_SWAP_FETCHER };
