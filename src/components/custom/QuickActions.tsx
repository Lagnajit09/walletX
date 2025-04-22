import React from "react";
import {
  Plus,
  CreditCard,
  Users,
  Repeat,
  ArrowDownToLine,
  Banknote,
} from "lucide-react";
// import { useIsMobile } from "@/hooks/use-mobile";

const QuickActions = () => {
  //   const isMobile = useIsMobile();

  const actions = [
    {
      id: 1,
      icon: <Plus className="h-6 w-6 text-swift-blue" />,
      label: "Add Money",
      delay: "100ms",
    },
    {
      id: 2,
      icon: <CreditCard className="h-6 w-6 text-swift-purple" />,
      label: "Bank Link",
      delay: "200ms",
    },
    {
      id: 3,
      icon: <Users className="h-6 w-6 text-swift-dark-purple" />,
      label: "To Contact",
      delay: "300ms",
    },
    {
      id: 4,
      icon: <Repeat className="h-6 w-6 text-swift-light-purple" />,
      label: "Transfer",
      delay: "400ms",
    },
    {
      id: 5,
      icon: <ArrowDownToLine className="h-6 w-6 text-swift-blue" />,
      label: "Request",
      delay: "500ms",
    },
    {
      id: 6,
      icon: <Banknote className="h-6 w-6 text-swift-purple" />,
      label: "Pay Bills",
      delay: "600ms",
    },
  ];

  return (
    <div className="w-full mt-6">
      <h3 className="font-medium text-lg mb-4">Quick Actions</h3>
      <div
        className={`grid ${"grid-cols-3 md:grid-cols-4 lg:grid-cols-6"} gap-2 md:gap-4`}
      >
        {actions.map((action) => (
          <div
            key={action.id}
            className="flex flex-col items-center justify-center glass rounded-xl p-4 transition-all duration-300 hover:shadow-md hover:bg-white/80 animate-slide-up cursor-pointer"
            style={{ animationDelay: action.delay }}
          >
            <div className="bg-white p-3 rounded-full mb-2 shadow-sm flex items-center justify-center animate-pulse-soft hover:scale-110 transition-transform duration-300">
              {action.icon}
            </div>
            <span className="text-sm text-swift-dark-gray text-center">
              {action.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
