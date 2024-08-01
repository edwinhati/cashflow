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
    const isVerified = await checkVerification(data.user?.id, false, true);
    if (!isVerified) {
      return;
    }
  }

  await revalidatePath("/");
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
    const isVerified = await checkVerification(data.user?.id, false, true);
    if (!isVerified) {
      return;
    }
  }

  await revalidatePath("/");
  redirect("/");
}

export async function logout() {
  const supabase = createClient();

  await supabase.auth.signOut();

  await revalidatePath("/");
  redirect("/");
}

export async function checkVerification(
  id?: string,
  isSignOut?: boolean,
  isRedirect?: boolean
) {
  if (!id) {
    await handleUnverifiedUser(isSignOut, isRedirect);
    return false;
  }

  try {
    const result = await postgres
      .select()
      .from(user)
      .where(eq(user.id, id))
      .execute();

    if (result.length > 0 && result[0].is_verified) {
      return true;
    } else {
      await handleUnverifiedUser(isSignOut, isRedirect);
      return false;
    }
  } catch (error) {
    console.error("Error checking user verification:", error);
    await handleUnverifiedUser(isSignOut, isRedirect);
    return false;
  }
}

async function handleUnverifiedUser(isSignOut?: boolean, isRedirect?: boolean) {
  const supabase = createClient();

  if (isSignOut) {
    await supabase.auth.signOut();
  }

  if (isRedirect) {
    await revalidatePath("/");
    redirect("/not-verified");
  }
}
