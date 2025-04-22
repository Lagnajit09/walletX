import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(
        new URL("/verification-failure", request.url)
      );
    }

    // Find user with this token
    const user = await db.user.findFirst({
      where: {
        verificationToken: token,
        verificationTokenExpires: {
          gt: new Date(), // Token must not be expired
        },
      },
    });

    if (!user) {
      return NextResponse.redirect(
        new URL("/verification-failure", request.url)
      );
    }

    // Update user as verified
    await db.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null,
        verificationTokenExpires: null,
      },
    });

    // Redirect to success page
    return NextResponse.redirect(new URL("/verification-success", request.url));
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.redirect(new URL("/verification-failure", request.url));
  }
}
