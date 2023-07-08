import axios from "axios";
import { Params } from "./types";
import { getErrorMessage } from "@/utils/misc";
import { z } from "zod";

const returnSchema = z.object({
  receive_amount: z.string(),
});

async function majesticBankFetcher({ from, to, amount }: Params) {
  try {
    const { data } = await axios.get(
      "https://majesticbank.at/api/v1/calculate",
      {
        params: {
          from_amount: amount,
          from_currency: from,
          receive_currency: to,
        },
      }
    );

    const { receive_amount } = returnSchema.parse(data);

    return Number(receive_amount);
  } catch (e) {
    console.error(getErrorMessage(e));
    return undefined;
  }
}

export { majesticBankFetcher as MAJESTIC_BANK_FETCHER };
