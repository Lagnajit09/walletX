"use client";

import { Button } from "@/src/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { CreditCard, ArrowUp, Check } from "lucide-react";
import { banks } from "@/app/lib/banks";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type WithdrawSheetProps = {
  amount: string;
  balance: number;
  setAmount: (amount: string) => void;
  initiateWithdraw: (provider: string | undefined) => void;
  hasPin: boolean;
};

const WithdrawSheet = ({
  amount,
  balance,
  setAmount,
  initiateWithdraw,
  hasPin,
}: WithdrawSheetProps) => {
  const { toast } = useToast();
  const [selectedBankId, setSelectedBankId] = useState<string>("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const getSelectedBank = () => {
    return banks.find((bank) => bank.id === selectedBankId);
  };

  const handleButtonClick = () => {
    if (!hasPin) {
      toast({
        title: "Action required",
        description: "Please set a PIN to proceed with the withdrawal.",
        variant: "destructive",
      });
      return;
    }

    setIsSheetOpen(true);
  };

  const handleWithdrawMoney = (provider: string | undefined) => {
    // Close the sheet first
    setIsSheetOpen(false);
    // Then initiate the withdrawal
    initiateWithdraw(provider);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2" onClick={handleButtonClick}>
          <ArrowUp className="h-4 w-4" /> Withdraw
        </Button>
      </SheetTrigger>
      {hasPin && (
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Withdraw Money</SheetTitle>
          </SheetHeader>
          <div className="py-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="withdraw-bank-account">Select Bank Account</Label>
              <Select value={selectedBankId} onValueChange={setSelectedBankId}>
                <SelectTrigger id="withdraw-bank-account" className="w-full">
                  <SelectValue placeholder="Select a bank account" />
                </SelectTrigger>
                <SelectContent>
                  {banks.map((bank) => (
                    <SelectItem key={bank.id} value={bank.id}>
                      <div className="flex items-center">
                        <span className="mr-2">{bank.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({bank.accountNo})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {getSelectedBank() && (
                <div className="rounded-lg p-3 bg-muted/50 flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-swift-purple/10 to-swift-blue/10 flex items-center justify-center mr-3">
                      <CreditCard className="h-4 w-4 text-swift-purple" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {getSelectedBank()?.name}
                      </p>
                      <p className="text-swift-dark-gray text-xs">
                        {getSelectedBank()?.accountNo}
                      </p>
                    </div>
                  </div>
                  <Check className="h-5 w-5 text-green-500" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="withdraw-amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1.5 text-muted-foreground">
                  ₹
                </span>
                <Input
                  id="withdraw-amount"
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Available balance: ₹{(balance / 100).toFixed(2)}
              </p>
            </div>
            <Button
              className="w-full"
              onClick={() => handleWithdrawMoney(getSelectedBank()?.name)}
              disabled={
                !selectedBankId ||
                !amount ||
                Number(amount) <= 0 ||
                Number(amount) > balance / 100
              }
            >
              Withdraw Money
            </Button>
          </div>
        </SheetContent>
      )}
    </Sheet>
  );
};

export default WithdrawSheet;
