import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import prisma from "./lib/prisma";

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register',
    },
    callbacks: {
      authorized({ auth, request: { nextUrl }}){
        console.log({auth});
        return true;
      },
      jwt({ token, user}){
        if( user ){
          token.data = user;
        }
        return token;
      },
      session({ session, token, user}){
        session.user = token.data as any;
        return session;
      },
    },
    providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;
        
        const { email, password } = parsedCredentials.data;
        
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) return null;

      
        if (!bcrypt.compareSync(password, user.password)) return null;
        
    
        const { password: _, ...rest } = user;

        return rest;

        },
    }),
  ],
}

export const { signIn, signOut, auth, handlers} = NextAuth(authConfig);