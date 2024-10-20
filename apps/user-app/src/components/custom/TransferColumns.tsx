"use client";

import { ColumnDef } from "@tanstack/react-table";

export type p2pPayment = {
  id?: string;
  amount: string;
  status: "Pending" | "Processing" | "Success" | "Failure";
  date: string;
  provider: string;
  type: string;
};

export const TransferColumns: ColumnDef<p2pPayment>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "to",
    header: "To",
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
