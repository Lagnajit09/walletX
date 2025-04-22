import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { WalletTransactionHistory } from "@/types/transaction";

interface WalletTransactionTableProps {
  transactions: WalletTransactionHistory[];
}

export function WalletTransactionTable({
  transactions,
}: WalletTransactionTableProps) {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Provider
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-transparent">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {format(
                      new Date(transaction.startTime),
                      "MMM d, yyyy, h:mm a"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Badge
                      variant="outline"
                      className={cn(
                        transaction.type.toLowerCase().includes("onramp")
                          ? "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 border-purple-200 dark:border-purple-900/50"
                          : "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-900/50"
                      )}
                    >
                      {transaction.type === "onRamp" ? "Deposit" : "Withdraw"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {transaction.provider}
                  </td>
                  <td
                    className={cn(
                      "px-6 py-4 whitespace-nowrap text-sm font-medium",
                      transaction.type.toLowerCase().includes("onramp")
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    )}
                  >
                    <div className="flex items-center">
                      {transaction.type.toLowerCase().includes("onramp") ? (
                        <ArrowDownLeft className="mr-1 h-4 w-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <ArrowUpRight className="mr-1 h-4 w-4 text-red-600 dark:text-red-400" />
                      )}
                      {formatCurrency(transaction.amount / 100)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Badge
                      variant={"outline"}
                      className={cn(
                        transaction.status === "Success"
                          ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-900/50"
                          : transaction.status === "Processing"
                          ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900/50"
                          : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-900/50"
                      )}
                    >
                      {transaction.status}
                    </Badge>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500"
                >
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
