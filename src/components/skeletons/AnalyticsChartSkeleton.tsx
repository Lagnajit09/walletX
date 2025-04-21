import { Card, CardContent } from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";

export default function AnalyticsSummarySkeleton() {
  // Create an array of 4 skeletons
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} className="animate-pulse">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <div className="mt-4">
              <Skeleton className="h-8 w-32" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
