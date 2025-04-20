"use client";

import { CheckCircle } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const VerificationSuccess = () => {
  const router = useRouter();
  const session = useSession();

  if (session.data?.user?.emailVerified) {
    // If the user is already verified, redirect them to the dashboard or home page
    router.push("/dashboard");
    return null; // Prevent rendering this component
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <div className="absolute -z-10 w-72 h-72 rounded-full bg-swift-purple/10 blur-3xl top-10 right-10"></div>
      <div className="absolute -z-10 w-96 h-96 rounded-full bg-swift-blue/10 blur-3xl -bottom-20 -left-20"></div>

      <div className="text-center max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-green-100">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-swift-purple to-swift-blue bg-clip-text text-transparent">
          Email Verified Successfully!
        </h1>
        <p className="text-muted-foreground mb-8">
          Your email has been successfully verified. You can now access all
          features of SwiftPay.
        </p>

        <Button
          onClick={() => router.push("/dashboard")}
          className="w-full sm:w-auto primary-gradient"
        >
          Continue to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default VerificationSuccess;
