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
  icons: "/logo.svg",
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
