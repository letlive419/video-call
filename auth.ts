import NextAuth from "next-auth/next";
import {authConfig} from "@/auth.config"
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from 'bcrypt';
import {sql} from "@vercel/postgres"
import {users} from "@/src/app/lib/placeholder-data"
import { User } from "next-auth";
import { parse } from "path";


async function getUser(email:string): Promise<User | undefined> {
    try {
        const user = await sql<User> `SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.error(`Failed to fetch user ${error}`)
        throw new Error(`Failed to fetch user`)
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
      Credentials({
          async authorize(credentials) {
              const parsedCredentials = z
                  .object({ email: z.string().email(), password: z.string().min(6) })
                  .safeParse(credentials);

              if (parsedCredentials.success) {
                  const { email, password } = parsedCredentials.data;
                  const user = await getUser(email);
                  console.log(user);
                  if (!user) return null;
                  const passwordsMatch = await bcrypt.compare(password, user.password);

                  if (passwordsMatch) return user;

              }
              console.log(`Invalid credentials`);
              return null;
          },
          credentials: undefined
      })]
  });
  