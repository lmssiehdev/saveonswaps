import { exchangeDisplayInfoSchema } from "@/utils/schemas";
import { Button } from "@/components/Common/Button";
import { Label } from "@/components/Common/Label";
import type { z } from "zod";

type Props = {
  to: string;
  exchanges: any[];
};

const schema = exchangeDisplayInfoSchema;

export function ExchangeList({ exchanges, to }: Props) {
  const result = schema.array().parse(exchanges);

  return (
    <div className="">
      {result.map((exchange, index) => (
        <ExchangeItem to={to} exchange={exchange} key={index} />
      ))}
    </div>
  );
}

function ExchangeItem({
  exchange,
  to,
}: {
  exchange: z.infer<typeof schema>;
  to: string;
}) {
  const { estimate, provider, url, usdEstimate, type } = exchange;

  return (
    <div className=" bg-black/10  backdrop-blur-lg rounded-sm p-3 my-5 flex justify-between flex-wrap border-[0.3px] border-solid border-white/10  ">
      <div className="">
        <div className="flex gap-1">
          <h3 className="font-semibold text-lg">{provider}</h3>
          {exchange?.bestValue && (
            <div className="flex items-center">
              <Label variant="primary" className="inline-block">
                Best Deal
              </Label>
            </div>
          )}
        </div>
        <span className="capitalize text-sm text-muted font-mono">
          {type.replace("_", " ").toLowerCase()}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-right">
          <span className="text-sm text-gray-200">{`${estimate} ${to.toUpperCase()}`}</span>
          <span className="block text-sm text-muted">{usdEstimate}</span>
        </div>
        <Button as="a" href={url} variant="primary">
          Exchange
        </Button>
      </div>
    </div>
  );
}
