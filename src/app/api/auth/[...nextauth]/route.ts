import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              email: { label: "Email", type: "text" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
              const { email, password } = credentials as { email: string, password: string };
                try {
                  const res = await fetch(process.env.API_URL + "/users/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                      email,
                      password,
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                  if (res.status == 401) {
                    const errorResponse = await res.json();
                    throw new Error(errorResponse.message);
                  }

                  const user = await res.json();
                  return user;
              } catch (error: any) {
                  if (error.message === "fetch failed"){
                    throw new Error("Error al iniciar sesión.");
                  }
                  throw new Error(error.message);
                }
            },
        }),
    ],
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/login"
    },
    callbacks: {
      async jwt({ token, user }): Promise<any> {
        if (user) return { ...token, ...user };
        return token;
      },
  
      async session({ token, session }) {
        session.user = token;
        session.user.token = token.token;
  
        return session;
      },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };