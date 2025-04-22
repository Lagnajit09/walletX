import React from "react";
import { CreditCard, Plus, ExternalLink, ChevronRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Link from "next/link";
import { banks, cards } from "@/app/lib/banks";
import WalletCard from "@/src/components/custom/WalletCard";
import { Suspense } from "react";
import WalletCardSkeleton from "@/src/components/skeletons/WalletCardSkeleton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { getRecentTransactions } from "@/app/lib/actions/getWalletTransactions";
import RecentActivities from "@/src/components/custom/RecentWalletActivities";
import { DashboardSkeleton } from "@/src/components/skeletons/DashboardSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wallet | Swift Pay",
  description:
    "Have your own Wallet, Connect to Bank accounts, Add Debit/Credit cards. Make your transactions.",
};

// Fetch transactions and balance
async function getTransactions() {
  const session = await getServerSession(authOptions);

  const txns = await getRecentTransactions(Number(session?.user?.id));
  return txns.map((t) => {
    const date = new Date(t.startTime);

    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return {
      id: t.id,
      date: `${formattedTime} on ${formattedDate}`,
      amount:
        t.type == "onRamp" ? `+ ₹ ${t.amount / 100}` : `- ₹ ${t.amount / 100}`,
      status: t.status,
      provider: t.provider,
      type: t.type,
    };
  });
}

const WalletPage = async () => {
  return (
    <main className="px-4 md:px-6 pt-8">
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
            <div className="flex flex-col gap-2">
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>View your last 10 transactions</CardDescription>
            </div>

            <Button variant="link" asChild>
              <Link href="/transactions" className="flex items-center gap-1">
                View All <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<DashboardSkeleton type="balance" />}>
              <RecentActivitiesSection />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default WalletPage;

async function WalletCardSection() {
  const { getBalance } = await import("../../lib/actions/getBalance");
  const balance = await getBalance();
  return (
    <WalletCard existingBalance={balance.amount} locked={balance.locked} />
  );
}

async function RecentActivitiesSection() {
  const transactions = await getTransactions();
  return (
    <div className="space-y-4">
      {transactions.length > 0 ? (
        transactions.map((txn, index) => (
          <RecentActivities
            key={index}
            amount={txn.amount}
            date={txn.date}
            type={txn.type}
            status={txn.status}
          />
        ))
      ) : (
        <div className="p-4 text-center text-muted-foreground">
          No recent transactions
        </div>
      )}
    </div>
  );
}
