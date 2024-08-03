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
