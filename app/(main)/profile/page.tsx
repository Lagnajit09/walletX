import React from "react";
import {
  Camera,
  Mail,
  Phone,
  MapPin,
  Edit,
  CreditCard,
  Building,
  ShieldCheck,
  Key,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import ProfileFormDialog from "@/src/components/custom/ProfileForm";
import PinDialog from "@/src/components/custom/PinDialog";
import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { User } from "@/types/user";

export const metadata: Metadata = {
  title: "Profile | Swift Pay",
  description:
    "User details at SwiftPay. View your profile details and Update.",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) redirect("/signin");

  return (
    <main className="px-6 pt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
        {/* Profile Card */}
        <ProfileCard user={session.user} />

        <Card className="p-6 col-span-2">
          <BankAccountsSection />
          <CardDetailsSection />
          <Separator className="my-6" />

          <h3 className="font-medium mb-4">Security & Verification</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SecurityButtons />
          </div>
        </Card>
      </div>
    </main>
  );
}

const ProfileCard = ({ user }: { user: User }) => {
  const getInitials = () => {
    const name = user.name || "John Doe";
    const initials = name
      .split(" ")
      .map((part: any) => part.charAt(0).toUpperCase())
      .join("");
    return initials;
  };

  return (
    <Card className="md:col-span-1">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
              <AvatarImage src="https://random.png" />
              <AvatarFallback className="text-2xl font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-swift-purple hover:bg-swift-dark-purple"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
          <p className="text-muted-foreground">Premium Member</p>

          <ProfileFormTrigger data={user} />
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-swift-purple" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-swift-purple" />
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p>{user.number}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Key className="h-5 w-5 text-swift-purple" />
            <div>
              <p className="text-sm text-muted-foreground">Wallet-ID</p>
              <p>{user.walletID}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-swift-purple" />
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              {user.address && user.country ? (
                <>
                  <p>{user.address}</p>
                  <p>{user.country}</p>
                </>
              ) : (
                <p className="text-muted-foreground">Not provided</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const BankAccountsSection = () => {
  const bankAccounts = [
    {
      id: 1,
      name: "HDFC Bank",
      accountNo: "****2345",
      accountType: "Savings",
      routingNo: "******123",
    },
    {
      id: 2,
      name: "ICICI Bank",
      accountNo: "****8901",
      accountType: "Checking",
      routingNo: "******456",
    },
  ];

  return (
    <>
      <h3 className="font-medium mb-4">Bank Accounts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {bankAccounts.map((account) => (
          <div
            key={account.id}
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-swift-purple/10 rounded-full">
                <Building className="h-5 w-5 text-swift-purple" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{account.name}</p>
                <p className="text-sm text-muted-foreground">
                  Account: {account.accountNo}
                </p>
                <p className="text-sm text-muted-foreground">
                  Type: {account.accountType}
                </p>
                <p className="text-sm text-muted-foreground">
                  Routing: {account.routingNo}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const CardDetailsSection = () => {
  const cards = [
    {
      id: 1,
      name: "Visa Debit",
      number: "**** **** **** 1234",
      expiry: "12/27",
      type: "debit",
    },
    {
      id: 2,
      name: "Mastercard",
      number: "**** **** **** 5678",
      expiry: "08/25",
      type: "credit",
    },
  ];

  return (
    <>
      <h3 className="font-medium mb-4">Card Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-swift-purple/10 rounded-full">
                <CreditCard className="h-5 w-5 text-swift-purple" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{card.name}</p>
                <p className="text-sm text-muted-foreground">{card.number}</p>
                <p className="text-sm text-muted-foreground">
                  Expires: {card.expiry}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  Type: {card.type}
                </p>
              </div>
            </div>
            <CardDetailButton cardId={card.id} />
          </div>
        ))}
      </div>
    </>
  );
};

// Client Components
const ProfileFormTrigger = ({ data }: any) => {
  return (
    <ProfileFormDialog data={data}>
      <Button variant="outline" className="mt-4 w-full flex gap-2">
        <Edit className="h-4 w-4" /> Edit Profile
      </Button>
    </ProfileFormDialog>
  );
};

const CardDetailButton = ({ cardId }: { cardId: number }) => {
  return (
    <PinDialog>
      <Button
        size="sm"
        variant="outline"
        className="mt-2 text-swift-purple w-full"
      >
        <ShieldCheck className="h-4 w-4 mr-1" /> View Full Details
      </Button>
    </PinDialog>
  );
};

const SecurityButtons = () => {
  return (
    <>
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <p className="font-medium">Two-Factor Authentication</p>
          <p className="text-sm text-muted-foreground">
            Enhance your account security
          </p>
        </div>
        <Button variant="outline">Enable</Button>
      </div>

      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
          <p className="font-medium">Identity Verification</p>
          <p className="text-sm text-muted-foreground">
            Verify your identity for higher limits
          </p>
        </div>
        <Button>Verify</Button>
      </div>
    </>
  );
};
