import React from "react";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";

export const SettingsSectionSkeleton = () => (
  <Card>
    <CardHeader className="pb-3">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded" />
        <Skeleton className="h-5 w-32" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            {i > 1 && <Separator className="my-4" />}
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-5 w-32 mb-1" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-6 w-10 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export const SettingsSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-8 w-32 mb-6" />
    {[1, 2, 3, 4].map((i) => (
      <SettingsSectionSkeleton key={i} />
    ))}
  </div>
);
