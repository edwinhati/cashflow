/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/header";
import type { Account } from "@/features/account/types/account";
import type { Currency } from "@/features/account/types/currency";
import AccountDialog from "@/features/account/components/dialog";
import AccountSheet from "@/features/account/components/sheets";
import EditAccountForm from "@/features/account/components/forms/edit-account";
import DeleteAccountAlert from "@/features/account/components/alerts/delete-account";

export const columns: ColumnDef<Account>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
  },
  {
    accessorKey: "currency",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Currency" />;
    },
    cell: ({ row }) => {
      const currency = row.getValue("currency") as Currency;
      return currency.name;
    },
  },
  {
    accessorKey: "balance",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Balance" />;
    },
    cell: ({ row }) => {
      const currency = row.getValue("currency") as Currency;
      const balance = parseFloat(row.getValue("balance"));
      const formatted = new Intl.NumberFormat(currency.locale, {
        style: "currency",
        currency: currency.name,
      }).format(balance);

      return formatted;
    },
  },
  {
    id: "actions",
    header: () => null,
    cell: ({ row }) => {
      const account = row.original as Account;

      const [title, setTitle] = useState<string>();
      const [description, setDescription] = useState<string>();
      const [sheetOpen, setSheetOpen] = useState<boolean>(false);
      const [dialogOpen, setDialogOpen] = useState<boolean>(false);
      const [deleteAlertOpen, setDeleteAlertOpen] = useState<boolean>(false);
      const [components, setComponents] = useState<
        React.ReactElement | undefined
      >();
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="sm:hidden"
                onClick={() => {
                  setTitle(`Edit ${account.name}`);
                  setDescription(
                    "Fill out the form below to edit the account."
                  );
                  setDialogOpen(!dialogOpen);
                  setComponents(
                    <EditAccountForm
                      account={account}
                      onSuccess={() => setDialogOpen(!dialogOpen)}
                    />
                  );
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hidden sm:block"
                onClick={() => {
                  setTitle(`Edit ${account.name}`);
                  setDescription(
                    "Fill out the form below to edit the account."
                  );
                  setSheetOpen(!sheetOpen);
                  setComponents(
                    <EditAccountForm
                      account={account}
                      onSuccess={() => setSheetOpen(!sheetOpen)}
                    />
                  );
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setDeleteAlertOpen(!deleteAlertOpen);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AccountDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            title={`Edit ${account.name}`}
            description="Fill out the form below to edit the account."
            content={components || <></>}
          />
          <AccountSheet
            open={sheetOpen}
            onOpenChange={setSheetOpen}
            title={title || ""}
            description={description || ""}
            content={components || <></>}
          />
          <DeleteAccountAlert
            account={account}
            open={deleteAlertOpen}
            onOpenChange={setDeleteAlertOpen}
          />
        </>
      );
    },
  },
];
