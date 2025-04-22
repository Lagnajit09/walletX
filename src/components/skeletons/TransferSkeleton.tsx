import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent } from "../ui/card";

type Props = {};

const TransferPageSkeleton = (props: Props) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Page Title */}
      <div className="mb-6">
        <Skeleton className="h-8 w-64" />
      </div>

      {/* Tab buttons */}
      <div className="flex mb-4">
        <Skeleton className="h-12 w-1/2 rounded-md mr-2" />
        <Skeleton className="h-12 w-1/2 rounded-md" />
      </div>

      {/* Search bar */}
      <div className="mb-8">
        <Skeleton className="h-12 w-full rounded-md" />
      </div>

      {/* Transfer options */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <Skeleton className="h-12 w-12 rounded-full mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>

      {/* Contacts section */}
      <div className="mb-4">
        <Skeleton className="h-6 w-32 mb-4" />
      </div>

      {/* Contacts list or empty state */}
      <Card>
        <CardContent className="p-8 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Skeleton className="h-12 w-12 rounded-full mb-4" />
            <Skeleton className="h-5 w-48" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransferPageSkeleton;
