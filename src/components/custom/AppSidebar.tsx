"use client";

import React from "react";
import {
  Home,
  Wallet,
  Send,
  User,
  Settings,
  BarChart3,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarLink = ({ to, icon, label, isActive }: SidebarLinkProps) => (
  <Link
    href={to}
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
      isActive
        ? "bg-swift-purple/10 text-swift-purple font-medium"
        : "text-swift-dark-gray hover:bg-swift-purple/5 hover:text-swift-purple"
    )}
  >
    <div
      className={cn("p-1.5 rounded-full", isActive ? "bg-swift-purple/10" : "")}
    >
      {icon}
    </div>
    <span>{label}</span>
    {isActive && (
      <span className="ml-auto w-1.5 h-1.5 bg-swift-purple rounded-full animate-pulse"></span>
    )}
  </Link>
);

const AppSidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const location = usePathname();

  const links = [
    { to: "/", icon: <Home className="h-5 w-5" />, label: "Home" },
    { to: "/wallet", icon: <Wallet className="h-5 w-5" />, label: "Wallet" },
    {
      to: "/transactions",
      icon: <BarChart3 className="h-5 w-5" />,
      label: "Transactions",
    },
    { to: "/transfer", icon: <Send className="h-5 w-5" />, label: "Transfer" },
    { to: "/profile", icon: <User className="h-5 w-5" />, label: "Profile" },
    {
      to: "/settings",
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
    },
  ];

  const overlayClasses = cn(
    "fixed inset-0 bg-black transition-opacity z-30",
    isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
  );

  const sidebarClasses = cn(
    "fixed top-0 left-0 h-full z-40 bg-white shadow-xl transition-transform transform w-64",
    isOpen ? "translate-x-0" : "-translate-x-full"
  );

  return (
    <>
      <div className={overlayClasses} onClick={onClose} />
      <aside className={sidebarClasses}>
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-swift-purple to-swift-blue flex items-center justify-center">
              <span className="text-white font-bold">SP</span>
            </div>
            <h2 className="font-bold text-lg">SwiftPay</h2>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <SidebarLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              isActive={location === link.to}
            />
          ))}
        </nav>

        <div
          className="p-4 mt-auto border-t"
          onClick={async () => {
            await signOut({
              callbackUrl: "/signin",
            });
          }}
        >
          <Link
            href="/signin"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign out</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;
