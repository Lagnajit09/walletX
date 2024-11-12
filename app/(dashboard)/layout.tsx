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

export default async function Layout({ children }: { children: any }) {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex">
      <div className="flex flex-col justify-between w-[15vw] max-h-[90vh] fixed border-r-2 border-slate-700 min-h-[92vh] mr-4 pt-5">
        <div>
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
        <div className="border-t bg-blue-950 border-gray-800">
          <SidebarItem
            href={"/profile"}
            icon={<ProfileIcon />}
            title={session.user.name}
          />
        </div>
      </div>
      <div className="ml-[17vw] w-[80vw]">{children}</div>
    </div>
  );
}
