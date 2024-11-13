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
import { AvatarMenu } from "@/src/components/avatar-menu";

export default async function Layout({ children }: { children: any }) {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex w-full justify-between items-center bg-[#091626] fixed top-0 border-none z-10 h-[8vh]">
        <div className="p-3 text-lg font-bold tracking-widest text-white">
          SwiftPay.
        </div>
        <AvatarMenu name={session.user.name} image={session.user.image || ""} />
      </div>

      {/* Main content area */}
      <div className="flex bg-[#091626] mt-[8vh] flex-grow">
        {/* Sidebar */}
        <div className="w-[12vw] fixed top-[8vh] bottom-0 bg-[#091626] flex flex-col justify-between">
          <div className="flex flex-col">
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

        {/* Main content */}
        <div className="flex-grow ml-[12vw] min-h-[92vh] bg-[#0b2545] rounded-tl-md">
          <div className="p-[2vw] w-full overflow-x-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
