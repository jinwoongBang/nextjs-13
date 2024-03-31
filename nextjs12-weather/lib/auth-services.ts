import { Password } from "@/model/customTypes";
import { compare, hash } from "bcryptjs";

export const hashPassword = async (password: string) => {
  const hashedPassword = hash(password, 10);
  return hashedPassword;
};
