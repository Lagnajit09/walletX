import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from "../../../app/lib/actions/updateProfile";
import { useState } from "react";
import { getSession } from "next-auth/react";

interface UpdateModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  field: string;
  value: string;
}

export function UpdateModal({ open, setOpen, field, value }: UpdateModalProps) {
  const [newVal, setNewVal] = useState(value);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-gray-800">Edit profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-gray-800">
              {field}
            </Label>
            <Input
              id="name"
              value={newVal}
              type={field == "Pin" ? "password" : "text"}
              className="col-span-3 text-black"
              onChange={(e) => setNewVal(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={async () => {
              try {
                await updateProfile(field.toLowerCase(), newVal.trim());
                await getSession();
                window.location.reload();
                setOpen(false);
              } catch (error) {
                console.error("Failed to update profile", error);
              }
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
