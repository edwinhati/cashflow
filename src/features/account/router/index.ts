import { router, procedure } from "@/lib/trpc";
import { create, findMany, update, remove } from "@/features/account/hooks";
import { object, z } from "zod";
import { TRPCError } from "@trpc/server";

export const accountsRouter = router({
  findMany: procedure.query(() => {
    try {
      return findMany();
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: (error as Error).message,
      });
    }
  }),
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
    .mutation(({ input }) => {
      try {
        return create(input);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as Error).message,
        });
      }
    }),
  update: procedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        currency: z
          .object({
            name: z.string(),
            locale: z.string(),
          })
          .optional(),
        balance: z.string().optional(),
      })
    )
    .mutation(({ input }) => {
      try {
        update(input);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as Error).message,
        });
      }
    }),
  delete: procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input }) => {
      try {
        return remove(input);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as Error).message,
        });
      }
    }),
});
