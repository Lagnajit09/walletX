import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface CheckPinProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  addMoneyHandler: (pinIsValid: boolean) => void;
  buttonText: string;
}

export function CheckPin({
  open,
  setOpen,
  addMoneyHandler,
  buttonText,
}: CheckPinProps) {
  const [newVal, setNewVal] = useState("");
  const session = useSession();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-black">Enter Your Pin:</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="name"
              value={newVal}
              max={4}
              maxLength={4}
              type="password"
              className="col-span-3 text-black"
              onChange={(e) => setNewVal(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              addMoneyHandler(newVal.trim() == session.data?.user?.pin);
              setOpen(false);
            }}
          >
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
