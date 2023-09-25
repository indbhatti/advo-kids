import { NextResponse, NextRequest } from "next/server";
import Question from '../../../../../../models/questions';
import connectMongo from '../../../../../../middleware/mongooseconnect';

export async function GET(request: NextRequest, { params }: { params: { language: string, storyline: string } }) {

  const { language, storyline } = params;

  try {
    // console.log('CONNECTING TO MONGO');
    const connect = await connectMongo();

    if (connect) {
      // console.log('CONNECTED TO MONGO');
      var questions = await Question.find({ language, storylineNumber: storyline })
      if (questions) {
        return NextResponse.json({ questions });
      } else {
        // Return an error response
        return NextResponse.json({ error: "Questions not found" }, { status: 500 });
      }
    }
    else {
      return NextResponse.error();
    }

  } catch (error) {
    return NextResponse.error();
  }
}
