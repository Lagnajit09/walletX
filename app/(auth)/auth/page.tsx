import { Smartphone } from "lucide-react";
import Link from "next/link";
import Footer from "@/src/components/landing-components/footer";
import AuthForm from "@/src/components/auth-form";

export default function AuthPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#091626] text-white">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-[#1c3a5e] sticky top-0 z-50 backdrop-blur-sm bg-[#0b2545]/70">
        <Link className="flex items-center justify-center" href="/">
          <Smartphone className="h-6 w-6 text-[#4A9FF5]" />
          <span className="ml-2 text-2xl font-bold">SwiftPay</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 w-full">
        <AuthForm />
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[#1c3a5e]">
        <Footer />
      </footer>
    </div>
  );
}
