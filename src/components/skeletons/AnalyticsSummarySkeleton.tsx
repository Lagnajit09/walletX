import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";

interface AnalyticsChartSkeletonProps {
  title: string;
}

export default function AnalyticsChartSkeleton({
  title,
}: AnalyticsChartSkeletonProps) {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-30 flex flex-col items-center justify-center">
          <Skeleton className="h-full w-full rounded-md" />
        </div>
        <div className="mt-4">
          <Skeleton className="h-4 w-32" />
        </div>
      </CardContent>
    </Card>
  );
}
