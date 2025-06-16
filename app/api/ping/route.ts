import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  // if (
  //   req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  // ) {
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  // }

  console.log("Pinging Supabase");
  // Check if the database is connected and up and running
  try {
    await db.contact.count();
    return NextResponse.json(
      { message: "Ping successful! App is up and running." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error pinging Supabase:", error);
    return NextResponse.json(
      { message: "Ping failed! App is down." },
      { status: 500 }
    );
  }
};
