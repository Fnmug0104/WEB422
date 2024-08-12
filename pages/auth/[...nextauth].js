import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import User from "../../models/user";

import { connectMongoDB } from "../../lib/mongodb";



const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { },


      async authorize(credentials) {
        const { username, password} = credentials;

        try {
            await connectMongoDB();
            const user = await User.findOne({username});

        if (!user){
        return null;
    }


    const passwordsMatch = await bcrypt.compare(password, user.password);

    if(!passwordsMatch){
        return null;
    }

    return user;
} catch (error) {
    console.log("Error: ", error);
}      
      },
        
      }),
    ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/index.js",
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
