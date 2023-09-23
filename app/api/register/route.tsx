import { NextResponse, NextRequest } from "next/server";
import { hash } from 'bcryptjs'
import User from '../../../models/user';
import connectMongo from '../../../middleware/mongooseconnect';

interface CreateUserRequestBody {
  username: string;
  password: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json() as CreateUserRequestBody;
    const { username, password } = body;

    console.log('CONNECTING TO MONGO');
    const connect = await connectMongo(); // Make sure this function returns a Promise that resolves when MongoDB is connected
    console.log('CONNECTED TO MONGO');

    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      console.log(existingUser);
      return NextResponse.json({ status: 409, body: "Username already exists" }); // Conflict
    }

    const newUser = new User({
      username,
      password: await hash(password, 12),
      "progress": {
        "completed_questions": [1, 1, 1],
        "current_question": [0, 0, 0]
      }
    });

    // Create new user
    const userCreated = await newUser.save();

    return NextResponse.json({ userCreated });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred", status: 500 }); // Internal Server Error
  }
}
