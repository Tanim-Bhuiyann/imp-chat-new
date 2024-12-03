
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"


import { db } from "./src/db/schema"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { accounts, sessions, users, verificationTokens } from "./src/db/schema"
 

/* 
import Credentials from "next-auth/providers/credentials" */


export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [Google ,


 ],
})
