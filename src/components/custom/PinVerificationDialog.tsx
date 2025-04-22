"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/src/components/ui/input-otp";
import { Button } from "@/src/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PinVerificationDialogProps {
  userPin: string | null | undefined;
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
}

const PinVerificationDialog = ({
  userPin,
  isOpen,
  onClose,
  onVerify,
}: PinVerificationDialogProps) => {
  const [pinValue, setPinValue] = useState("");
  const { toast } = useToast();

  const handleVerifyPin = () => {
    if (pinValue === userPin) {
      onVerify();
      onClose();
      setPinValue("");
    } else {
      toast({
        title: "Incorrect PIN",
        description: "The PIN you entered is incorrect. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Reset PIN when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setPinValue("");
    }
  }, [isOpen]);

  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enter Security PIN</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            Please enter your 4-digit security PIN to continue
          </p>
          <div className="flex justify-center py-4">
            <InputOTP maxLength={4} value={pinValue} onChange={setPinValue}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleVerifyPin} disabled={pinValue.length !== 4}>
              Verify
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PinVerificationDialog;
