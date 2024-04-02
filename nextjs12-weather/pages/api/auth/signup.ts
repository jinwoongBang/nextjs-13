import { hashPassword } from "@/lib/auth-services";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/model/customTypes";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

interface MyApiRequest<T> extends NextApiRequest {
  body: T;
}

const handler = async (req: MyApiRequest<User>, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const { enteredEmail, enteredPassword } = data;

      if (
        !enteredEmail ||
        !enteredEmail.includes("@") ||
        !enteredPassword ||
        enteredPassword.trim().length < 5
      ) {
        return res.status(422).json({
          message: "Invalid input (password should be at least 5 characters)",
        });
      }

      const client = await connectToDatabase();
      const db = client.db("weather");
      const emailExisting = await db
        .collection("users")
        .findOne({ enteredEmail });

      if (emailExisting) {
        res.status(409).json({ message: "유저가 이미 있습니다." });

        return;
      }

      const hashedPassword = await hashPassword(enteredPassword);

      const usersCollection = db.collection("users");
      const result = await usersCollection.insertOne({
        enteredEmail,
        hashedPassword,
      });
      console.log(result);
      res.status(201).json({ message: "user is created!" });
      client.close();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default handler;
