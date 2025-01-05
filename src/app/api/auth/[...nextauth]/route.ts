import NextAuth from "next-auth/next";
import { authOptions } from "@/utils/config/authOptions";

const handler = NextAuth(authOptions) as never;

export { handler as GET, handler as POST };