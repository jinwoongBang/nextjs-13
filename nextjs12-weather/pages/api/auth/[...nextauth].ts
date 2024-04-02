import CredentialProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/db";
import { checkPassword } from "@/lib/auth-services";
import NextAuth from "next-auth";

type Credentials = {
  enteredEmail: string;
  enteredPassword: string;
};

const authOptions = {
  providers: [
    CredentialProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { enteredEmail, enteredPassword } = credentials as Credentials;
        const client = await connectToDatabase();

        const db = client.db("weather");
        const usersCollection = db.collection("users");
        const user = await usersCollection.findOne({
          enteredEmail: enteredEmail,
        });

        if (!user) {
          throw new Error("User not found");
        }

        const userPassword = user.hashedPassword;
        const userEmail = user.enteredEmail;
        const id = user._id.toString();

        const passwordIsCorrect = await checkPassword({
          enteredPassword,
          userPassword,
        });

        if (!passwordIsCorrect) {
          throw new Error("Password doesnt match");
        }
        client.close();
        return { id: id, email: userEmail };
      },
    }),
  ],
};

export default NextAuth(authOptions);
