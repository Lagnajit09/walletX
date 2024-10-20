import { Button } from "./button";
import Link from "next/link";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: any;
  onSignout: any;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    <div className="flex justify-between border-b border-gray-700 px-4 fixed w-full bg-[#0b2545]">
      <Link href={"/"}>
        <h1
          className="text-xl font-bold flex flex-col justify-center h-full"
          onClick={() => {}}
        >
          SwiftPay
        </h1>
      </Link>
      <div className="flex flex-col justify-center pt-2">
        <Button
          classname="bg-[#023e8a] text-white"
          onClick={user ? onSignout : onSignin}
        >
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
