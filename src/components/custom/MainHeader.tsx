"use client";
import React, { useState } from "react";
import { Menu, Bell, Zap, Loader } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import AppSidebar from "./AppSidebar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const MainHeader = () => {
  const session = useSession();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          <div className="flex items-center">
            <div className="mr-2 flex items-center justify-center bg-gradient-to-r from-swift-purple to-swift-blue rounded-full h-8 w-8">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-bold">SwiftPay</h1>
          </div>
        </div>

        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2">
            <Bell className="h-5 w-5" />
          </Button>

          <Avatar className="border-2 border-x-swift-purple">
            <AvatarImage src="https://random.jpeg" />
            {session.status === "loading" && (
              <AvatarFallback>
                <Loader />
              </AvatarFallback>
            )}
            {session.status === "unauthenticated" && redirect("/signin")}
            {session.status === "authenticated" && session.data?.user?.name && (
              <AvatarFallback>
                {session.data?.user?.name[0].toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      </div>

      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </header>
  );
};

export default MainHeader;
