import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";

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
        // password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials: any) {
        // const hashedPassword = await bcrypt.hash(credentials?.password, 10);

        console.log(credentials);
        const existingUser = await db.user.findFirst({
          where: {
            number: credentials?.phone,
          },
        });
        if (existingUser) {
          // const passwordValidation = await bcrypt.compare(
          //   credentials.password,
          //   existingUser.password
          // );
          // if (passwordValidation) {
          return {
            id: existingUser.id.toString(),
            name: existingUser.name,
            number: existingUser.number,
          };
          // }
          // return null;
        }
        // try {
        //   const user = await db.user.create({
        //     data: {
        //       number: credentials?.phone,
        //       password: "",
        //       // password: hashedPassword,
        //     },
        //   });
        //   return {
        //     id: user.id.toString(),
        //     name: user.name,
        //     number: user.number,
        //   };
        // } catch (e) {
        //   console.error(e);
        // }
        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    // TODO: can u fix the type here? Using any is bad
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
