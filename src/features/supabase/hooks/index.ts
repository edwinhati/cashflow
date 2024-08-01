"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/features/supabase/lib/server";
import { postgres } from "@/lib/postgres";
import { user } from "../../../../database/schema";
import { eq } from "drizzle-orm";

export async function login(email: string, password: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  if (data) {
    const isVerified = await checkVerification(data.user?.id);
    if (!isVerified) {
      return;
    }
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(email: string, password: string, name: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data) {
    await postgres
      .insert(user)
      .values({
        id: data.user?.id,
        email,
        password: "supabase",
        name,
        currency: process.env.DEFAULT_CURRENCY,
        is_verified: process.env.DEFAULT_VERIFIED === "true",
      })
      .execute();
    const isVerified = await checkVerification(data.user?.id);
    if (!isVerified) {
      return;
    }
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logout() {
  const supabase = createClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/");
}

async function checkVerification(id?: string) {
  if (!id) {
    await handleUnverifiedUser();
    return false;
  }

  const result = await postgres
    .select()
    .from(user)
    .where(eq(user.id, id))
    .execute();

  if (result.at(0)?.is_verified) {
    return true;
  } else {
    await handleUnverifiedUser();
    return false;
  }
}

async function handleUnverifiedUser() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/not-verified");
}
