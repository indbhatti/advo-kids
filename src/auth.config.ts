import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    newUser: "/register",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      // console.log("session", session);
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      // console.log("jwt", token);
      return token;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        user.progress = {};
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
