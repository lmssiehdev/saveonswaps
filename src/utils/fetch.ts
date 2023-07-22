import { getErrorMessage, sortByKey } from "@/utils/misc";
import { formatPrice, getPrice } from "@/utils/price";
import type { exchangeDisplayInfoSchema } from "@/utils/schemas";
import type { z } from "zod";
import { websiteData } from "../../data/websites";

const formatResponse = (r, v, price: number) =>
  ({
    provider: v.name,
    estimate: r,
    usdEstimate: formatPrice(r!, price),
    url: v.affiliateWebsite,
    type: v.type,
    kyc: v.kyc,
    image: v.image,
  } as z.infer<typeof exchangeDisplayInfoSchema>);

export async function GET({
  from,
  to,
  amount,
}: {
  from: string;
  to: string;
  amount: number;
}) {
  try {
    // @ts-ignore
    const price = await getPrice(to);

    const r = await Promise.allSettled(
      Object.values(websiteData).map((website) =>
        website
          .getEstimate({
            from,
            to,
            amount,
          })
          .then((result) => result && formatResponse(result, website, price))
      )
    );

    // @ts-ignore
    const rValue = r.map((r) => r.value).filter(Boolean);
    const sortedValue = sortByKey(rValue, "estimate").reverse();

    sortedValue[0].bestValue = true;

    return {
      from,
      to,
      fees: sortedValue,
      status: 200,
    };
  } catch (e) {
    return new Response("failed", {
      status: 500,
      statusText: getErrorMessage(e),
    });
  }
}
