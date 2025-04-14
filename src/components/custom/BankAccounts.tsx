"use client";

import React from "react";
import { CreditCard, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { banks } from "@/app/lib/banks";

const BankAccounts = () => {
  return (
    <div className="w-full mt-6 md:mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Linked Accounts</h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-swift-purple flex items-center"
        >
          <Plus className="h-4 w-4 mr-1" /> Link New
        </Button>
      </div>

      <div className="space-y-3">
        {banks.map((bank) => (
          <div
            key={bank.id}
            className="glass rounded-xl p-4 flex items-center justify-between animate-slide-right transition-all duration-300 hover:shadow-md hover:bg-white/80 cursor-pointer"
            style={{ animationDelay: bank.delay }}
          >
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-swift-purple/10 to-swift-blue/10 flex items-center justify-center mr-3">
                <CreditCard className="h-5 w-5 text-swift-purple" />
              </div>
              <div>
                <p className="font-medium text-sm">{bank.name}</p>
                <p className="text-swift-dark-gray text-xs">{bank.accountNo}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-swift-dark-gray" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankAccounts;
