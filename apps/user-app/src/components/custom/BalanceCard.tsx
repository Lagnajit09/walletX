import { Card } from "@repo/ui/card";

export const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  return (
    <Card
      title={"Balance"}
      classname="bg-[#023e8a] rounded-lg text-gray-300"
      titleClass="text-white font-semibold"
    >
      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>Unlocked balance</div>
        <div className="text-gray-200 font-semibold">{amount / 100} INR</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>Total Locked Balance</div>
        <div className="text-gray-200 font-semibold">{locked / 100} INR</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>Total Balance</div>
        <div className="text-gray-200 font-semibold">
          {(locked + amount) / 100} INR
        </div>
      </div>
    </Card>
  );
};
