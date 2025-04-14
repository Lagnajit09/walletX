import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { P2PTransactionsTab } from "./P2PTransactionsTab";
import { WalletTransactionsTab } from "./WalletTransactionsTab";
import { Transaction, WalletTransactionHistory } from "@/types/transaction";

interface TransactionHistoryProps {
  p2pTransactions: Transaction[];
  walletTransactions: WalletTransactionHistory[];
}

export default function TransactionHistory({
  p2pTransactions,
  walletTransactions,
}: TransactionHistoryProps) {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
        Transaction History
      </h1>

      <Tabs defaultValue="p2p" className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <TabsList className="bg-muted/50 mb-2 sm:mb-0">
            <TabsTrigger
              value="p2p"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              P2P Transfers
            </TabsTrigger>
            <TabsTrigger
              value="wallet"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Wallet Transactions
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="p2p" className="mt-0 space-y-4">
          <P2PTransactionsTab transactions={p2pTransactions} />
        </TabsContent>

        <TabsContent value="wallet" className="mt-0 space-y-4">
          <WalletTransactionsTab transactions={walletTransactions} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
