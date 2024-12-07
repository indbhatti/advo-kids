import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/mongodb";
import { compare } from "bcryptjs";
import UserMongo, { UserType } from "@/models/user";
import connectMongoDB from "./mongoose";
declare module "next-auth" {
  interface User {
    progress?: Map<string, number>;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(client),
  providers: [
    Google,
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials) return null;

          const db = await connectMongoDB();

          if (!db) return null;

          const user: UserType | null = await UserMongo.findOne({
            email: credentials.email,
          });

          if (!user) return null;

          const checkPassword = await compare(
            credentials.password as string,
            user.password
          );

          if (!checkPassword) return null;

          const userToSubmit: User = {
            id: user._id as string,
            name: user.name,
            email: user.email,
            image: user.image,
            progress: user.progress,
          };
          return userToSubmit;
        } catch (error) {
          console.log("customError", error);
          return null;
        }
      },
    }),
  ],
});
