"use client";
import { Mail } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { resendVerificationEmail } from "@/app/lib/actions/emailVerification";
import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

const EmailConfirmation = () => {
  const session = useSession();
  const router = useRouter();
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (resendDisabled && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
      setCountdown(30);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resendDisabled, countdown]);

  const handleResendVerificationEmail = async () => {
    if (session.data?.user?.emailVerified) {
      toast({
        title: "Email Already Verified",
        description: "Your email address is already verified.",
      });
      return;
    }

    try {
      setResendDisabled(true);

      const response = await resendVerificationEmail(
        session.data?.user?.name || "",
        session.data?.user?.email || ""
      );

      if (response) {
        toast({
          title: "Verification Email Sent",
          description: "Please check your inbox for the verification email.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send verification email.",
          variant: "destructive",
        });
        // Reset the disabled state if sending fails
        setResendDisabled(false);
        setCountdown(30);
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast({
        title: "Error",
        description: "An error occurred while sending the verification email.",
        variant: "destructive",
      });
      // Reset the disabled state if sending fails
      setResendDisabled(false);
      setCountdown(30);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-swift-purple/10">
            <Mail className="h-12 w-12 text-swift-purple" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-swift-purple to-swift-blue bg-clip-text text-transparent">
          Check Your Email
        </h1>
        <p className="text-muted-foreground mb-4">
          We've sent a confirmation email to your inbox. Please click the link
          in the email to verify your account and continue to the dashboard.
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Didn't receive the email? Check your spam folder or request a new
          verification email.
        </p>

        <div className="space-y-4">
          <Button
            onClick={() => router.push("/signin")}
            variant="outline"
            className="w-full sm:w-auto mr-4"
          >
            Back to Sign In
          </Button>
          <Button
            onClick={handleResendVerificationEmail}
            className="w-full sm:w-auto primary-gradient"
            disabled={resendDisabled}
          >
            {resendDisabled ? `Resend Email (${countdown}s)` : "Resend Email"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;
