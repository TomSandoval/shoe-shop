import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import connect from "@/Utils/db";
import User from "@/Models/User";
import { NextResponse } from "next/server";
import GoogleUser from "@/Models/GoogleUser";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        //Check if the user exists.
        await connect();

        try {
          const user = await User.findOne({
            email: credentials.email,
          });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return { name: user.name, email: user.email, roll: user.roll };
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.roll) {
        token.roll = user.roll;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.roll = token.roll;
      return session;
    },
    async signIn({account, profile}) {
        if (account.provider === 'google') {
          await connect();

          const userFind = await GoogleUser.findOne({
            email: profile.email
          })

          console.log(userFind);

          if (userFind !== null) {
            return true
          } else {
            const newUser = new GoogleUser({
              name: profile.name, 
              email: profile.email,
            })

            await newUser.save();

            return true;
          }
        } 
        return true
    }
  },

});

export { handler as GET, handler as POST };
