import { BrowserRouter } from "react-router-dom";
import { Button } from "./button";
import Link from "next/link";
import { useEffect, useState } from "react";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: any;
  onSignout: any;
  path: string;
}

const Appbar = ({ user, onSignin, onSignout, path }: AppbarProps) => {
  const [isAuthPage, setIsAuthPage] = useState(false);

  // useEffect to update `isAuthPage` based on the current location
  useEffect(() => {
    const authRoutes = ["/signin", "/signup"];
    setIsAuthPage(authRoutes.includes(path));
  }, [path]); // Run this effect whenever `location.pathname` changes

  return (
    <div
      className={`flex justify-between border-b border-gray-700 px-4 ${!isAuthPage ? "fixed" : ""} w-full bg-[#0b2545]`}
    >
      <Link href={"/"}>
        <h1 className="text-xl font-bold flex flex-col justify-center h-full">
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

export default ({ user, onSignin, onSignout, path }: AppbarProps) => (
  <BrowserRouter>
    <Appbar onSignin={onSignin} onSignout={onSignout} user={user} path={path} />
  </BrowserRouter>
);
