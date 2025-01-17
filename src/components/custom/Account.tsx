import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { AccountCardIcon } from "../constants/Icons";

interface AccountProps {
  title: string;
  acc_num: string;
  ifsc: string;
  balance: string;
}
export default function AccountCard({
  title,
  acc_num,
  ifsc,
  balance,
}: AccountProps) {
  return (
    <Card className="w-[95%] md:w-[50%] bg-[#1e3a5f] border-none text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <AccountCardIcon />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Account Number</p>
            <p className="text-lg font-medium">{acc_num}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-400">IFSC Code</p>
            <p className="text-lg font-medium">{ifsc}</p>
          </div>
          <div className="col-span-2 space-y-1">
            <p className="text-sm text-gray-400">Balance</p>
            <p className="text-2xl font-bold text-[#4a9ff5]">{balance}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
