"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FileX2, MoveLeft } from "lucide-react";
import { Button } from "@/src/components/ui/button";

const NotFound = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    );
  }, [pathname]);

  return (
    <div className="text-center max-w-md mx-auto my-[10%]">
      <div className="flex justify-center mb-6">
        <div className="p-4 rounded-full bg-destructive/10">
          <FileX2 className="h-12 w-12 text-destructive" />
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-swift-purple to-swift-blue bg-clip-text text-transparent">
        404
      </h1>
      <h2 className="text-2xl font-semibold mb-4">Page not found</h2>
      <p className="text-muted-foreground mb-8">
        Sorry, we couldn't find the page you're looking for. The page might have
        been moved or deleted.
      </p>

      <div className="space-y-4">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="w-full sm:w-auto mr-4"
        >
          <MoveLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>

        <Button
          onClick={() => router.push("/")}
          className="w-full sm:w-auto primary-gradient"
        >
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
