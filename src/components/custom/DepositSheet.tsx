"use client";

import { Button } from "@/src/components/ui/button";
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
import { CreditCard, Plus, ArrowDown, Check } from "lucide-react";
import { banks, cards } from "@/app/lib/banks";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type DepositSheetProps = {
  amount: string;
  setAmount: (amount: string) => void;
  initiateDeposit: (provider: string | undefined) => void;
  hasPin: boolean;
};

const DepositSheet = ({
  amount,
  setAmount,
  initiateDeposit,
  hasPin,
}: DepositSheetProps) => {
  const { toast } = useToast();
  const [selectedBankId, setSelectedBankId] = useState<string>("");
  const [selectedCardId, setSelectedCardId] = useState<string>("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const getSelectedBank = () => {
    return banks.find((bank) => bank.id === selectedBankId);
  };

  const getSelectedCard = () => {
    return cards.find((card) => card.id === selectedCardId);
  };

  const handleButtonClick = () => {
    if (!hasPin) {
      toast({
        title: "Action required",
        description:
          "Please set a PIN in the Settings to proceed with the deposit.",
        variant: "destructive",
      });
      return;
    }

    setIsSheetOpen(true);
  };

  const handleAddMoney = (provider: string | undefined) => {
    // Close the sheet first
    setIsSheetOpen(false);
    // Then initiate the deposit
    initiateDeposit(provider);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button className="gap-2" onClick={handleButtonClick}>
          <ArrowDown className="h-4 w-4" /> Add Money
        </Button>
      </SheetTrigger>
      {hasPin && (
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
                    <Label htmlFor="bank-account">Select Bank Account</Label>
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
                      <span className="absolute left-3 top-1.5 text-muted-foreground">
                        ₹
                      </span>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        className="pl-8"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => handleAddMoney(getSelectedBank()?.name)}
                    disabled={!selectedBankId || !amount || Number(amount) <= 0}
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
                      <span className="absolute left-3 top-1.5 text-muted-foreground">
                        ₹
                      </span>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        className="pl-8"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => handleAddMoney(getSelectedCard()?.name)}
                    disabled={!selectedCardId || !amount || Number(amount) <= 0}
                  >
                    Add Money
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      )}
    </Sheet>
  );
};

export default DepositSheet;
