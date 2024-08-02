import { procedure, router } from "@/lib/trpc";

export const appRouter = router({
  hello: procedure.query(async () => {
    return { greeting: "Hello, world!" };
  }),
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;