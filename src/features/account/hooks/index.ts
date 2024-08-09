"use server";

import { eq } from "drizzle-orm";
import { postgres } from "@/lib/postgres";
import { account } from "../../../../database/schema";

export async function findMany() {
  try {
    const accounts = await postgres.select().from(account);
    return accounts;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function create({
  name,
  currency,
  balance,
}: {
  name: string;
  currency: {
    name: string;
    locale: string;
  };
  balance: string;
}) {
  try {
    const newAccount = {
      userId: "",
      name,
      currency,
      balance,
    };

    await postgres.insert(account).values(newAccount).execute();
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function update({
  id,
  name,
  currency,
  balance,
}: {
  id: string;
  name?: string;
  currency?: {
    name: string;
    locale: string;
  };
  balance?: string;
}) {
  try {
    const updatedAccount = {
      name,
      currency,
      balance,
    };

    await postgres
      .update(account)
      .set(updatedAccount)
      .where(eq(account.id, id))
      .returning({ updatedId: account.id });
    return updatedAccount;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function remove({ id }: { id: string }) {
  try {
    await postgres.delete(account).where(eq(account.id, id)).returning();
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
