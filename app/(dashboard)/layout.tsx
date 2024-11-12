import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { SidebarItem } from "../../src/components/custom/SidebarItem";
import {
  HomeIcon,
  P2PTransferIcon,
  ProfileIcon,
  TransactionsIcon,
  TransferIcon,
} from "@/src/components/constants/Icons";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";

export default async function Layout({ children }: { children: any }) {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex bg-[#091626]">
      <div className="flex flex-col justify-between w-[12vw] fixed bottom-0 min-h-[100vh]">
        <div className="">
          <div className=" p-5 text-lg font-bold tracking-widest">
            SwiftPay.
          </div>
          <SidebarItem href={"/dashboard"} icon={<HomeIcon />} title="Home" />
          <SidebarItem
            href={"/wallet"}
            icon={<TransferIcon />}
            title="Wallet"
          />
          <SidebarItem
            href={"/transactions"}
            icon={<TransactionsIcon />}
            title="Transactions"
          />
          <SidebarItem
            href={"/p2p"}
            icon={<P2PTransferIcon />}
            title="P2P Transfer"
          />
        </div>
        <div className="border-t bg-gray-900 border-gray-800">
          <SidebarItem
            href={"/profile"}
            icon={<ProfileIcon />}
            title={session.user.name}
          />
        </div>
      </div>
      <div className="w-full flex flex-col ml-[12vw] items-end">
        <Avatar className="m-2 mr-5 flex">
          <AvatarImage src="www.abc.png" />
          <AvatarFallback className="bg-gray-700">
            {session.user.name[0]}
          </AvatarFallback>
        </Avatar>
        <div className="px-[2vw] w-full rounded-tl-md bg-[#0b2545]">
          {children}
        </div>
      </div>
    </div>
  );
}
