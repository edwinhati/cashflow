import { router } from "@/lib/trpc";
import { accountsRouter } from "@/features/account/router";

export const appRouter = router({
  account: accountsRouter,
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
