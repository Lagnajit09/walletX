"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Send, ArrowRight } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import PinVerificationDialog from "@/src/components/custom/PinVerificationDialog";
import ContactSearch from "@/src/components/transfer-page/ContactSearch";
import TransferOptions from "@/src/components/transfer-page/TransferOptions";
import ContactsList from "@/src/components/transfer-page/ContactsList";
import TransferSheet from "@/src/components/transfer-page/TransferSheet";
import { Contact, NewContactFormType } from "@/types/contact";
import RequestOptions from "./RequestOptions";
import { addContact, deleteUserContact } from "@/app/lib/actions/useContact";
import { useSession } from "next-auth/react";
import { p2pTransfer } from "@/app/lib/actions/p2pTransfer";

interface TransferPageClientProps {
  initialContacts: Contact[];
}

export default function TransferPageClient({
  initialContacts,
}: TransferPageClientProps) {
  const { toast } = useToast();
  const router = useRouter();
  const session = useSession();

  const [isPinDialogOpen, setIsPinDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [transferWallet, setTransferWallet] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [transferNote, setTransferNote] = useState("");
  const [isTransferSheetOpen, setIsTransferSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] =
    useState<Contact[]>(initialContacts);
  const [transferMethod, setTransferMethod] = useState<string | null>(null);
  const [newContactData, setNewContactData] = useState<NewContactFormType>({
    name: "",
    phone: "",
    walletID: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Filter contacts based on search query
    if (searchQuery) {
      const filtered = initialContacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.phone.includes(searchQuery)
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(initialContacts);
    }
  }, [searchQuery, initialContacts]);

  const handleSheetOpenChange = (open: boolean) => {
    setIsTransferSheetOpen(open);

    // If the sheet is closing, reset the relevant states
    if (!open) {
      setSelectedContact(null);
      setTransferMethod(null);
      setTransferAmount("");
      setTransferNote("");
      setTransferWallet("");
    }
  };

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    setIsTransferSheetOpen(true);
  };

  const handleTransferMethodSelect = (method: string) => {
    setTransferMethod(method);
    setIsTransferSheetOpen(true);
  };

  const initiateTransfer = () => {
    if (
      !transferAmount ||
      isNaN(Number(transferAmount)) ||
      Number(transferAmount) <= 0
    ) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    } else if (!transferWallet) {
      toast({
        title: "Insufficient Data",
        description: "Please enter the Wallet-ID of Receiver.",
        variant: "destructive",
      });
      return;
    } else if (!session.data?.user?.pin) {
      toast({
        title: "Pin Required",
        description: "Please set your 4-digit PIN at Settings.",
        variant: "destructive",
      });
      return;
    }

    setIsPinDialogOpen(true);
  };

  const handleTransferComplete = async () => {
    setIsPinDialogOpen(false);
    setIsProcessing(true);

    try {
      const res = await p2pTransfer(
        transferWallet,
        Number(transferAmount) * 100
      );
      if (res?.status === 200) {
        toast({
          title: "Transfer successful",
          description: `₹${Number(transferAmount).toFixed(2)} sent to ${
            selectedContact?.name || transferMethod
          }`,
        });
      } else {
        throw new Error(res.message || "Transfer failed");
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Transfer Failed",
        description: error.message || "Insufficient funds",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setTransferAmount("");
      setTransferWallet("");
      setTransferNote("");
      setSelectedContact(null);
      setTransferMethod(null);
      setIsTransferSheetOpen(false);
    }
  };

  const addToContact = async () => {
    if (newContactData) {
      const data = {
        name: newContactData.name,
        phone: newContactData.phone,
        walletId: newContactData.walletID,
      };
      const res = await addContact(data);
      if (res.ok) {
        toast({
          title: "Contact added",
          description: `${data.name} has been added to your contacts.`,
          variant: "default",
        });
        setNewContactData({
          name: "",
          phone: "",
          walletID: "",
        });
        setIsTransferSheetOpen(false);
        router.refresh();
      } else {
        console.error(res);
        toast({
          title: "Failed to add contact",
          description: res.message,
          variant: "destructive",
        });
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  const deleteContact = async () => {
    if (!selectedContact) {
      return;
    }

    const data = {
      id: selectedContact.id,
      phone: selectedContact.phone,
    };
    try {
      const res = await deleteUserContact(data);
      if (res.ok) {
        toast({
          title: "Contact Deleted.",
          description: "",
        });
        setSelectedContact(null);
        setIsTransferSheetOpen(false);
        router.refresh();
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to Delete.",
        description: "",
      });
    }
  };

  return (
    <div className="max-w-md md:max-w-6xl px-6">
      <Tabs defaultValue="send" className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="send">
            <Send className="mr-2 h-4 w-4" /> Send
          </TabsTrigger>
          <TabsTrigger value="request">
            <ArrowRight className="mr-2 h-4 w-4" /> Request
          </TabsTrigger>
        </TabsList>

        <TabsContent value="send" className="space-y-6">
          <ContactSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <TransferOptions
            onTransferMethodSelect={handleTransferMethodSelect}
          />

          <ContactsList
            contacts={filteredContacts}
            searchQuery={searchQuery}
            onContactSelect={handleContactSelect}
            setTransferWallet={setTransferWallet}
          />
        </TabsContent>

        <TabsContent value="request" className="space-y-6">
          <ContactSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <RequestOptions onRequestMethodSelect={handleTransferMethodSelect} />

          <ContactsList
            contacts={initialContacts}
            searchQuery={searchQuery}
            onContactSelect={handleContactSelect}
            setTransferWallet={setTransferWallet}
            isRequestMode={true}
          />
        </TabsContent>
      </Tabs>

      {/* Sheets and Dialogs */}
      <TransferSheet
        isOpen={isTransferSheetOpen}
        onOpenChange={handleSheetOpenChange}
        selectedContact={selectedContact}
        transferMethod={transferMethod}
        transferAmount={transferAmount}
        setTransferAmount={setTransferAmount}
        transferNote={transferNote}
        setTransferNote={setTransferNote}
        transferWallet={transferWallet}
        setTransferWallet={setTransferWallet}
        onInitiateTransfer={initiateTransfer}
        onAddContact={addToContact}
        setNewContactData={setNewContactData}
        onDeleteContact={deleteContact}
        isProcessing={isProcessing}
      />

      <PinVerificationDialog
        userPin={session.data?.user?.pin} // Replace with actual user pin
        isOpen={isPinDialogOpen}
        onClose={() => setIsPinDialogOpen(false)}
        onVerify={handleTransferComplete}
      />
    </div>
  );
}
