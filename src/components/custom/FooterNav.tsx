import React from "react";
import { Home, Wallet, Send, User, BarChart3 } from "lucide-react";

const FooterNav = () => {
  const navItems = [
    {
      id: "home",
      icon: <Home className="h-5 w-5" />,
      label: "Home",
      active: true,
    },
    {
      id: "wallet",
      icon: <Wallet className="h-5 w-5" />,
      label: "Wallet",
      active: false,
    },
    {
      id: "payments",
      icon: <Send className="h-5 w-5" />,
      label: "Pay",
      active: false,
    },
    {
      id: "activity",
      icon: <BarChart3 className="h-5 w-5" />,
      label: "Activity",
      active: false,
    },
    {
      id: "profile",
      icon: <User className="h-5 w-5" />,
      label: "Profile",
      active: false,
    },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg shadow-lg border-t border-gray-100 px-4 py-2 z-10">
      <div className="max-w-md mx-auto">
        <nav className="flex justify-between">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`flex flex-col items-center px-2 py-1 ${
                item.active ? "text-swift-purple" : "text-swift-dark-gray"
              } transition-colors duration-300`}
            >
              <div
                className={`p-1.5 rounded-full ${
                  item.active ? "bg-swift-purple/10" : ""
                } transition-all duration-300`}
              >
                {item.icon}
              </div>
              <span className="text-xs mt-1">{item.label}</span>
              {item.active && (
                <span className="w-1.5 h-1.5 bg-swift-purple rounded-full mt-1 animate-pulse"></span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default FooterNav;
