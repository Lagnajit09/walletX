"use client";

import {
  QrCode,
  PhoneCall,
  CreditCard,
  UserPlus,
  Link2,
  Wallet2,
} from "lucide-react";

interface TransferOptionsProps {
  onTransferMethodSelect: (method: string) => void;
}

export default function TransferOptions({
  onTransferMethodSelect,
}: TransferOptionsProps) {
  const transferOptions = [
    {
      id: "qr",
      name: "Scan QR",
      icon: <QrCode className="h-6 w-6" />,
      description: "Scan QR code to send money",
    },
    {
      id: "contact",
      name: "Add Contact",
      icon: <UserPlus className="h-6 w-6" />,
      description: "Add a new contact to send money",
    },
    {
      id: "phone",
      name: "Wallet Transfer",
      icon: <Wallet2 className="h-6 w-6" />,
      description: "Send money directly to other's wallet",
    },
    {
      id: "account",
      name: "Send to Account",
      icon: <CreditCard className="h-6 w-6" />,
      description: "Transfer to bank account",
    },
    {
      id: "upi",
      name: "Send to UPI",
      icon: <Link2 className="h-6 w-6" />,
      description: "Send money using UPI ID",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {transferOptions.map((option) => (
        <div
          key={option.id}
          className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/40 hover:bg-muted cursor-pointer transition-colors"
          onClick={() => onTransferMethodSelect(option.name)}
        >
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 text-primary">
            {option.icon}
          </div>
          <p className="text-sm font-medium text-center">{option.name}</p>
        </div>
      ))}
    </div>
  );
}
