"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Wallet } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import PinVerificationDialog from "./PinVerificationDialog";
import { createOnRampTransaction } from "@/app/lib/actions/createOnrampTransaction";
import { createOffRampTransaction } from "@/app/lib/actions/createOffRampTransaction";
import DepositSheet from "./DepositSheet";
import WithdrawSheet from "./WithdrawSheet";
import { useSession } from "next-auth/react";

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
  const session = useSession();
  const { toast } = useToast();

  const [balance, setBalance] = useState(existingBalance);
  const [amount, setAmount] = useState("");
  const [isPinDialogOpen, setIsPinDialogOpen] = useState(false);
  const [pendingTransaction, setPendingTransaction] = useState<{
    type: "deposit" | "withdraw";
    amount: string;
    provider: string | undefined;
  } | null>(null);

  const initiateDeposit = (provider: string | undefined) => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    setPendingTransaction({ type: "deposit", amount, provider });
    setIsPinDialogOpen(true);
  };

  const initiateWithdraw = (provider: string | undefined) => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    if (Number(amount) > balance / 100) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough funds for this withdrawal",
        variant: "destructive",
      });
      return;
    }

    setPendingTransaction({ type: "withdraw", amount, provider });
    setIsPinDialogOpen(true);
  };

  const handleVerifiedTransaction = async () => {
    if (!pendingTransaction) return;

    if (pendingTransaction.provider === undefined) {
      toast({
        title: "Provider required",
        description: "Please select a provider to proceed",
        variant: "destructive",
      });
      return;
    }

    // // For simplicity, we're not passing the provider
    // // In a real implementation, you'd need to get the provider from somewhere
    // const provider = "Bank Account"; // Default provider

    if (pendingTransaction.type === "deposit") {
      try {
        await createOnRampTransaction(
          pendingTransaction.provider,
          Number(pendingTransaction.amount)
        );
        setBalance((prev) => prev + Number(pendingTransaction.amount) * 100);
        toast({
          title: "Deposit successful",
          description: `₹${Number(pendingTransaction.amount).toFixed(
            2
          )} has been added to your wallet`,
        });
      } catch (error) {
        console.error("Error creating on-ramp transaction:", error);
        toast({
          title: "Deposit failed",
          description: "There was an error processing your deposit",
          variant: "destructive",
        });
      }
    } else {
      try {
        await createOffRampTransaction(
          pendingTransaction.provider,
          Number(pendingTransaction.amount)
        );
        setBalance((prev) => prev - Number(pendingTransaction.amount) * 100);
        toast({
          title: "Withdrawal successful",
          description: `₹${Number(pendingTransaction.amount).toFixed(
            2
          )} has been withdrawn from your wallet`,
        });
      } catch (error) {
        console.error("Error creating off-ramp transaction:", error);
        toast({
          title: "Withdrawal failed",
          description: "There was an error processing your withdrawal",
          variant: "destructive",
        });
      }
    }

    setAmount("");
    setPendingTransaction(null);
  };

  const handleCloseDialog = () => {
    setIsPinDialogOpen(false);
    setPendingTransaction(null);
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
          <h2 className="text-4xl font-bold mb-2">
            ₹ {formatNumber(balance / 100)}
          </h2>
          <p className="text-muted-foreground mb-2">Available Balance</p>
          <p className="text-muted-foreground mb-6 text-sm">
            Wallet-ID: {session.data?.user?.walletID}
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <DepositSheet
              hasPin={session.data?.user?.pin ? true : false}
              amount={amount}
              setAmount={setAmount}
              initiateDeposit={initiateDeposit}
            />

            <WithdrawSheet
              hasPin={session.data?.user?.pin ? true : false}
              amount={amount}
              balance={balance}
              setAmount={setAmount}
              initiateWithdraw={initiateWithdraw}
            />
          </div>
        </div>
      </CardContent>

      {/* PIN Verification Dialog */}
      <PinVerificationDialog
        userPin={session.data?.user?.pin}
        isOpen={isPinDialogOpen}
        onClose={handleCloseDialog}
        onVerify={handleVerifiedTransaction}
      />
    </Card>
  );
};

export default WalletCard;
