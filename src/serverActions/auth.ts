"use server";

import connectMongoDB from "@/mongoose";

import User from "@/models/user";
import { hash } from "bcryptjs";

export const register = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    if (!email || !password) return { status: 400 };

    const db = await connectMongoDB();
    if (!db) return { status: 500 };

    const existingUser = await User.findOne({ email });
    if (existingUser) return { status: 409 };

    const user = new User({
      name,
      email,
      password: await hash(password, 12),
      image: "./default.png",
      progress: {},
      emailVerified: false,
    });

    await user.save();
    return { status: 200 };
  } catch (error) {
    console.error(error);
    return { status: 500 };
  }
};
