import mongoose, { Document } from "mongoose";

export interface SimpleUser {
  _id: string;
  name: string;
  email: string;
  image: string;
  progress: Record<string, number>;
}
export interface UserType extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  progress: Record<string, number>;
}

const userSchema = new mongoose.Schema<UserType>({
  name: String,
  email: String,
  password: String,
  image: String,
  progress: {
    type: Object,
    default: {},
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
