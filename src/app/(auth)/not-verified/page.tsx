import { BorderBeam } from "@/components/magicui/border-beam";
import TypingAnimation from "@/components/magicui/typing-animation";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { checkVerification } from "@/features/supabase/hooks";
import { createClient } from "@/features/supabase/lib/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NotVerifiedPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (data?.user) {
    const isVerified = await checkVerification(data.user.id, false, false);
    if (isVerified) {
      redirect("/");
      return;
    }
  }
  return (
    <div className="relative rounded-xl">
      <Card className="w-full max-w-md p-6 grid gap-6">
        <CardHeader>
          <BorderBeam className="rounded-xl" />
          <TypingAnimation
            className="text-2xl font-bold text-black dark:text-white"
            text="You're not verified"
          />
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-justify">
            Please contact the administrator to verify your account. Once your
            account is verified, you will have access to all the features and
            functionalities of our application.
          </p>
          <p className="text-muted-foreground">
            Thank you for your understanding and cooperation.
          </p>
        </CardContent>
        <CardFooter>
          <Link href="/login">Login</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
