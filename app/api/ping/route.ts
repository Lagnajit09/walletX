import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const res = await db.contact.count();

  if (res) {
    return NextResponse.json(
      {
        message: "Ping successful! App is up and running.",
      },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      {
        message: "Ping failed! App is down.",
      },
      { status: 500 }
    );
  }
};
