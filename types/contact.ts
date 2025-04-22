export interface Contact {
  id: number;
  name: string;
  phone: string;
  walletID: string | null;
  userId?: number;
}

export interface NewContactFormType {
  name: string;
  phone: string;
  walletID: string;
}

export interface ContactSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export interface TransferOptionsProps {
  onTransferMethodSelect: (method: string) => void;
}

export interface ContactsListProps {
  contacts: Contact[];
  searchQuery: string;
  onContactSelect: (contact: Contact) => void;
  setTransferWallet: (id: string) => void;
  isRequestMode?: boolean;
}

export interface TransferSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedContact: Contact | null;
  transferMethod: string | null;
  transferAmount: string;
  setTransferAmount: (amount: string) => void;
  transferNote: string;
  setTransferNote: (note: string) => void;
  transferWallet: string;
  setTransferWallet: (id: string) => void;
  onInitiateTransfer: () => void;
  onAddContact: () => void;
  setNewContactData: (data: NewContactFormType) => void;
  onDeleteContact: () => void;
  isProcessing: boolean;
}
