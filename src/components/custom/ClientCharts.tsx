"use client";

import { memo } from "react";
import WalletTransactionChart from "./WalletTransactionChart";
import P2PTransfersChart from "./P2PTransferChart";

export const ClientWalletChart = memo(function ClientWalletChart({
  data,
}: {
  data: any;
}) {
  return <WalletTransactionChart chartData={data} />;
});

export const ClientP2PChart = memo(function ClientP2PChart({
  data,
}: {
  data: any;
}) {
  return <P2PTransfersChart chartData={data} />;
});
