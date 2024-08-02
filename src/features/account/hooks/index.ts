"use server";

import { postgres } from "@/lib/postgres";
import { account } from "../../../../database/schema";
import { Account } from "@/features/account/types/account";

export async function findMany() {
  const accounts = await postgres.select().from(account);
  return accounts;
}
