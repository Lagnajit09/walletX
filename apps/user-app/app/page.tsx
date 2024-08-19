import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";
import Image from "next/image";
import landingpage from "../public/landingpage.jpg";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex justify-around">
      <div className="flex flex-col justify-center h-[90vh] px-10 gap-2">
        <p className="text-8xl"> Fast, safe</p>
        <p className="text-8xl">social payment</p>
        <div className=" mt-5">
          <p className="text-lg">Pay, get paid, grow a business, and more</p>
          <p className="text-lg">
            Join the tens of mill ions of people on WalletX
          </p>
        </div>
        <div className="mt-4 border-1 bg-[rgb(96,165,250)] p-2 rounded-lg text-white text-center">
          <button> Get WalletX</button>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <Image
          src={landingpage}
          alt="landingimage.png"
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
