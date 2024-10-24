import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AccountProps {
  title: string;
  acc_num: string;
  ifsc: string;
  balance: string;
  icon: React.ReactNode;
}
export default function AccountCard({
  title,
  acc_num,
  ifsc,
  balance,
  icon,
}: AccountProps) {
  return (
    <Card className="bg-[#1e3a5f] border-none text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-8 w-8 text-[#4a9ff5]"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <path d="M2 10h20" />
        </svg>
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
