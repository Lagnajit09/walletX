import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import React from "react";

type RecentWalletActivityProps = {
  amount: string;
  date: string;
  type: string;
  status: string;
};

const RecentActivities = ({
  amount,
  date,
  type,
  status,
}: RecentWalletActivityProps) => {
  return (
    <div className="rounded-xl p-4 flex items-center justify-between border hover:bg-muted/50">
      <div className="flex items-center">
        {type === "offRamp" ? (
          <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
            <ArrowUpRight className="h-5 w-5 text-red-600" />
          </div>
        ) : (
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
            <ArrowDownLeft className="h-5 w-5 text-green-600" />
          </div>
        )}
        <div>
          {type === "onRamp" ? (
            <p className="font-medium">{`Added to wallet`}</p>
          ) : (
            <p className="font-medium">{`Withdrawn from wallet`}</p>
          )}
          <p className="text-swift-dark-gray text-sm">{date}</p>
        </div>
      </div>

      <p
        className={`font-semibold ${
          type === "onRamp" ? "text-green-600" : "text-red-600"
        }`}
      >
        {amount}
      </p>
    </div>
  );
};

export default RecentActivities;
