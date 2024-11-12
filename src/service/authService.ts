import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../db/models/user";
import config from "../db/config/config";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const user = await User.create({
    name,
    email,
    password,
  });
  return user;
}

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found!");
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    throw new Error("Invalid password!");
  }

  const secret = config.development.secret;
  const token = jwt.sign({ id: user.userId }, secret, { 
    expiresIn: 86400,});
  return token;
}
