import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {};

const WalletCardSkeleton = (props: Props) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Wallet Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <Skeleton className="h-20 w-20 mb-6 rounded-full" />
          <Skeleton className="h-12 w-52 mb-2 rounded-md" />
          <div className="flex flex-wrap gap-4 justify-center">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletCardSkeleton;
