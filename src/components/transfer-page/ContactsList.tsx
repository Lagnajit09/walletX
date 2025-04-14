"use client";

import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { ContactsListProps } from "@/types/contact";

export default function ContactsList({
  contacts,
  searchQuery,
  onContactSelect,
  setTransferWallet,
  isRequestMode = false,
}: ContactsListProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-medium text-muted-foreground">My Contacts</h2>
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {searchQuery && contacts.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No contacts found matching "{searchQuery}"
              </div>
            ) : contacts.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No contacts available
              </div>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
                  onClick={() => {
                    onContactSelect(contact);
                    setTransferWallet(contact.walletID ? contact.walletID : "");
                  }}
                >
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={""} alt={contact.name} />
                      <AvatarFallback className="bg-gradient-to-br from-swift-purple/20 to-swift-blue/20 text-swift-purple">
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {contact.phone}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
