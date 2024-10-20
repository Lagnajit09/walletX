import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface CheckPinProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  addMoneyHandler: (pinIsValid: boolean) => void;
}

export function CheckPin({ open, setOpen, addMoneyHandler }: CheckPinProps) {
  const [newVal, setNewVal] = useState("0000");
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
            Add Money
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
