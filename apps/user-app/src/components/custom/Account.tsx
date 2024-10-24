import { HDFCLogoIcon } from "@/constants/Icons";
import { Card } from "@repo/ui/card";
import React from "react";

const Account = () => {
  return (
    <Card
      title={"HDFC Bank"}
      classname="bg-[#39708e] rounded-lg text-gray-300 w-[45%]"
      titleClass="text-white font-semibold"
    >
      <HDFCLogoIcon />

      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>Acount Number: </div>
        <div className="text-gray-200 font-semibold tracking-widest">
          •••••••• 4785
        </div>
      </div>
      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>IFSC Code: </div>
        <div className="text-gray-200 font-semibold">ABC8125L</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>Balance: </div>
        <div className="text-gray-200 font-semibold">50000 INR</div>
      </div>
    </Card>
  );
};

export default Account;
