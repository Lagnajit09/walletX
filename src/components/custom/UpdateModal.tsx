import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { updateProfile } from "../../../app/lib/actions/updateProfile";
import { useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UpdateModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  field: string;
  value: string;
}

export function UpdateModal({ open, setOpen, field, value }: UpdateModalProps) {
  const router = useRouter();
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
              maxLength={field == "Pin" ? 4 : 200}
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
                router.refresh();
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
