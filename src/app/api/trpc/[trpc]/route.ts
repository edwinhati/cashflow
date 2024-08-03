import { appRouter } from "@/lib/trpc/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) =>
  fetchRequestHandler({
    req,
    router: appRouter,
    endpoint: "/api/trpc",
    createContext: () => ({}),
  });

export { handler as GET, handler as POST };
