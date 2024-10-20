"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Payment } from "../ui/data-table";

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
