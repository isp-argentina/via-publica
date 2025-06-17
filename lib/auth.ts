import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) {
        // Add your authentication logic here
        // Example:
        // const user = await validateUser(credentials);
        // if (user) {
        //   return user;
        // } else {
        //   return null;
        // }
        return null // Replace with actual authentication logic
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add user data to the token
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      // Add user data to the session
      session.user = session.user || {}
      session.user.id = token.id as string
      session.user.role = token.role as string
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
