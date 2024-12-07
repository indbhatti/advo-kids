"use server";

import User, { SimpleUser } from "@/models/user";
import connectMongoDB from "@/mongoose";

export async function getUserById(id: string) {
  try {
    const db = await connectMongoDB();
    if (!db) return null;

    const user = await User.findById(id).select("-password");
    const simpleUser: SimpleUser = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      image: user.image,
      progress: Object.fromEntries(user.progress),
    };

    return simpleUser;
  } catch (error) {
    console.error(error);
    return null;
  }
}
