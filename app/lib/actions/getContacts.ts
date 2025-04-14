// lib/data/contacts.ts
import { Contact } from "@/types/contact";

export async function getContacts(): Promise<Contact[]> {
  // In a real app, this would fetch from an API or database
  // For now, we'll return mock data
  return [
    {
      id: 1,
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      userId: 1,
    },
    {
      id: 2,
      name: "Michael Brown",
      phone: "+1 (555) 234-5678",
      userId: 1,
    },
    {
      id: 3,
      name: "Emily Davis",
      phone: "+1 (555) 345-6789",
      userId: 1,
    },
    {
      id: 4,
      name: "David Wilson",
      phone: "+1 (555) 456-7890",
      userId: 1,
    },
  ];
}
