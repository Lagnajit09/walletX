import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { ArrowUpRight, ArrowDownLeft, ChevronRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { Transaction } from "@/app/lib/actions/p2pTransfer";
import { redirect } from "next/navigation";

interface RecentTransactionsProps {
  recentTransactions: Transaction[] | string;
}

const RecentTransactions = ({
  recentTransactions,
}: RecentTransactionsProps) => {
  if (typeof recentTransactions === "string") {
    // Handle the case where transactions is a string (error message)
    return redirect("/signin");
  }

  if (recentTransactions.length === 0) {
    return <></>;
  }

  // Helper function to get initials from a name
  const getInitials = (name: string): string => {
    // Return first letter of each word, maximum 2 letters
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="w-full mt-6 md:mt-0">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Recent Transactions</h3>
        <Link href="/transactions">
          <Button variant="ghost" size="sm" className="text-swift-purple">
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {recentTransactions.map((transaction) => {
          // Determine display name - either the other person in the transaction or "You"
          const displayName =
            transaction.status === "Sent"
              ? transaction.toUser
              : transaction.fromUser;

          // Get initials for avatar
          // const initials = getInitials(displayName);

          // Format amount with currency symbol and sign
          const formattedAmount =
            transaction.status === "Received"
              ? `+₹${transaction.amount}`
              : `-₹${transaction.amount}`;

          return (
            <div
              key={transaction.id}
              className="glass rounded-xl p-4 flex items-center justify-between animate-slide-right transition-all duration-300 hover:shadow-md hover:bg-white/80 cursor-pointer"
              style={{ animationDelay: `${transaction.id * 100}ms` }}
            >
              <div className="flex items-center">
                {/* <Avatar className="h-10 w-10 mr-3 ring-1 ring-offset-1 ring-offset-background">
                  <AvatarImage src="" />
                  <AvatarFallback
                    className={
                      transaction.status === "Received"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                    }
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar> */}
                <div>
                  <p className="font-medium text-sm">
                    {displayName !== "You" ? displayName : "You"}
                  </p>
                  <p className="text-swift-dark-gray text-xs">
                    {transaction.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <span
                  className={`font-medium ${
                    transaction.status === "Received"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {formattedAmount}
                </span>
                <span className="ml-2">
                  {transaction.status === "Received" ? (
                    <ArrowDownLeft className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-red-500" />
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentTransactions;

// import React from "react";
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/src/components/ui/avatar";
// import { ArrowUpRight, ArrowDownLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/src/components/ui/button";
// import Link from "next/link";

// const RecentTransactions = () => {
//   const transactions = [
//     {
//       id: 1,
//       name: "Olivia Davis",
//       initials: "OD",
//       type: "received",
//       amount: "+₹450",
//       date: "Today",
//       image: "",
//       delay: "100ms",
//     },
//     {
//       id: 2,
//       name: "Coffee Shop",
//       initials: "CS",
//       type: "sent",
//       amount: "-₹120",
//       date: "Yesterday",
//       image: "",
//       delay: "200ms",
//     },
//     {
//       id: 3,
//       name: "William Chen",
//       initials: "WC",
//       type: "sent",
//       amount: "-₹1,200",
//       date: "Apr 28",
//       image: "",
//       delay: "300ms",
//     },
//   ];

//   return (
//     <div className="w-full mt-6 md:mt-0">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="font-medium text-lg">Recent Transactions</h3>
//         <Link href="/transactions">
//           <Button variant="ghost" size="sm" className="text-swift-purple">
//             View All <ChevronRight className="ml-1 h-4 w-4" />
//           </Button>
//         </Link>
//       </div>

//       <div className="space-y-3">
//         {transactions.map((transaction) => (
//           <div
//             key={transaction.id}
//             className="glass rounded-xl p-4 flex items-center justify-between animate-slide-right transition-all duration-300 hover:shadow-md hover:bg-white/80 cursor-pointer"
//             style={{ animationDelay: transaction.delay }}
//           >
//             <div className="flex items-center">
//               <Avatar className="h-10 w-10 mr-3 ring-1 ring-offset-1 ring-offset-background">
//                 <AvatarImage src={transaction.image} />
//                 <AvatarFallback
//                   className={
//                     transaction.type === "received"
//                       ? "bg-green-100 text-green-600"
//                       : "bg-red-100 text-red-500"
//                   }
//                 >
//                   {transaction.initials}
//                 </AvatarFallback>
//               </Avatar>
//               <div>
//                 <p className="font-medium text-sm">{transaction.name}</p>
//                 <p className="text-swift-dark-gray text-xs">
//                   {transaction.date}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center">
//               <span
//                 className={`font-medium ${
//                   transaction.type === "received"
//                     ? "text-green-500"
//                     : "text-red-500"
//                 }`}
//               >
//                 {transaction.amount}
//               </span>
//               <span className="ml-2">
//                 {transaction.type === "received" ? (
//                   <ArrowDownLeft className="h-4 w-4 text-green-500" />
//                 ) : (
//                   <ArrowUpRight className="h-4 w-4 text-red-500" />
//                 )}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecentTransactions;
