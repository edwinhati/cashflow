"use server";

import { postgres } from "@/lib/postgres";
import { account } from "../../../../database/schema";

export async function findMany() {
  const accounts = await postgres.select().from(account);
  return accounts;
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
    return newAccount;
  } catch (error) {
    console.error("Error creating account:", error);
    throw new Error("Failed to create account");
  }
}
