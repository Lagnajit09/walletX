"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AlertCircle, Plus, Search } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { addContact } from "@/app/lib/actions/useContact";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { validatePhone } from "@/app/lib/actions/validatePhone";
import { useRouter } from "next/navigation";

interface ContactsList {
  id: number;
  name: string;
  phone: string;
}

interface Contact {
  id: number;
  name: string;
  phone: string;
  userId: number;
}

interface ContactsResponse {
  ok: boolean;
  status: number;
  message: string;
  contacts: Contact[];
}

interface ContactsProps {
  userContacts: ContactsResponse;
}

// The component
export default function Contacts({ userContacts }: ContactsProps) {
  const [contacts, setContacts] = useState<ContactsList[]>(
    userContacts.contacts
  );
  const [newContact, setNewContact] = useState({ name: "", phone: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  const handleAddContact = async (e: any) => {
    e.preventDefault();
    setErr("");
    const isValid = validatePhone(newContact.phone);
    if (!isValid.ok) {
      setErr(isValid.message);
      return;
    }
    try {
      const res = await addContact(newContact);
      if (!res.ok) {
        throw new Error(res.message);
      }
      if (res.ok && newContact.name && newContact.phone) {
        setContacts([...contacts, { id: contacts.length + 1, ...newContact }]);
        setNewContact({ name: "", phone: "" });
      }
      router.refresh();
    } catch (error: any) {
      console.error(error);
      setErr(error.message);
    }
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm)
  );

  return (
    <div className="flex flex-col gap-5">
      <Card className="bg-[#1e3a5f] border-none text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#4a9ff5]">
            Your Contacts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Search contacts"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#0b2545] border-[#1c3a5e] text-white"
            />
            <Button
              variant="outline"
              className="bg-transparent border-[#1c3a5e] text-white hover:bg-[#1c3a5e]"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="max-h-[200px] pr-4">
            {contacts.length !== 0 ? (
              filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center space-x-4 py-2 border-b border-[#1c3a5e] last:border-b-0"
                >
                  <Avatar>
                    <AvatarFallback className="bg-[#6f95c3]">
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-gray-400">{contact.phone}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No contacts</p>
            )}
          </ScrollArea>
          <form onSubmit={handleAddContact} className="space-y-2">
            <Input
              placeholder="Name"
              value={newContact.name}
              onChange={(e) =>
                setNewContact({ ...newContact, name: e.target.value })
              }
              className="bg-[#0b2545] border-[#1c3a5e] text-white"
            />
            <Input
              placeholder="Phone Number"
              value={newContact.phone}
              onChange={(e) =>
                setNewContact({ ...newContact, phone: e.target.value })
              }
              className="bg-[#0b2545] border-[#1c3a5e] text-white"
            />
            <Button
              type="submit"
              className="w-full bg-[#4A9FF5] hover:bg-[#3a8fe5]"
            >
              Add Contact
              <Plus className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
      {err && (
        <Alert variant="destructive" className="mb-4 bg-[#1c3a5e]">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{err}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
