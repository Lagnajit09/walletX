"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  id?: string;
  amount: string;
  status: "Pending" | "Processing" | "Success" | "Failure";
  date: string;
  provider: string;
  type: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "provider",
    header: "Provider",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
