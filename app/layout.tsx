import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./Providers";
import { LoadingOverlay } from "@/src/components/custom/LoadingOverlay";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <LoadingOverlay />
          {children}
        </Providers>
      </body>
    </html>
  );
}
