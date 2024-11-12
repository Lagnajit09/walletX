import { Button } from "./button";
import Link from "next/link";
import { Smartphone } from "lucide-react";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
}

const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b border-[#1c3a5e] sticky top-0 z-50 backdrop-blur-sm bg-[#0b2545]/70 w-full">
      <Link className="flex items-center justify-center" href="/">
        <Smartphone className="h-6 w-6 text-[#4A9FF5]" />
        <span className="ml-2 text-2xl font-bold">SwiftPay</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link
          className="text-sm font-medium hover:text-white transition-colors border border-[#4A9FF5] p-2 rounded-md hover:bg-[#4A9FF5]"
          href="/dashboard"
        >
          Dashboard
        </Link>
        <div className="flex flex-col justify-center pt-2">
          <Button
            classname="bg-[#4A9FF5] text-white"
            onClick={user ? onSignout : onSignin}
          >
            {user ? "Logout" : "Login"}
          </Button>
        </div>
      </nav>
    </header>
  );
};

// Export directly since we don't need the wrapper anymore
export default Appbar;
