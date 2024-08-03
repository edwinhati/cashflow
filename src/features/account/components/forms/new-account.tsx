"use client";

import { z } from "zod";
import { cn } from "@/utils";
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
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  name: z
    .string({
      required_error: "Please enter an account name.",
    })
    .nonempty("Please enter an account name."),
  currency: z.object({
    name: z.string().min(3, {
      message: "Currency name must be at least 3 characters.",
    }),
    locale: z.string().min(5, {
      message: "Currency locale must be at least 5 characters.",
    }),
  }),
  balance: z.string(),
});

export function NewAccountForm({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      currency: {
        name: process.env.NEXT_PUBLIC_CURRENCY,
        locale: process.env.NEXT_PUBLIC_LOCALE,
      },
      balance: "0",
    },
  });

  const createAccount = trpc.account.create.useMutation({
    onError: (error) => {
      toast({
        title: "Failed to create account",
        description: error.message,
      });
    },
    onSettled: () => {
      form.reset();
      toast({
        title: "Account created",
        description: "Your account has been created successfully",
      });
      onSuccess();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createAccount.mutate(values);
  }

  const [currencies, setCurrencies] = useState<
    {
      locale: string;
      countryName: string;
      currencyCode: string;
      currencyName: string;
      currencySymbol: string;
    }[]
  >([]);

  // Alternative https://appwrite.io/docs/references/cloud/client-web/locale
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countries = data
          .map(
            (country: {
              name: { common: string };
              currencies: {
                [x: string]: {
                  name: string;
                  symbol: string;
                };
              };
              languages: ArrayLike<unknown> | { [s: string]: unknown };
              cca2: string;
            }) => {
              const countryName = country.name.common;
              const currencyCode =
                Object.keys(country.currencies || {})[0] || "N/A";
              const locale =
                country.languages && Object.values(country.languages)[0]
                  ? `${country.cca2}`
                  : "N/A";
              const currencyName =
                country.currencies?.[currencyCode]?.name || "N/A";
              const currencySymbol =
                country.currencies?.[currencyCode]?.symbol || "N/A";
              return {
                locale,
                countryName,
                currencyCode,
                currencyName,
                currencySymbol,
              };
            }
          )
          .sort((a: { countryName: string }, b: { countryName: any }) =>
            a.countryName.localeCompare(b.countryName)
          );
        setCurrencies(countries);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
        {/* TODO:  Bug cannot choose currency */}
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Currency</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? (() => {
                            const selectedCurrency = currencies.find(
                              (currency) =>
                                currency.currencyCode === field.value.name
                            );
                            return `${selectedCurrency?.currencyCode} - ${selectedCurrency?.currencyName} - ${selectedCurrency?.currencySymbol}`;
                          })()
                        : "Select a currency"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Filter currencies..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No currencies found.</CommandEmpty>
                      <CommandGroup>
                        <CommandList>
                          <ScrollArea className="h-96">
                            {currencies.map((currency) => (
                              <CommandItem
                                value={currency.currencyCode}
                                key={currency.currencyCode}
                                onSelect={() => {
                                  form.setValue(
                                    "currency",
                                    {
                                      locale: currency.locale,
                                      name: currency.currencyCode,
                                    },
                                    {
                                      shouldValidate: true,
                                      shouldDirty: true,
                                      shouldTouch: true,
                                    }
                                  );
                                }}
                              >
                                {currency.countryName}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    currency.currencyCode === field.value.name
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}{" "}
                          </ScrollArea>
                        </CommandList>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                The currency you want to use for this account.
              </FormDescription>
              <FormMessage />
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
        <Button type="submit">Create Account</Button>
      </form>
    </Form>
  );
}
