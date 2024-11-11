import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Lock, Unlock } from "lucide-react";

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
    <Card className="bg-[#1e3a5f] border-none text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#4a9ff5]">
          Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-yellow-400" />
              <span className="text-sm text-gray-300">Locked Balance</span>
            </div>
            <span className="text-lg font-medium">
              ₹ {formatNumber(locked / 100)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Unlock className="h-5 w-5 text-green-400" />
              <span className="text-sm text-gray-300">Unlocked Balance</span>
            </div>
            <span className="text-lg font-medium">
              ₹ {formatNumber(amount / 100)}
            </span>
          </div>
          <div className="pt-4 border-t border-gray-600">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-300">
                Total Balance
              </span>
              <span className="text-2xl font-bold text-[#4a9ff5]">
                ₹ {formatNumber((locked + amount) / 100)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
