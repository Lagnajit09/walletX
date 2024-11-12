import Features from "@/src/components/landing-components/features";
import Example from "@/src/components/landing-components/example";
import FAQ from "@/src/components/landing-components/faq";
import Hero from "@/src/components/landing-components/hero";
import Footer from "@/src/components/landing-components/footer";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col w-full items-center min-h-screen bg-gradient-to-br from-[#0b2545] to-[#13315c] text-white">
      <main className="flex-1 w-full">
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          <Hero user={session?.user} />
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#0d2d54]">
          <Features />
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#0b2545]">
          <Example />
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#0d2d54]">
          <FAQ />
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[#1c3a5e]">
        <Footer />
      </footer>
    </div>
  );
}
