"use client";
import { useState } from "react";
import { Input } from "@/src/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Search } from "lucide-react";
import { WalletTransactionHistory } from "@/types/transaction";
import { WalletTransactionTable } from "./WalletTransactionTable";
import { TransactionPagination } from "./TransactionPagination";

interface WalletTransactionsTabProps {
  transactions: WalletTransactionHistory[];
}

export function WalletTransactionsTab({
  transactions,
}: WalletTransactionsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter((transaction) => {
    return (
      transaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.amount.toString().includes(searchQuery.toLowerCase())
    );
  });

  // Calculate pagination indices
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentTransactions = filteredTransactions.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredTransactions.length / recordsPerPage);

  // Handle page changes
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Wallet Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search wallet transactions..."
            className="pl-10 w-full sm:w-[250px] lg:w-[300px]"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>

        <WalletTransactionTable transactions={currentTransactions} />

        {filteredTransactions.length > 0 && (
          <TransactionPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </CardContent>
    </Card>
  );
}
