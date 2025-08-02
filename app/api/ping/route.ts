import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  // if (
  //   req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  // ) {
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  // }

  console.log("Health check started");

  try {
    // Test database connection using Prisma's $connect method
    await db.$connect();

    console.log("Health check passed - Server and DB are connected");

    return NextResponse.json(
      {
        message: "Health check passed! Server and database are up and running.",
        timestamp: new Date().toISOString(),
        status: "healthy",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Health check failed:", error);

    return NextResponse.json(
      {
        message: "Health check failed! Database connection error.",
        timestamp: new Date().toISOString(),
        status: "unhealthy",
        error:
          error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 500 }
    );
  } finally {
    // Always disconnect to clean up
    await db.$disconnect();
  }
};
