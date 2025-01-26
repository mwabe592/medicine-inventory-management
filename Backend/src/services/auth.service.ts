import User from "../models/user.model";
import { IUser } from "../models/user.model";
import { hashPassword } from "../utils/hashPassword";
import bcrypt from "bcryptjs";
import { generateTokens } from "../utils/generateToken";

export const register = async ({ name, userName, password }: IUser) => {
  const hashedPassword = await hashPassword(password);

  const newUser = new User({
    name,
    userName,
    password: hashedPassword,
  });

  return await newUser.save(); // Save new user into the database
};

export const login = async ({ userName, password }: IUser) => {
  // Check if user exists in the database with the given userName and password
  const user = await User.findOne({ userName });
  if (!user) {
    throw new Error("User not found");
  }

  const correctPassword =
    user && (await bcrypt.compare(password, user.password));
  if (!correctPassword) {
    throw new Error("Incorrect Password");
  }

  //generate tokens if user exists and password is correct
  const { accessToken, refreshToken } = generateTokens(user._id);

  // Token hashed before storing in database
  user.refreshToken = bcrypt.hashSync(refreshToken, 10);
  await user.save();

  return { accessToken, refreshToken };

  // Remember to validate the password before hashing it
};
