import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      email: string;
      fullName: string;
      roles: string[];
      token: string;
      imageUrl: string;      
    };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    email: string;
    fullName: string;
    roles: string[];
    token: string;
    imageUrl: string;
  }
}