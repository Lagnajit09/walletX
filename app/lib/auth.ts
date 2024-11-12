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
    // TODO: can u fix the type here? Using any is bad
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.number = user.number;
        token.pin = user.pin;
      }
      return token;
    },
    async session({ token, session }: any) {
      // session.user.id = token.sub;
      // session.user.number = token.number;
      // session.user.pin = token.pin;

      const user = await db.user.findUnique({
        where: { id: Number(token.sub) }, // Assuming token.sub contains user id
      });

      // Update session with the latest user data
      session.user.id = user?.id;
      session.user.name = user?.name;
      session.user.email = user?.email;
      session.user.number = user?.number;
      session.user.pin = user?.pin;

      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
};
