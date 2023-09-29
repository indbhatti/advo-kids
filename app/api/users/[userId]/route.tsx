import { NextResponse, NextRequest } from "next/server";
import User from '../../../../models/user';
import connectMongo from '../../../../middleware/mongooseconnect';

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {

  const { userId } = params
  // console.log(params)

  try {
    // console.log('CONNECTING TO MONGO');
    const connect = await connectMongo();

    if (connect) {
      // console.log('CONNECTED TO MONGO');
      var user = await User.findOne( { _id: userId } )
      // console.log(user)
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
