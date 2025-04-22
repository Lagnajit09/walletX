import db from "./db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "phone number",
          type: "text",
          placeholder: "Enter your phone number",
          required: true,
        },
        name: {
          label: "name",
          type: "text",
          placeholder: "Enter your name",
        },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials: any) {
        console.log(credentials);
        const existingUser = await db.user.findFirst({
          where: {
            number: credentials?.phone,
          },
        });
        console.log(existingUser);
        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              number: existingUser.number,
              pin: existingUser.pin,
              email: existingUser.email,
              walletID: existingUser.walletID,
              createdAt: existingUser.createdAt,
              address: existingUser.address,
              state: existingUser.state,
              country: existingUser.country,
              dob: existingUser.dob,
              emailVerified: existingUser.emailVerified,
            };
          }
          return null;
        }
        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.number = user.number;
        token.pin = user.pin;
      }
      return token;
    },
    async session({ token, session }: any) {
      const user = await db.user.findUnique({
        where: { id: Number(token.sub) },
      });

      // Update session with the latest user data
      session.user.id = user?.id;
      session.user.name = user?.name;
      session.user.email = user?.email;
      session.user.number = user?.number;
      session.user.pin = user?.pin;
      session.user.walletID = user?.walletID;
      session.user.createdAt = user?.createdAt;
      session.user.address = user?.address;
      session.user.state = user?.state;
      session.user.country = user?.country;
      session.user.dob = user?.dob;
      session.user.emailVerified = user?.emailVerified;

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
