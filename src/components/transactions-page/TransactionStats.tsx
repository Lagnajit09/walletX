import { ArrowDownLeft, ArrowUpRight, DollarSign, Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Transaction, WalletTransactionHistory } from "@/types/transaction";

interface TransactionStatsProps {
  p2pTransactions: Transaction[];
  walletTransactions: WalletTransactionHistory[];
}

export function TransactionStats({
  p2pTransactions,
  walletTransactions,
}: TransactionStatsProps) {
  // Calculate total sent amount
  const totalSent = p2pTransactions
    .filter((tx) => tx.status === "Sent")
    .reduce((sum, tx) => sum + parseFloat(tx.amount) / 100, 0);

  // Calculate total received amount
  const totalReceived = p2pTransactions
    .filter((tx) => tx.status === "Received")
    .reduce((sum, tx) => sum + parseFloat(tx.amount) / 100, 0);

  // Calculate wallet stats
  const totalDeposits = walletTransactions
    .filter((tx) => tx.type.toLowerCase().includes("onramp"))
    .reduce((sum, tx) => sum + tx.amount / 100, 0);

  const totalWithdrawals = walletTransactions
    .filter((tx) => tx.type.toLowerCase().includes("offramp"))
    .reduce((sum, tx) => sum + tx.amount / 100, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalSent)}</div>
          <p className="text-xs text-muted-foreground">
            Funds sent to other users
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Received</CardTitle>
          <ArrowDownLeft className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(totalReceived)}
          </div>
          <p className="text-xs text-muted-foreground">
            Funds received from other users
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
          <DollarSign className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(totalDeposits)}
          </div>
          <p className="text-xs text-muted-foreground">
            Wallet deposit transactions
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Withdrawals
          </CardTitle>
          <Info className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(totalWithdrawals)}
          </div>
          <p className="text-xs text-muted-foreground">
            Wallet withdrawal transactions
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
