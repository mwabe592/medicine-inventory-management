import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  userName: string;
  password: string;
  refreshToken: string; //hashed token
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
