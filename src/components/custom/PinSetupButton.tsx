"use client";

import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import SetPin from "./SetPin";

type PinSetupButtonProps = {
  hasExistingPin: boolean;
  pin: string;
};

const PinSetupButton = ({ hasExistingPin, pin }: PinSetupButtonProps) => {
  const [isPinSetupOpen, setIsPinSetupOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsPinSetupOpen(true)}
        size="sm"
      >
        {hasExistingPin ? "Change" : "Set up"}
      </Button>
      <SetPin
        open={isPinSetupOpen}
        onOpenChange={setIsPinSetupOpen}
        hasPin={hasExistingPin}
        existingPin={pin}
      />
    </>
  );
};

export default PinSetupButton;
