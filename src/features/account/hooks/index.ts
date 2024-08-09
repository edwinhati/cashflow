"use server";

import { eq } from "drizzle-orm";
import { postgres } from "@/lib/postgres";
import { account } from "../../../../database/schema";
import { Account } from "@/features/account/types/account";
import { createClient } from "@/features/supabase/lib/server";

export async function findMany() {
  const supabase = createClient();

  try {
    const { data, error: authError } = await supabase.auth.getUser();

    if (authError) {
      throw new Error(`Authentication error: ${authError.message}`);
    }

    const userId = data.user?.id;

    if (!userId) {
      throw new Error("User ID is undefined");
    }

    const accounts = await postgres
      .select()
      .from(account)
      .where(eq(account.userId, userId));

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
  const supabase = createClient();

  try {
    const { data, error: authError } = await supabase.auth.getUser();

    if (authError) {
      throw new Error(`Authentication error: ${authError.message}`);
    }

    const userId = data.user?.id;

    if (!userId) {
      throw new Error("User ID is undefined");
    }

    const newAccount = {
      userId,
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
