import { router, procedure } from "@/lib/trpc";
import { create, findMany } from "@/features/account/hooks";
import { z } from "zod";

export const accountsRouter = router({
  findMany: procedure.query(() => findMany()),
  create: procedure
    .input(
      z.object({
        name: z.string(),
        currency: z.object({
          name: z.string(),
          locale: z.string(),
        }),
        balance: z.string(),
      })
    )
    .mutation(({ input }) => create(input)),
});
