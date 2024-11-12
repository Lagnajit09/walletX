"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Button } from "./button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export type Payment = {
  id?: number;
  amount: string;
  status:
    | "Pending"
    | "Processing"
    | "Success"
    | "Failure"
    | "Sent"
    | "Received";
  date: string;
  provider?: string;
  type?: string;
  toUser?: string;
  fromUser?: string;
};

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<Payment, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="rounded-md border-2 border-[#5585a2]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-[#5585a2]">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="bg-[#5585a2] text-white"
                    >
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-inherit border-[#5585a2]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        cell.column.id === "status" &&
                        cell.getValue() === "Success"
                          ? "text-green-600 font-semibold" // Apply green color for success status
                          : cell.column.id === "status" &&
                            cell.getValue() === "Failure"
                          ? "text-red-600 font-semibold" // Apply red color for failure status
                          : cell.column.id === "amount" &&
                            row.original.type === "onRamp"
                          ? "text-green-600" // Apply green for onRamp (incoming) transactions
                          : cell.column.id === "amount" &&
                            row.original.type === "offRamp"
                          ? "text-red-500" // Apply red for non-onRamp (outgoing) transactions
                          : ""
                      }
                    >
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
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4 px-4 border-t border-[#5585a2]">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="text-black"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="text-black"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
