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
    console.error("Error fetching accounts:", error);
    return [];
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
    return newAccount;
  } catch (error) {
    console.error("Error creating account:", error);
    throw new Error("Failed to create account");
  }
}
