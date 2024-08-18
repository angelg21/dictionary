import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      email: string;
      fullName: string;
      roles: string[];
      assignedCardsAsEditor: string[];
      assignedCardsAsReviewer: string[];
      assignedCollectiveWorksAsEditor: string[];
      assignedCollectiveWorksAsReviewer: string[];
      token: string;      
    };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    email: string;
    username: string;
    fullName: string;
    roles: string[];
    assignedCardsAsEditor: string[];
    assignedCardsAsReviewer: string[];
    assignedCollectiveWorksAsEditor: string[];
    assignedCollectiveWorksAsReviewer: string[];
    token: string;
  }
}