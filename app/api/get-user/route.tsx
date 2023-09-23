import { NextResponse, NextRequest } from "next/server";
import User from '../../../models/user';
import connectMongo from '../../../middleware/mongooseconnect';

export async function POST(request: NextRequest) {

  const body = await request.json();
  const { username } = body;

  try {
    console.log('CONNECTING TO MONGO');
    const connect = await connectMongo();

    if (connect) {
      console.log('CONNECTED TO MONGO');
      var user = await User.findOne({ username })
      if (user) {
        return NextResponse.json({ user });
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
