import { hash } from "bcryptjs";

export const hashPassword = async (password: string) => {
  const saltRounds = 10; // salting is passing a random number to the bcrypt hashing function to improve security. Default is 10 rounds for node.js.
  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
};
