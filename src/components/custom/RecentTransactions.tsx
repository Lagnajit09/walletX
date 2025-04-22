import React from "react";
import { ArrowUpRight, ArrowDownLeft, ChevronRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Transaction } from "@/types/transaction";

interface RecentTransactionsProps {
  recentTransactions: Transaction[] | string;
}

const RecentTransactions = ({
  recentTransactions,
}: RecentTransactionsProps) => {
  if (typeof recentTransactions === "string") {
    // Handle the case where transactions is a string (error message)
    return redirect("/signin");
  }

  if (recentTransactions.length === 0) {
    return (
      <div className="glass rounded-xl p-4 flex flex-col justify-between gap-3 animate-slide-right transition-all duration-300 hover:shadow-md hover:bg-white/80">
        <h3 className="font-medium text-lg">Recent Transactions</h3>
        <p className="font-normal text-sm text-gray-600">
          Welcome User! Make your first transaction to view it here.
        </p>
        <Link href="/transfer">
          <Button
            variant="ghost"
            size="sm"
            className="text-swift-purple border-2 border-dashed border-swift-purple"
          >
            Transfer <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  // Helper function to get initials from a name
  const getInitials = (name: string): string => {
    // Return first letter of each word, maximum 2 letters
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="w-full mt-6 md:mt-0">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Recent Transactions</h3>
        <Link href="/transactions">
          <Button variant="ghost" size="sm" className="text-swift-purple">
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {recentTransactions.map((transaction) => {
          // Determine display name - either the other person in the transaction or "You"
          const displayName =
            transaction.status === "Sent"
              ? transaction.toUser
              : transaction.fromUser;

          // Get initials for avatar
          // const initials = getInitials(displayName);

          // Format amount with currency symbol and sign
          const formattedAmount =
            transaction.status === "Received"
              ? `+ ₹${parseFloat(transaction.amount) / 100}`
              : `- ₹${parseFloat(transaction.amount) / 100}`;

          return (
            <div
              key={transaction.id}
              className="glass rounded-xl p-4 flex items-center justify-between animate-slide-right transition-all duration-300 hover:shadow-md hover:bg-white/80 cursor-pointer"
              style={{ animationDelay: `${transaction.id * 100}ms` }}
            >
              <div className="flex items-center">
                {/* <Avatar className="h-10 w-10 mr-3 ring-1 ring-offset-1 ring-offset-background">
                  <AvatarImage src="" />
                  <AvatarFallback
                    className={
                      transaction.status === "Received"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                    }
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar> */}
                <div>
                  <p className="font-medium text-sm">
                    {displayName !== "You" ? displayName : "You"}
                  </p>
                  <p className="text-swift-dark-gray text-xs">
                    {transaction.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <span
                  className={`font-medium ${
                    transaction.status === "Received"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {formattedAmount}
                </span>
                <span className="ml-2">
                  {transaction.status === "Received" ? (
                    <ArrowDownLeft className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-red-500" />
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentTransactions;

export const metadata = {
  title: "Recent Transactions",
  description: "A list of recent transactions.",
};
