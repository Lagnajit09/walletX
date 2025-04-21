import React from "react";
import {
  ChevronRight,
  Bell,
  CreditCard,
  Shield,
  Globe,
  LucideDelete,
} from "lucide-react";
import { Switch } from "@/src/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import { Separator } from "@/src/components/ui/separator";
import PinSetupButton from "@/src/components/custom/PinSetupButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { Button } from "@/src/components/ui/button";
import VerifyEmailButton from "@/src/components/custom/VerifyEmailButton";

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);

  const settingsSections = [
    {
      title: "Security",
      icon: <Shield className="h-5 w-5 text-swift-purple" />,
      items: [
        {
          name: "Security PIN",
          description: session.user?.pin
            ? "Change your 4-digit PIN"
            : "Set up a 4-digit PIN",
          action: <PinSetupButton />,
        },
        {
          name: "Verify Email",
          description: "Verify your Email address",
          action: (
            <VerifyEmailButton isEmailVerified={session.user?.emailVerified} />
          ),
        },
        {
          name: "Two-Factor Authentication",
          description: "Add an extra layer of security",
          action: <Switch />,
        },
        {
          name: "Biometric Login",
          description: "Use fingerprint or face ID",
          action: <Switch defaultChecked />,
        },
      ],
    },
    {
      title: "Notifications",
      icon: <Bell className="h-5 w-5 text-swift-purple" />,
      items: [
        {
          name: "Push Notifications",
          description: "Get notified about transactions",
          action: <Switch defaultChecked />,
        },
        {
          name: "Email Alerts",
          description: "Receive important updates via email",
          action: <Switch defaultChecked />,
        },
        {
          name: "Transaction Alerts",
          description: "Be notified of all transactions",
          action: <Switch defaultChecked />,
        },
      ],
    },
    {
      title: "Payment Methods",
      icon: <CreditCard className="h-5 w-5 text-swift-purple" />,
      items: [
        {
          name: "Manage Cards",
          description: "Add or remove payment cards",
          action: <ChevronRight className="h-5 w-5 text-swift-dark-gray" />,
        },
        {
          name: "Bank Accounts",
          description: "Link your bank accounts",
          action: <ChevronRight className="h-5 w-5 text-swift-dark-gray" />,
        },
      ],
    },
    {
      title: "Preferences",
      icon: <Globe className="h-5 w-5 text-swift-purple" />,
      items: [
        {
          name: "Dark Mode",
          description: "Switch between light and dark themes",
          action: <Switch />,
        },
        {
          name: "Language",
          description: "English (US)",
          action: <ChevronRight className="h-5 w-5 text-swift-dark-gray" />,
        },
      ],
    },
    {
      title: "Deletion",
      icon: <LucideDelete className="h-5 w-5 text-swift-purple" />,
      items: [
        {
          name: "Deactivate Account",
          description: "Deactivate your account for a specified period of time",
          action: (
            <Button className="bg-swift-gray text-red-400 border hover:bg-white">
              Deactivate
            </Button>
          ),
        },
        {
          name: "Delete Account",
          description: "Delete your account permanently",
          action: (
            <Button className=" text-swift-gray bg-red-500 hover:bg-red-400">
              Delete
            </Button>
          ),
        },
      ],
    },
  ];

  return (
    <main className="px-4 md:px-6 pt-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="space-y-6 animate-fade-in">
        {settingsSections.map((section, index) => (
          <Card key={section.title}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                {section.icon}
                <CardTitle>{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {section.items.map((item, i) => (
                  <div key={i}>
                    {i > 0 && <Separator className="my-4" />}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      {item.action}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default SettingsPage;
