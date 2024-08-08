import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectMongo from "../../../../middleware/mongooseconnect";
import UserMongo from "../../../../models/user";
import { UserType } from "../../../../models/user";
import { compare } from "bcryptjs";
import { Account, Profile, Session, TokenSet, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      userId: string;
      language: string;
    };
    expires: string;
    accessToken: string;
  }
  interface Profile {
    picture: string;
  }
}

declare module "next-auth" {
  interface User {
    id: string;
    nickname: string;
    username: string;
    image: string;
  }
}

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),

    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: Record<string, string> | undefined) => {
        try {
          if (!credentials) {
            return null;
          }
          const db = await connectMongo(); // Make sure connectMongo returns a database connection
          const user: UserType | null = await UserMongo.findOne({
            username: credentials.email,
          });

          if (!user) {
            return null;
          }

          const checkPassword = await compare(
            credentials.password,
            user.password,
          );

          if (!checkPassword) {
            return null;
          }

          const userToSubmit: User = {
            id: user._id,
            username: user.username,
            nickname: user.nickname,
            image: user.image,
          };
          // console.log(userToSubmit);

          return userToSubmit;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({
      token,
      account,
      user,
      profile,
    }: {
      token: TokenSet;
      account: Account | null;
      user: User | AdapterUser;
      profile?: Profile | undefined;
    }) {
      if (account) {
        token.accessToken = account.access_token;
        token.username = user.username;
        token.nickname = user.nickname;
        token.image = user.image;
        token.userId = user.id;
      }
      if (profile) {
        try {
          const db = await connectMongo(); // Make sure connectMongo returns a database connection
          const user: UserType | null = await UserMongo.findOne({
            username: profile.email,
          });
          if (user) {
            token.userId = user._id;
            token.username = user.username;
            token.nickname = user.nickname;
            token.image = user.image;
          } else {
            console.log("User not found");
          }
        } catch (error) {
          console.log(error);
        }
        token.email = profile.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: TokenSet }) {
      session.accessToken = token.accessToken;
      session.user.userId = token.userId;
      session.user.image = token.image;
      return session;
    },
    async redirect() {
      const apiUrl = process.env.NEXTAUTH_URL as string;
      return `${apiUrl}/`;
    },

    async signIn({
      account,
      profile,
    }: {
      account: Account | null;
      profile?: Profile | undefined;
    }) {
      if (!account) {
        return false;
      }
      if (account.provider === "google") {
        if (!profile) {
          return false;
        }
        try {
          const connect = await connectMongo();
          if (connect) {
            const user: UserType | null = await UserMongo.findOne({
              googleId: account.providerAccountId,
            });
            if (!user) {
              // add your user in DB here with profile data (profile.email, profile.name)
              var newUser = new UserMongo({
                username: profile.email,
                nickname: profile.name,
                googleId: account.providerAccountId,
                image: profile.picture,
                coins: 0,
                language: "English",
                progress: {
                  completed_questions: [0, 0, 0],
                  current_question: [1, 1, 1],
                },
              });
              await newUser.save();
            }
            return true;
          } else {
            console.error("Error coneecting to MongoDB");
            return false;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      } else if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },
  },

  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/register", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};
