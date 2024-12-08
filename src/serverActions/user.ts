"use server";

import User, { SimpleUser } from "@/models/user";
import connectMongoDB from "@/mongoose";

export async function getUserById(id: string) {
  try {
    const db = await connectMongoDB();
    if (!db) {
      console.log("Failed to connect to MongoDB");
      return null;
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      console.log("User not found");
      return null;
    }

    const simpleUser: SimpleUser = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      image: user.image,
      progress: user.progress,
    };

    return simpleUser;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const resetProgress = async (userId: string, storylineId: string) => {
  try {
    const db = await connectMongoDB();
    if (!db) {
      console.log("Failed to connect to MongoDB");
      return null;
    }

    const user = await User.findById(userId);

    if (!user) {
      console.log("User not found");
      return null;
    }

    user.markModified("progress");
    user.progress[storylineId] = 0;
    await user.save();

    return { status: 200 };
  } catch (error) {
    console.error(error);
    return { status: 500 };
  }
};
