import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import type { Account } from "@/features/account/types/account";

export default function DeleteAccountAlert({
  account,
  open,
  onOpenChange,
}: {
  account: Account;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [confirmName, setConfirmName] = useState<string>();
  
  const isConfirmNameValid = confirmName === account?.name;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Your Account</AlertDialogTitle>
          <AlertDialogDescription>
            <p className="text-muted-foreground">
              Are you sure you want to permanently delete this account? This
              action cannot be undone.
            </p>
            <p className="mt-2 font-medium">
              To confirm, please type{" "}
              <span className="text-gray-500 font-bold">{account?.name}</span>{" "}
              below.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="confirm-account"
            placeholder="Type account name to confirm"
            className="bg-muted text-muted-foreground"
            value={confirmName}
            onChange={(e) => setConfirmName(e.target.value)}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            disabled={!isConfirmNameValid}
          >
            Delete Account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
