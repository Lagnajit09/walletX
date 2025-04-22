"use client";

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import PinVerificationDialog from "@/src/components/custom/PinVerificationDialog";
import { useSession } from "next-auth/react";

interface PinDialogProps {
  children: React.ReactNode;
}

const PinDialog = ({ children }: PinDialogProps) => {
  const session = useSession();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const onVerify = () => {
    setOpen(false);
    toast({
      title: "Verification Successful",
      description: "You can now view your full card details.",
    });
  };

  // Clone the child element with our open handler
  const triggerElement = React.cloneElement(
    React.Children.only(children) as React.ReactElement,
    {
      onClick: () => setOpen(true),
    }
  );

  return (
    <>
      {triggerElement}

      <PinVerificationDialog
        userPin={session.data?.user?.pin}
        isOpen={open}
        onClose={() => setOpen(false)}
        onVerify={onVerify}
      />
    </>
  );
};

export default PinDialog;
