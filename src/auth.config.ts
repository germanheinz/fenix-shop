import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";

export const authConfig = {
    path: {
        signIn: '/auth/login',
        signUp: '/auth/register',
    },
    callbacks: {
      jwt({ token, user}){
        if( user ){
          token.data = user;
        }
        return token;
      },
      session({ session, token, user}){
        console.log({session, token, user})
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

        console.log("Authenticated User:", user);
        
        if (!bcrypt.compareSync(password, user.password)) return null;
        
        console.log("PASO AUTHENTICACION &&&&&&&&");
      
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...rest } = user;

        return rest;

        },
    }),
  ],
}

export const { signIn, signOut, auth, handlers} = NextAuth(authConfig);