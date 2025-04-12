"use client";

import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/src/components/ui/input-otp";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/src/components/ui/drawer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { setPIN } from "@/app/lib/actions/updateProfile";
import { useRouter } from "next/navigation";

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hasPin: boolean;
  existingPin: string;
};

const SetPin = ({ open = false, onOpenChange, hasPin, existingPin }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const [pinValue, setPinValue] = useState("");
  const [confirmPinValue, setConfirmPinValue] = useState("");
  const [newPinValue, setNewPinValue] = useState("");
  const [pinCreated, setPinCreated] = useState(hasPin);
  const [activeTab, setActiveTab] = useState("first");

  const handleCreatePIN = async () => {
    if (pinValue.length === 4 && pinValue === confirmPinValue) {
      try {
        const res = await setPIN(confirmPinValue);
        if (!res.success) {
          throw new Error(res.message);
        }
        toast({
          title: "PIN setup successful",
          description: "Your security PIN has been created.",
        });
        router.refresh();
      } catch (error) {
        console.error(error);
        toast({
          title: "PIN update failed",
          description: "An error occurred while updating your PIN.",
          variant: "destructive",
        });
      } finally {
        setPinCreated(true);
        setActiveTab("first");
        setPinValue("");
        setConfirmPinValue("");
        if (onOpenChange) onOpenChange(false);
      }
    } else {
      toast({
        title: "PIN setup failed",
        description: "PINs don't match or are incomplete.",
        variant: "destructive",
      });
    }
  };

  const handleUpdatePIN = async () => {
    if (newPinValue === existingPin) {
      toast({
        title: "PIN update failed",
        description: "New PIN cannot be the same as the existing PIN.",
        variant: "destructive",
      });
      return;
    }

    if (newPinValue.length === 4 && newPinValue !== existingPin) {
      try {
        const res = await setPIN(newPinValue);
        if (!res.success) {
          throw new Error(res.message);
        }
        toast({
          title: "PIN update successful",
          description: "Your security PIN has been updated.",
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "PIN update failed",
          description: "An error occurred while updating your PIN.",
          variant: "destructive",
        });
      } finally {
        setPinCreated(true);
        setActiveTab("first");
        setPinValue("");
        setNewPinValue("");
        if (onOpenChange) onOpenChange(false);
      }
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (onOpenChange) onOpenChange(isOpen);
  };

  const handleContinueClick = () => {
    if (hasPin) {
      if (existingPin === pinValue) {
        setActiveTab("second");
      } else {
        setActiveTab("first");
        toast({
          title: "PIN verification failed",
          description: "Please enter your existing PIN to continue.",
          variant: "destructive",
        });
        setPinValue("");
        setConfirmPinValue("");
      }
    } else {
      if (pinValue.length === 4) {
        setActiveTab("second");
      } else {
        toast({
          title: "PIN setup failed",
          description: "Please enter a valid 4-digit PIN.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>
            {pinCreated ? "Change Security PIN" : "Set Up Security PIN"}
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="first">
                {pinCreated ? "Current PIN" : "Create PIN"}
              </TabsTrigger>
              <TabsTrigger value="second" disabled={!pinCreated && !pinValue}>
                {pinCreated ? "New PIN" : "Confirm PIN"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="first" className="space-y-4 py-4">
              <div className="space-y-2 text-center">
                <h3 className="font-medium">
                  {pinCreated
                    ? "Enter your current PIN"
                    : "Create a 4-digit security PIN"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {pinCreated
                    ? "Enter your existing PIN to continue"
                    : "This PIN will be used for sensitive operations"}
                </p>
              </div>

              <div className="flex justify-center py-4">
                <div>
                  <InputOTP
                    maxLength={4}
                    value={pinValue}
                    onChange={setPinValue}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              {pinValue.length === 4 && (
                <Button className="w-full" onClick={handleContinueClick}>
                  Continue
                </Button>
              )}
            </TabsContent>

            <TabsContent value="second" className="space-y-4 py-4">
              <div className="space-y-2 text-center">
                <h3 className="font-medium">
                  {pinCreated ? "Enter your new PIN" : "Confirm your PIN"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {pinCreated
                    ? "Create a new 4-digit security PIN"
                    : "Re-enter your PIN to confirm"}
                </p>
              </div>

              <div className="flex justify-center py-4">
                <div>
                  <InputOTP
                    maxLength={4}
                    value={hasPin ? newPinValue : confirmPinValue}
                    onChange={hasPin ? setNewPinValue : setConfirmPinValue}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              {(confirmPinValue.length === 4 || newPinValue.length === 4) && (
                <Button
                  className="w-full"
                  onClick={hasPin ? handleUpdatePIN : handleCreatePIN}
                >
                  {hasPin ? "Update PIN" : "Create PIN"}
                </Button>
              )}
            </TabsContent>
          </Tabs>
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SetPin;
