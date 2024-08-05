"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/data-table/pagination";
import { DataTableViewOptions } from "@/components/data-table/view-options";
import { columns } from "../columns";
import { Button } from "@/components/ui/button";
import { NewAccountForm } from "../forms/new-account";
import AccountSheet from "../sheets";
import AccountDialog from "../dialog";
import { Skeleton } from "@/components/ui/skeleton";

export function DataTable<TData, TValue>() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const { data, isLoading, refetch } = trpc.account.findMany.useQuery();
  const table = useReactTable({
    data: (data as TData[]) ?? [],
    columns: columns as ColumnDef<TData, TValue>[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter accounts..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="block lg:hidden">
          <AccountDialog
            open={sheetOpen}
            onOpenChange={setSheetOpen}
            title="Create a new account"
            description="Fill out the form below to create a new account."
            content={
              <NewAccountForm
                onSuccess={() => {
                  refetch();
                  setSheetOpen(false);
                }}
              />
            }
          >
            <Button size="sm" className="ml-4">
              Add Account
            </Button>
          </AccountDialog>
        </div>
        <DataTableViewOptions table={table} />
        <div className="hidden lg:block">
          <AccountSheet
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            title="Create a new account"
            description="Fill out the form below to create a new account."
            content={
              <NewAccountForm
                onSuccess={() => {
                  refetch();
                  setDialogOpen(false);
                }}
              />
            }
          >
            <Button size="sm" className="ml-4">
              Add Account
            </Button>
          </AccountSheet>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <>
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 space-y-1"
                  >
                    <Skeleton className="w-full h-[20px] rounded-md" />
                    <Skeleton className="w-full h-[20px] rounded-md" />
                    <Skeleton className="w-full h-[20px] rounded-md" />
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="py-4">
        <DataTablePagination table={table} />
      </div>
    </>
  );
}
