export type TransactionStatus = "Sent" | "Received";

export interface Transaction {
  id: number;
  amount: string;
  date: string;
  fromUser: string;
  toUser: string;
  status: TransactionStatus; // Status will strictly be "Sent" or "Received"
}

export type WalletTransactionStatus = "Success" | "Failure" | "Processing";

export interface WalletTransactionHistory {
  type: string;
  id: number;
  status: WalletTransactionStatus;
  token: string;
  provider: string;
  amount: number;
  startTime: Date;
  userId: number;
}
