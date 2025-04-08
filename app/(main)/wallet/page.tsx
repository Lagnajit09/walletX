import React from "react";
import {
  CreditCard,
  Plus,
  ExternalLink,
  ArrowDown,
  ArrowUp,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

// import PinVerificationDialog from '@/components/PinVerificationDialog';
import Link from "next/link";
import { banks, cards } from "@/app/lib/banks";
import WalletCard from "@/src/components/custom/WalletCard";
import { Suspense } from "react";
import WalletCardSkeleton from "@/src/components/skeletons/WalletCardSkeleton";

const WalletPage = () => {
  return (
    <main className="px-4 pt-2 md:px-6 pt-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Card */}
        <Suspense fallback={<WalletCardSkeleton />}>
          <WalletCardSection />
        </Suspense>
        {/* Payment Methods */}
        <Card
          className="lg:col-span-1 animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Bank Accounts
                </h3>
                {banks.map((bank) => (
                  <div
                    key={bank.id}
                    className="rounded-xl p-4 flex items-center justify-between border hover:bg-muted/50 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-swift-purple/10 to-swift-blue/10 flex items-center justify-center mr-3">
                        <CreditCard className="h-4 w-4 text-swift-purple" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{bank.name}</p>
                        <p className="text-swift-dark-gray text-xs">
                          {bank.accountNo}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-swift-dark-gray" />
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" /> Link New Bank
                </Button>
              </div>

              <div className="pt-4 space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Cards
                </h3>
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className="rounded-xl p-4 flex items-center justify-between border hover:bg-muted/50 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-swift-purple/10 to-swift-blue/10 flex items-center justify-center mr-3">
                        <CreditCard className="h-4 w-4 text-swift-purple" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {card.type} •••• {card.last4}
                        </p>
                        <p className="text-swift-dark-gray text-xs">
                          Expires {card.expiry}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-swift-dark-gray" />
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" /> Add New Card
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card
          className="lg:col-span-3 animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Activities</CardTitle>
            <Button variant="link" asChild>
              <Link href="/transactions" className="flex items-center gap-1">
                View All <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-xl p-4 flex items-center justify-between border hover:bg-muted/50">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <ArrowDown className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Added to wallet</p>
                    <p className="text-swift-dark-gray text-sm">
                      Today, 2:45 PM
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-green-600">+$250.00</p>
              </div>

              <div className="rounded-xl p-4 flex items-center justify-between border hover:bg-muted/50">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <ArrowUp className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">Withdrawal to HDFC Bank</p>
                    <p className="text-swift-dark-gray text-sm">
                      Yesterday, 4:30 PM
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-red-600">-$500.00</p>
              </div>

              <div className="rounded-xl p-4 flex items-center justify-between border hover:bg-muted/50">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <ArrowDown className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Added from Visa card</p>
                    <p className="text-swift-dark-gray text-sm">
                      Jan 15, 11:20 AM
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-green-600">+$1,000.00</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>

    // {/* PIN Verification Dialog */}
    // <PinVerificationDialog
    //   isOpen={isPinDialogOpen}
    //   onClose={handleCloseDialog}
    //   onVerify={handleVerifiedTransaction}
    // />
  );
};

export default WalletPage;

// Separate components for each section
async function WalletCardSection() {
  const { getBalance } = await import("../../lib/actions/getBalance");
  const balance = await getBalance();
  return (
    <WalletCard existingBalance={balance.amount} locked={balance.locked} />
  );
}

// import { BalanceCard } from "../../../src/components/custom/BalanceCard";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../lib/auth";
// import { createOnRampTransaction } from "../../lib/actions/createOnrampTransaction";
// import { TransferMoney } from "@/src/components/custom/TransferMoneyCard";
// import { createOffRampTransaction } from "../../lib/actions/createOffRampTransaction";
// import { getRecentTransactions } from "../../lib/actions/getRecentTransactions";
// import { DataTable } from "@/src/components/ui/data-table";
// import { columns } from "@/src/components/custom/Columns";
// import { getBalance } from "../../lib/actions/getBalance";
// import React, { Suspense } from "react";
// import Loader from "@/src/components/custom/Loader";

// // Fetch transactions and balance
// async function getTransactions() {
//   const session = await getServerSession(authOptions);

//   const txns = await getRecentTransactions(Number(session?.user?.id));
//   return txns.map((t) => {
//     const date = new Date(t.startTime);

//     const formattedDate = date.toLocaleDateString("en-GB", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });

//     const formattedTime = date.toLocaleTimeString("en-IN", {
//       hour: "numeric",
//       minute: "numeric",
//       hour12: true,
//     });

//     return {
//       id: t.id,
//       date: `${formattedTime} on ${formattedDate}`,
//       amount: t.type == "onRamp" ? `+${t.amount / 100}` : `-${t.amount / 100}`,
//       status: t.status,
//       provider: t.provider,
//       type: t.type,
//     };
//   });
// }

// async function getBalanceData() {
//   const balance = await getBalance();
//   return balance;
// }

// export default function WalletPage() {
//   return (
//     <Suspense fallback={<Loader />}>
//       <WalletContent />
//     </Suspense>
//   );
// }

// async function WalletContent() {
//   const balance = await getBalanceData();
//   const transactions = await getTransactions();

//   return (
//     <div className="w-full pb-10">
//       <div className="text-4xl text-[#00b4d8] pt-2 pb-6 mb-0 font-bold">
//         Wallet
//       </div>
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
//         <div className="w-full">
//           <BalanceCard amount={balance.amount} locked={balance.locked} />
//         </div>
//         <div className=""></div>
//         <div className="mt-5">
//           <p className="text-2xl font-bold text-[#00b4d8] mb-3">
//             Add to Wallet
//           </p>
//           <TransferMoney
//             title="Add Money"
//             callbackFunc={createOnRampTransaction}
//             btnText="Add Money"
//           />
//         </div>
//         <div className="mt-5">
//           <p className="text-2xl font-bold text-[#00b4d8] mb-3">
//             Withdraw to Bank
//           </p>
//           <TransferMoney
//             title="Withdraw Money"
//             callbackFunc={createOffRampTransaction}
//             btnText="Withdraw Money"
//           />
//         </div>
//       </div>
//       <div className="mt-5 mx-4">
//         <p className="text-2xl font-bold text-[#00b4d8] mb-3">
//           Recent Transactions
//         </p>
//         <p className="text-gray-300 mb-4">
//           You can only see the transactions of last 30 days.
//         </p>
//         <DataTable columns={columns} data={transactions} />
//       </div>
//     </div>
//   );
// }
