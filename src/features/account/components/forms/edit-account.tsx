"use client";

import { z } from "zod";
import { trpc } from "@/utils/trpc";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import type { Account } from "@/features/account/types/account";

const formSchema = z.object({
  name: z
    .string({
      required_error: "Please enter an account name.",
    })
    .nonempty("Please enter an account name."),
  balance: z.string(),
});

export default function EditAccountForm({
  account,
  onSuccess,
}: {
  account: Account;
  onSuccess: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: account.name,
      balance: account.balance.toString(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Account updated",
      description: (
        <pre>
          <code
            className="whitespace-pre-wrap"
            style={{ maxWidth: "100%", overflowX: "auto" }}
          >
            {JSON.stringify(values, null, 2)}
          </code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                The name of the account you want to create. Example: Saving
              </FormDescription>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Balance</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage>
                {form.formState.errors.balance?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit">Edit Account</Button>
      </form>
    </Form>
  );
}
