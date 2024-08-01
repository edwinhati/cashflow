import { BorderBeam } from "@/components/magicui/border-beam";
import TypingAnimation from "@/components/magicui/typing-animation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function NotVerifiedPage() {
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
            Please contact the administrator to verify your account. Once your account is verified, you will have access to all the features and functionalities of our application.
          </p>
          <p className="text-muted-foreground">
            Thank you for your understanding and cooperation.
          </p>
        </CardContent>
        <CardFooter>
          <button className="btn-primary">Contact Administrator</button>
        </CardFooter>
      </Card>
    </div>
  );
}
