"use client";

import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import SetPin from "./SetPin";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

type PinSetupButtonProps = {};

const PinSetupButton = ({}: PinSetupButtonProps) => {
  const session = useSession();
  const [isPinSetupOpen, setIsPinSetupOpen] = useState(false);

  const handlePinSetUpOpenChange = (open: boolean) => {
    if (session.data?.user?.emailVerified) {
      setIsPinSetupOpen(open);
    } else {
      toast({
        title: "Email Verification Required",
        description: "Please verify your email before setting up a PIN.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => handlePinSetUpOpenChange(true)}
        size="sm"
      >
        {session.data?.user?.pin ? "Change" : "Set up"}
      </Button>
      <SetPin
        open={isPinSetupOpen}
        onOpenChange={setIsPinSetupOpen}
        hasPin={session.data?.user?.pin ? true : false}
        existingPin={session.data?.user?.pin || ""}
      />
    </>
  );
};

export default PinSetupButton;
