import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
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
