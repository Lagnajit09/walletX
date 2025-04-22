import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import MainHeader from "@/src/components/custom/MainHeader";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SwiftPay",
  description: "Seamless, secure, and swift payments for everyday transactions",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  authors: [
    {
      name: "Lagnajit Moharana",
      url: "https://lagnajitmoharana08.web.app/",
    },
  ],
  creator: "Lagnajit Moharana",
  publisher: "Vercel",
  keywords: [
    "SwiftPay",
    "Wallet",
    "Payments",
    "Transactions",
    "E-commerce",
    "Fintech",
    "Secure Payments",
    "Digital Wallet",
    "Payment Gateway",
    "Online Payments",
    "Swift Transactions",
  ],
  twitter: {
    card: "summary_large_image",
    site: "@m_lagnajit09",
    title: "SwiftPay",
    creator: "@m_lagnajit09",
    images:
      "https://res.cloudinary.com/dp4cwxvld/image/upload/v1745352414/SwiftPay-share_lp0zda.png",
  },
  openGraph: {
    title: "SwiftPay",
    description:
      "Seamless, secure, and swift payments for everyday transactions",
    url: "https://swiftpaylm.vercel.app",
    siteName: "SwiftPay",
    images: [
      {
        url: "https://res.cloudinary.com/dp4cwxvld/image/upload/v1745352414/SwiftPay-share_lp0zda.png",
        width: 1200,
        height: 630,
        alt: "SwiftPay Landing Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function Layout({ children }: { children: any }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-md md:max-w-6xl px-6">
        <MainHeader />
        <div>{children}</div>
      </div>
    </div>
  );
}
