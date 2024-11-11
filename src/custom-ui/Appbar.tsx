import { Button } from "./button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
}

const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  const pathname = usePathname();
  const [isAuthPage, setIsAuthPage] = useState(false);

  // useEffect to update `isAuthPage` based on the current path
  useEffect(() => {
    const authRoutes = ["/signin", "/signup"];
    setIsAuthPage(authRoutes.includes(pathname || ""));
  }, [pathname]);

  return (
    <div
      className={`flex justify-between border-b border-gray-700 px-4 ${
        !isAuthPage ? "fixed" : ""
      } w-full bg-[#0b2545]`}
    >
      <Link href="/">
        <h1 className="text-xl font-bold flex flex-col justify-center h-full">
          SwiftPay
        </h1>
      </Link>
      <div className="flex flex-col justify-center pt-2">
        <Button
          classname="bg-[#4A9FF5] text-white"
          onClick={user ? onSignout : onSignin}
        >
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};

// Export directly since we don't need the wrapper anymore
export default Appbar;
