"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/src/components/ui/menubar";
import { LogOut, Settings } from "lucide-react";
import { Button } from "../ui/button";

interface AvatarMenuProps {
  name: string;
  image?: string;
}

export const AvatarMenu = ({ name, image }: AvatarMenuProps) => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/signin" });
  };

  return (
    <Menubar className="bg-[#091626] border-none m-3 mr-5">
      <MenubarMenu>
        <MenubarTrigger className="bg-[#a1c3ed] p-[2px] rounded-full w-fit">
          <Avatar className="cursor-pointer">
            <AvatarImage src={image} />
            <AvatarFallback className="bg-gray-700 text-white">
              {name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </MenubarTrigger>
        <MenubarContent className="bg-[#091626] border-none text-white rounded-md shadow-lg">
          <Link
            href="/profile"
            className="block px-4 py-2 hover:bg-gray-800 flex gap-2"
          >
            <Settings />
            Settings
          </Link>
          <Button
            className="block w-full justify-start px-4 py-2 hover:bg-gray-800 flex gap-2 cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut />
            Log Out
          </Button>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
