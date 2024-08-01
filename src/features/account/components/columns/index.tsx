"use client";

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
      const formatted = new Intl.NumberFormat(currency.locales, {
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
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
