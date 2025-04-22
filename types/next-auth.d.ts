import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      number?: string | null;
      pin?: string | null;
      walletID?: string | null;
      address?: string | null;
      country?: string | null;
      state?: string | null;
      dob?: string | null;
      createdAt?: string | null;
      emailVerified?: boolean | null;
    };
    expires: ISODateString;
  }
}
