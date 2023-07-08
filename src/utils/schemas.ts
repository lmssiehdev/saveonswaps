import { z } from "zod";

export const exchangeDisplayInfoSchema = z.object({
  provider: z.string(),
  estimate: z.number(),
  url: z.string(),
  usdEstimate: z.number().or(z.string()),
  type: z.string(),
  bestValue: z.boolean().optional(),
});

export type ExchangeDisplayInfo = z.infer<typeof exchangeDisplayInfoSchema>;

export const paramsSchema = z.object({
  from: z.string(),
  to: z.string(),
  amount: z.string().or(z.number()),
});

export type Params = z.infer<typeof paramsSchema>;
