import React from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { redirect } from "next/navigation";
import Link from "next/link";

const TermsAndPrivacy = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 py-10 px-4">
      <div className="w-full max-w-2xl bg-white/80 rounded-lg shadow-lg glass p-8 relative">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-swift-purple/10 rounded-full p-4 mb-4">
            <BookOpen className="h-10 w-10 text-swift-purple" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-swift-purple to-swift-blue bg-clip-text text-transparent mb-1">
            Terms of Service & Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm">
            Please read carefully before using SwiftPay
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-swift-purple">
            Terms of Service
          </h2>
          <p className="text-sm mb-3">
            By using SwiftPay, you agree to be bound by these Terms of Service.
            You must be at least 18 years old or have parental consent to use
            SwiftPay. Users are responsible for maintaining the confidentiality
            of their accounts and for any activity that occurs under their
            account.
          </p>
          <p className="text-sm mb-3">
            SwiftPay may modify or update these Terms at any time. Your
            continued use of the service constitutes acceptance of any changes.
            Do not misuse the app or attempt to access it using automated means.
          </p>
          <p className="text-sm">
            For more details, contact support at support@swiftpay.com.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-swift-blue">
            Privacy Policy
          </h2>
          <p className="text-sm mb-3">
            SwiftPay values your privacy and takes necessary steps to protect
            your personal information. We may collect your email, name, and
            device information to provide our services. Your data is not shared
            with third parties except where required by law.
          </p>
          <p className="text-sm mb-3">
            All sensitive data is encrypted and securely stored. You have the
            right to request, edit, or delete your personal data. Cookies may be
            used to improve your experience.
          </p>
          <p className="text-sm">
            For privacy questions, contact privacy@swiftpay.com.
          </p>
        </section>

        <Link href={"/signup"} className="text-swift-purple mb-4">
          <Button variant="outline" className="mt-4 w-full sm:w-auto">
            Back
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TermsAndPrivacy;
