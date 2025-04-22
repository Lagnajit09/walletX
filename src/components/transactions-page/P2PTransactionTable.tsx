import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { cn, formatCurrency } from "@/lib/utils";
import { Transaction } from "@/types/transaction";

interface P2PTransactionTableProps {
  transactions: Transaction[];
}

export function P2PTransactionTable({
  transactions,
}: P2PTransactionTableProps) {
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
                From
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                To
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
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {transaction.fromUser}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {transaction.toUser}
                  </td>
                  <td
                    className={cn(
                      "px-6 py-4 whitespace-nowrap text-sm font-medium",
                      transaction.status === "Received"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    )}
                  >
                    <div className="flex items-center">
                      {transaction.status === "Received" ? (
                        <ArrowDownLeft className="mr-1 h-4 w-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <ArrowUpRight className="mr-1 h-4 w-4 text-red-600 dark:text-red-400" />
                      )}
                      {formatCurrency(parseFloat(transaction.amount) / 100)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Badge
                      variant={"outline"}
                      className={
                        transaction.status === "Received"
                          ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-900/50"
                          : "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-900/50"
                      }
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
