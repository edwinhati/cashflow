import { postgres } from "@/lib/postgres";
import { user } from "../../database/schema";
import { eq } from "drizzle-orm";

export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    await signIn("credentials", formData);
    console.log("Authentication successful.");
    return "Authentication successful.";
  } catch (error: any) {
    switch (error.type) {
      case "CredentialsSignin":
        return "Invalid credentials.";
      default:
        return "Something went wrong.";
    }
  }
}

function signIn(strategy: string, formData: FormData) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(async () => {
      let existingUser;
      if (
        (existingUser = await postgres
          .select()
          .from(user)
          .where(eq(user.email, formData.get("email") as string))) &&
        existingUser[0]?.password === formData.get("password")
      ) {
        resolve();
      } else {
        reject({ type: "CredentialsSignin" });
      }
    }, 1000);
  });
}

export async function signUp(_currentState: unknown, formData: FormData) {
  try {
    await createUser(formData);
  } catch (error: any) {
    switch (error.type) {
      case "UserExists":
        return "User already exists.";
      default:
        return "Something went wrong.";
    }
  }
}

async function createUser(formData: FormData) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(async () => {
      await postgres.insert(user).values({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        currency: process.env.DEFAULT_CURRENCY,
        is_verified: process.env.DEFAULT_VERIFIED === "true",
      });
    }, 1000);
  });
}
