"use client";
import React from "react";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { resendVerificationEmail } from "@/app/lib/actions/emailVerification";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type VerifyEmailButton = {
  isEmailVerified: boolean;
};

const VerifyEmailButton = ({ isEmailVerified }: VerifyEmailButton) => {
  const session = useSession();
  const router = useRouter();

  const handleResendVerificationEmail = async () => {
    if (session.data?.user?.emailVerified) {
      toast({
        title: "Email Already Verified",
        description: "Your email address is already verified.",
      });
      return;
    }
    try {
      const response = await resendVerificationEmail(
        session.data?.user?.name || "",
        session.data?.user?.email || ""
      );
      if (response) {
        toast({
          title: "Verification Email Sent",
          description: "Please check your inbox for the verification email.",
        });
        router.push("/email-confirmation");
      } else {
        toast({
          title: "Error",
          description: "Failed to send verification email.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast({
        title: "Error",
        description: "An error occurred while sending the verification email.",
        variant: "destructive",
      });
    }
  };
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isEmailVerified}
      onClick={handleResendVerificationEmail}
    >
      {isEmailVerified ? "Verified" : "Verify"}
    </Button>
  );
};

export default VerifyEmailButton;
