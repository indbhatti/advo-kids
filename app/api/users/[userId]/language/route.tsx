import { NextResponse, NextRequest } from "next/server";
import mongoose from 'mongoose'
import User, { UserType } from '../../../../../models/user';
import connectMongo from '../../../../../middleware/mongooseconnect';

export async function POST(request: NextRequest, { params }: { params: { userId: string } }) {

  const { userId } = params
  const body = await request.json();
  const { language } = body;
  const tocheck = mongoose.Types.ObjectId.isValid(userId)

  try {
    // console.log('CONNECTING TO MONGO');
    const connect = await connectMongo();

    if (connect) {
      // console.log('CONNECTED TO MONGO');
      if (tocheck === false) {
        var user: UserType | null = await User.findOne(
          { googleId: userId },
        )

      } else {
        var user: UserType | null = await User.findOne(
          { _id: userId }
        )

      }
      if (user) {
        user.language = language;
        console.log(user);
        user.save();
        return NextResponse.json({ language: user.language });
      } else {
        // Return an error response
        return NextResponse.json({ error: "User not found" }, { status: 500 });
      }
    }
    else {
      return NextResponse.error();
    }

  } catch (error) {
    return NextResponse.error();
  }
}
