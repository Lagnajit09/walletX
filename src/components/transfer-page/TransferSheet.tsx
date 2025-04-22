"use client";

import {
  QrCode,
  UserPlus,
  CreditCard,
  Link2,
  UserPlus2,
  Wallet2,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/src/components/ui/sheet";
import { TransferSheetProps } from "@/types/contact";
import TransactionLoader from "@/src/components/custom/TransactionLoader";

export default function TransferSheet({
  isOpen,
  onOpenChange,
  selectedContact,
  transferMethod,
  transferAmount,
  setTransferAmount,
  transferNote,
  setTransferNote,
  transferWallet,
  setTransferWallet,
  onInitiateTransfer,
  onAddContact,
  setNewContactData,
  onDeleteContact,
  isProcessing,
}: TransferSheetProps) {
  const getMethodIcon = () => {
    switch (transferMethod) {
      case "Scan QR":
        return <QrCode className="h-10 w-10" />;
      case "Add Contact":
        return <UserPlus className="h-10 w-10" />;
      case "Wallet Transfer":
        return <Wallet2 className="h-10 w-10" />;
      case "Send to Account":
        return <CreditCard className="h-10 w-10" />;
      case "Send to UPI":
        return <Link2 className="h-10 w-10" />;
      case "Request Number":
        return <UserPlus2 className="h-10 w-10" />;
      default:
        return null;
    }
  };

  const getMethodDescription = () => {
    switch (transferMethod) {
      case "Scan QR":
        return "Scan QR code to send money";
      case "Add Contact":
        return "Add a new contact";
      case "Wallet Transfer":
        return "Enter Wallet-ID to send money";
      case "Send to Account":
        return "Enter account details";
      case "Send to UPI":
        return "Enter UPI ID";
      default:
        return "";
    }
  };

  const handleSheetOpenChange = (open: boolean) => {
    if (!open) {
      // Reset states in the parent component when sheet is closed
      setTimeout(() => {
        onOpenChange(false);
      }, 0);
    } else {
      onOpenChange(true);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleSheetOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {selectedContact
              ? "Send Money"
              : transferMethod
              ? `${transferMethod}`
              : "Transfer"}
          </SheetTitle>
        </SheetHeader>

        {isProcessing ? (
          <div className="py-16 flex flex-col items-center justify-center">
            <TransactionLoader />
            <p className="text-center mt-6 text-muted-foreground">
              Processing your transfer. Please wait...
            </p>
          </div>
        ) : (
          <>
            {selectedContact && (
              <ContactTransferForm
                contact={selectedContact}
                transferAmount={transferAmount}
                setTransferAmount={setTransferAmount}
                transferNote={transferNote}
                setTransferNote={setTransferNote}
                onInitiateTransfer={onInitiateTransfer}
                onDeleteContact={onDeleteContact}
              />
            )}

            {!selectedContact && transferMethod && (
              <div className="py-6 flex flex-col items-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-2 text-primary">
                  {getMethodIcon()}
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold">{transferMethod}</h3>
                  <p className="text-muted-foreground">
                    {getMethodDescription()}
                  </p>
                </div>

                <div className="space-y-4 w-full mt-4">
                  {/* Method specific forms */}
                  {transferMethod === "Wallet Transfer" && (
                    <WalletTransferForm
                      transferAmount={transferAmount}
                      setTransferAmount={setTransferAmount}
                      transferNote={transferNote}
                      setTransferNote={setTransferNote}
                      transferWallet={transferWallet}
                      setTransferWallet={setTransferWallet}
                      onInitiateTransfer={onInitiateTransfer}
                    />
                  )}

                  {transferMethod === "Send to Account" && (
                    <AccountTransferForm
                      transferAmount={transferAmount}
                      setTransferAmount={setTransferAmount}
                      onInitiateTransfer={onInitiateTransfer}
                    />
                  )}

                  {transferMethod === "Send to UPI" && (
                    <UpiTransferForm
                      transferAmount={transferAmount}
                      setTransferAmount={setTransferAmount}
                      transferNote={transferNote}
                      setTransferNote={setTransferNote}
                      onInitiateTransfer={onInitiateTransfer}
                    />
                  )}

                  {transferMethod === "Scan QR" && <QrScanForm />}

                  {transferMethod === "Add Contact" && (
                    <AddContactForm
                      onAddContact={onAddContact}
                      setNewContactData={setNewContactData}
                    />
                  )}

                  {transferMethod === "Request Number" && (
                    <RequestMoneyForm
                      transferNote={transferNote}
                      setTransferNote={setTransferNote}
                    />
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

// Sub-components for different form types
function ContactTransferForm({
  contact,
  transferAmount,
  setTransferAmount,
  transferNote,
  setTransferNote,
  onInitiateTransfer,
  onDeleteContact,
}: any) {
  return (
    <div className="py-6 flex flex-col items-center space-y-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src={contact.image} alt={contact.name} />
        <AvatarFallback className="bg-gradient-to-br from-swift-purple/20 to-swift-blue/20 text-swift-purple text-xl">
          {contact.name
            .split(" ")
            .map((n: any) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="text-center">
        <h3 className="text-xl font-bold">{contact.name}</h3>
        <p className="text-muted-foreground">{contact.phone}</p>
      </div>

      <div className="space-y-4 w-full mt-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Wallet-ID</Label>
          <div className="relative">
            <Input
              id="amount"
              type="number"
              placeholder={contact.walletID}
              className="pl-4 text-md"
              value={contact.walletID}
              disabled={true}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1.5 text-muted-foreground">
              ₹
            </span>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              className="pl-8 text-lg"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="note">Note (Optional)</Label>
          <Input
            id="note"
            placeholder="What's this for?"
            value={transferNote}
            onChange={(e) => setTransferNote(e.target.value)}
          />
        </div>

        <Button
          className="w-full mt-4"
          onClick={onInitiateTransfer}
          disabled={
            !transferAmount ||
            isNaN(Number(transferAmount)) ||
            Number(transferAmount) <= 0
          }
        >
          Send Money
        </Button>

        <Button
          className="w-full mt-4 bg-red-500 hover:bg-white hover:text-red-500"
          onClick={onDeleteContact}
        >
          Delete Contact
        </Button>
      </div>
    </div>
  );
}

function WalletTransferForm({
  transferAmount,
  setTransferAmount,
  transferNote,
  setTransferNote,
  transferWallet,
  setTransferWallet,
  onInitiateTransfer,
}: any) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="phone">Wallet ID</Label>
        <Input
          id="walletID"
          type="text"
          placeholder="Enter Wallet-ID"
          value={transferWallet}
          onChange={(e) => setTransferWallet(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <div className="relative">
          <span className="absolute left-3 top-1.5 text-muted-foreground">
            ₹
          </span>
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            className="pl-8 text-lg"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="note">Note (Optional)</Label>
        <Input
          id="note"
          placeholder="What's this for?"
          value={transferNote}
          onChange={(e) => setTransferNote(e.target.value)}
        />
      </div>
      <Button
        className="w-full mt-4"
        onClick={onInitiateTransfer}
        disabled={
          !transferWallet ||
          !transferAmount ||
          isNaN(Number(transferAmount)) ||
          Number(transferAmount) <= 0
        }
      >
        Send Money
      </Button>
    </>
  );
}

function AccountTransferForm({
  transferAmount,
  setTransferAmount,
  onInitiateTransfer,
}: any) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <div className="relative">
          <span className="absolute left-3 top-1.5 text-muted-foreground">
            ₹
          </span>
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            className="pl-8 text-lg"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="accountName">Account Holder Name</Label>
        <Input id="accountName" placeholder="Enter account holder name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="accountNumber">Account Number</Label>
        <Input id="accountNumber" placeholder="Enter account number" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ifsc">IFSC Code</Label>
        <Input id="ifsc" placeholder="Enter IFSC code" />
      </div>
      <Button
        className="w-full mt-4"
        onClick={onInitiateTransfer}
        disabled={
          !transferAmount ||
          isNaN(Number(transferAmount)) ||
          Number(transferAmount) <= 0
        }
      >
        Send Money
      </Button>
      <Button className="bg-swift-dark-gray" disabled>
        Coming Soon
      </Button>
    </>
  );
}

function UpiTransferForm({
  transferAmount,
  setTransferAmount,
  transferNote,
  setTransferNote,
  onInitiateTransfer,
}: any) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="upi">UPI ID</Label>
        <Input id="upi" placeholder="Enter UPI ID (e.g. name@upi)" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <div className="relative">
          <span className="absolute left-3 top-1.5 text-muted-foreground">
            ₹
          </span>
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            className="pl-8 text-lg"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="note">Note (Optional)</Label>
        <Input
          id="note"
          placeholder="What's this for?"
          value={transferNote}
          onChange={(e) => setTransferNote(e.target.value)}
        />
      </div>
      <Button
        className="w-full mt-4"
        onClick={onInitiateTransfer}
        disabled={
          !transferAmount ||
          isNaN(Number(transferAmount)) ||
          Number(transferAmount) <= 0
        }
      >
        Send Money
      </Button>
      <Button className="bg-swift-dark-gray" disabled>
        Coming Soon
      </Button>
    </>
  );
}

function QrScanForm() {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-4">
      <div className="w-56 h-56 bg-muted/50 flex items-center justify-center border rounded-lg">
        <div className="text-center">
          <QrCode className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Camera access required to scan QR code
          </p>
          <Button className="mt-4">Enable Camera</Button>
        </div>
      </div>
      <Button className="bg-swift-dark-gray text-sm mt-6" disabled>
        Coming Soon
      </Button>
    </div>
  );
}

function AddContactForm({ onAddContact, setNewContactData }: any) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Enter contact name"
          onChange={(e) =>
            setNewContactData((prev: any) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contactPhone">Phone Number</Label>
        <Input
          id="contactPhone"
          placeholder="Enter phone number"
          onChange={(e) =>
            setNewContactData((prev: any) => ({
              ...prev,
              phone: e.target.value,
            }))
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contactPhone">Wallet ID</Label>
        <Input
          id="walletID"
          placeholder="Enter Wallet-ID"
          onChange={(e) =>
            setNewContactData((prev: any) => ({
              ...prev,
              walletID: e.target.value,
            }))
          }
        />
      </div>
      <Button className="w-full mt-4" onClick={onAddContact}>
        Add Contact
      </Button>
    </>
  );
}

function RequestMoneyForm({ transferNote, setTransferNote }: any) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Enter contact name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contactPhone">Phone Number</Label>
        <Input id="contactPhone" placeholder="Enter phone number" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="note">Note (Optional)</Label>
        <Input
          id="note"
          placeholder="What's this for?"
          value={transferNote}
          onChange={(e) => setTransferNote(e.target.value)}
        />
      </div>
      <Button className="w-full mt-4">Request Money</Button>
    </>
  );
}
