"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Payment } from "../ui/data-table";

export const TransferColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "toUser",
    header: "To",
  },
  {
    accessorKey: "fromUser",
    header: "From",
  },
  {
    accessorKey: "amount",
    header: "Amount (INR)",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
