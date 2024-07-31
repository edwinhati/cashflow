import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const transactionSchema = z.object({
  id: z.string(),
  description: z.string(),
  category: z.string(),
  type: z.string(),
  currency: z.string(),
  amount: z.number(),
});

export type Transaction = z.infer<typeof transactionSchema>;

