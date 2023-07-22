import { getErrorMessage } from "@/utils/misc";
import axios from "axios";
import crypto from "crypto";
import { Params } from "./types";
import { z } from "zod";

const resultSchema = z.object({
  data: z.object({
    to: z.object({
      amount: z.string(),
    }),
  }),
});

/**
 * @see https://fixedfloat.com/api
 */
async function fixedfloatFetcher({ from, to, amount }: Params) {
  const payload = {
    fromCcy: from.toUpperCase(),
    toCcy: to.toUpperCase(),
    amount,
    direction: "from",
    type: "fixed",
  };

  // Generate the signature
  const jsonPayload = JSON.stringify(payload);
  const signature = crypto
    .createHmac("sha256", import.meta.env.FIXEDFLOAT_API_SECRET!)
    .update(jsonPayload)
    .digest("hex");

  const headers = {
    Accept: "application/json",
    "X-API-KEY": import.meta.env.FIXEDFLOAT_API_KEY,
    "Content-Type": "application/json; charset=UTF-8",
    "X-API-SIGN": signature,
  };

  try {
    const { data } = await axios.post(
      "https://fixedfloat.com/api/v2/price",
      payload,
      { headers }
    );

    const result = resultSchema.parse(data);

    return Number(result.data.to.amount);
  } catch (e) {
    console.error(getErrorMessage(e));
    return undefined;
  }
}

export { fixedfloatFetcher as FIXED_FLOAT_FETCHER };
