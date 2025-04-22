import React from "react";
import { ArrowUpRight, ArrowDownLeft, Wallet, BarChart3 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  function formatNumber(number: number) {
    return number.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (
    <div className="w-full glass rounded-2xl p-6 relative overflow-hidden animate-slide-up transition-all duration-300 hover:shadow-lg hover:shadow-swift-purple/10">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-swift-purple/20 to-swift-blue/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-swift-purple/10 to-swift-blue/5 rounded-full blur-3xl -ml-20 -mb-20"></div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-swift-purple/10 p-2 rounded-full mr-3">
            <Wallet className="h-5 w-5 text-swift-purple" />
          </div>
          <h2 className="text-swift-dark-gray text-sm font-medium">
            Your Balance
          </h2>
        </div>

        <Link href={"/analytics"}>
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex items-center gap-1 text-swift-dark-gray"
          >
            <BarChart3 className="h-4 w-4" /> View Analytics
          </Button>
        </Link>
      </div>

      <div className="flex items-end gap-2 mb-6">
        <span className="text-3xl md:text-4xl font-bold">
          ₹ {formatNumber(amount / 100)}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Link href={"/wallet"}>
          <Button className="flex-1 bg-swift-purple hover:bg-swift-dark-purple flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-swift-purple/20">
            <Wallet className="h-6 w-6 text-white" /> Wallet
          </Button>
        </Link>
        <Link href={"/transfer"}>
          <Button
            variant="outline"
            className="flex-1 border-swift-purple text-swift-purple hover:text-swift-dark-purple hover:border-swift-dark-purple flex items-center justify-center gap-2 transition-all duration-300"
          >
            <ArrowUpRight className="h-4 w-4" /> Send
          </Button>
        </Link>
      </div>
    </div>
  );
};
