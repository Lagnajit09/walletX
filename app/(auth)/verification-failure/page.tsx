"use client";

import { XCircle } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const VerificationFailure = () => {
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
          <div className="p-4 rounded-full bg-destructive/10">
            <XCircle className="h-12 w-12 text-destructive" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-swift-purple to-swift-blue bg-clip-text text-transparent">
          Verification Failed
        </h1>
        <p className="text-muted-foreground mb-8">
          We couldn't verify your email. The verification link might have
          expired or is invalid.
        </p>

        <div className="space-y-4">
          <Button
            onClick={() => router.push("/email-confirmation")}
            className="w-full sm:w-auto primary-gradient mr-4"
          >
            Try Again
          </Button>
          <Button
            onClick={() => router.push("/support")}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerificationFailure;
