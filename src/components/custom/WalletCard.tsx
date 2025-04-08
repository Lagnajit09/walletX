"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  CreditCard,
  Plus,
  Wallet,
  ArrowDown,
  ArrowUp,
  Check,
} from "lucide-react";
import { banks, cards } from "@/app/lib/banks";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type WalletCardProps = {
  existingBalance: number;
  locked: number;
};

function formatNumber(number: number) {
  return number.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const WalletCard = ({ existingBalance, locked }: WalletCardProps) => {
  const { toast } = useToast();

  const [balance, setBalance] = useState(existingBalance);
  const [amount, setAmount] = useState("");
  const [selectedBankId, setSelectedBankId] = useState<string>("");
  const [selectedCardId, setSelectedCardId] = useState<string>("");
  const [isPinDialogOpen, setIsPinDialogOpen] = useState(false);
  const [pendingTransaction, setPendingTransaction] = useState<{
    type: "deposit" | "withdraw";
    amount: string;
  } | null>(null);

  const initiateDeposit = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    setPendingTransaction({ type: "deposit", amount });
    setIsPinDialogOpen(true);
  };

  const initiateWithdraw = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    if (Number(amount) > balance) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough funds for this withdrawal",
        variant: "destructive",
      });
      return;
    }

    setPendingTransaction({ type: "withdraw", amount });
    setIsPinDialogOpen(true);
  };

  const handleVerifiedTransaction = () => {
    if (!pendingTransaction) return;

    if (pendingTransaction.type === "deposit") {
      setBalance((prev) => prev + Number(pendingTransaction.amount));
      toast({
        title: "Deposit successful",
        description: `$${Number(pendingTransaction.amount).toFixed(
          2
        )} has been added to your wallet`,
      });
    } else {
      setBalance((prev) => prev - Number(pendingTransaction.amount));
      toast({
        title: "Withdrawal successful",
        description: `$${Number(pendingTransaction.amount).toFixed(
          2
        )} has been withdrawn from your wallet`,
      });
    }

    setAmount("");
    setPendingTransaction(null);
  };

  const handleCloseDialog = () => {
    setIsPinDialogOpen(false);
    setPendingTransaction(null);
  };

  const getSelectedBank = () => {
    return banks.find((bank) => bank.id === selectedBankId);
  };

  const getSelectedCard = () => {
    return cards.find((card) => card.id === selectedCardId);
  };

  return (
    <Card className="lg:col-span-2 animate-fade-in">
      <CardHeader>
        <CardTitle>Wallet Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-swift-purple to-swift-blue flex items-center justify-center mb-4">
            <Wallet className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-2">₹ {formatNumber(balance)}</h2>
          <p className="text-muted-foreground mb-6">Available Balance</p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="gap-2">
                  <ArrowDown className="h-4 w-4" /> Add Money
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Add Money to Wallet</SheetTitle>
                </SheetHeader>
                <div className="py-6">
                  <Tabs defaultValue="bank">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="bank">Bank Account</TabsTrigger>
                      <TabsTrigger value="card">Debit/Credit Card</TabsTrigger>
                    </TabsList>

                    <TabsContent value="bank" className="space-y-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="bank-account">
                            Select Bank Account
                          </Label>
                          <Select
                            value={selectedBankId}
                            onValueChange={setSelectedBankId}
                          >
                            <SelectTrigger id="bank-account" className="w-full">
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
                          <Label htmlFor="amount">Amount</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5 text-muted-foreground">
                              $
                            </span>
                            <Input
                              id="amount"
                              type="number"
                              placeholder="0.00"
                              className="pl-8"
                              value={amount}
                              onChange={(e: any) => setAmount(e.target.value)}
                            />
                          </div>
                        </div>
                        <Button
                          className="w-full"
                          onClick={initiateDeposit}
                          disabled={
                            !selectedBankId || !amount || Number(amount) <= 0
                          }
                        >
                          Add Money
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="card" className="space-y-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="card">Select Card</Label>
                          <Select
                            value={selectedCardId}
                            onValueChange={setSelectedCardId}
                          >
                            <SelectTrigger id="card" className="w-full">
                              <SelectValue placeholder="Select a card" />
                            </SelectTrigger>
                            <SelectContent>
                              {cards.map((card) => (
                                <SelectItem key={card.id} value={card.id}>
                                  <div className="flex items-center">
                                    <span className="mr-2">{card.type}</span>
                                    <span className="text-xs text-muted-foreground">
                                      (•••• {card.last4})
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {getSelectedCard() && (
                            <div className="rounded-lg p-3 bg-muted/50 flex items-center justify-between mt-2">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-swift-purple/10 to-swift-blue/10 flex items-center justify-center mr-3">
                                  <CreditCard className="h-4 w-4 text-swift-purple" />
                                </div>
                                <div>
                                  <p className="font-medium text-sm">
                                    {getSelectedCard()?.type} ••••{" "}
                                    {getSelectedCard()?.last4}
                                  </p>
                                  <p className="text-swift-dark-gray text-xs">
                                    Expires {getSelectedCard()?.expiry}
                                  </p>
                                </div>
                              </div>
                              <Check className="h-5 w-5 text-green-500" />
                            </div>
                          )}
                          <Button
                            variant="outline"
                            className="w-full mt-2 flex items-center gap-2"
                          >
                            <Plus className="h-4 w-4" /> Add New Card
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="amount">Amount</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5 text-muted-foreground">
                              $
                            </span>
                            <Input
                              id="amount"
                              type="number"
                              placeholder="0.00"
                              className="pl-8"
                              value={amount}
                              onChange={(e: any) => setAmount(e.target.value)}
                            />
                          </div>
                        </div>
                        <Button
                          className="w-full"
                          onClick={initiateDeposit}
                          disabled={
                            !selectedCardId || !amount || Number(amount) <= 0
                          }
                        >
                          Add Money
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <ArrowUp className="h-4 w-4" /> Withdraw
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Withdraw Money</SheetTitle>
                </SheetHeader>
                <div className="py-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="withdraw-bank-account">
                      Select Bank Account
                    </Label>
                    <Select
                      value={selectedBankId}
                      onValueChange={setSelectedBankId}
                    >
                      <SelectTrigger
                        id="withdraw-bank-account"
                        className="w-full"
                      >
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
                      <span className="absolute left-3 top-2.5 text-muted-foreground">
                        $
                      </span>
                      <Input
                        id="withdraw-amount"
                        type="number"
                        placeholder="0.00"
                        className="pl-8"
                        value={amount}
                        onChange={(e: any) => setAmount(e.target.value)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Available balance: ${balance.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    className="w-full"
                    onClick={initiateWithdraw}
                    disabled={
                      !selectedBankId ||
                      !amount ||
                      Number(amount) <= 0 ||
                      Number(amount) > balance
                    }
                  >
                    Withdraw Money
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
