import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {};

export const TransactionHeaderSkeleton = (props: Props) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col space-y-2">
        <Skeleton className="h-8 w-48 mb-1" />
        <Skeleton className="h-5 w-64" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {/* Total Sent Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
            <Skeleton className="h-8 w-28 mb-2" />
            <Skeleton className="h-4 w-36" />
          </CardContent>
        </Card>

        {/* Total Received Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
            <Skeleton className="h-8 w-28 mb-2" />
            <Skeleton className="h-4 w-36" />
          </CardContent>
        </Card>

        {/* Total Deposits Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
            <Skeleton className="h-8 w-28 mb-2" />
            <Skeleton className="h-4 w-36" />
          </CardContent>
        </Card>

        {/* Total Withdrawals Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
            <Skeleton className="h-8 w-28 mb-2" />
            <Skeleton className="h-4 w-36" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const TransactionTableSkeleton = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-7 w-48" />
        </CardTitle>
        <div className="flex mt-2 space-x-2">
          <Skeleton className="h-10 w-32 rounded-lg" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full p-2">
          <Skeleton className="h-10 w-full mb-4 rounded-md" />
        </div>

        <div className="border rounded-md">
          {/* Table header */}
          <div className="grid grid-cols-4 border-b p-3 bg-gray-50">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Table rows */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="grid grid-cols-4 p-4 border-b">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-16" />
              <div className="flex justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
