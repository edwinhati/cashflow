import { router, procedure } from "@/lib/trpc";
import { findMany } from "@/features/account/hooks";

export const accountsRouter = router({
    findMany: procedure.query(findMany),
})
