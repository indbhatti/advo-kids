import { NextResponse, NextRequest } from "next/server";
import Question from '../../../models/questions';
import connectMongo from '../../../middleware/mongooseconnect';

export async function POST(request: NextRequest) {

  const body = await request.json();
  const { storylineNumber, number, language } = body;

  try {
    console.log('CONNECTING TO MONGO');
    const connect = await connectMongo();

    if (connect) {
      console.log('CONNECTED TO MONGO');
      // var ques = Question.insertMany({
      //   questionStatement: "this is test question 2",
      //   questionNumber: 2,
      //   storylineNumber: 1,
      //   language: "English",
      //   option1: "gmaeasdfjr1",
      //   option2: "gmaesdfr1",
      //   option3: "gmaersdf1",
      //   option4: "gmaasdfer1",
      //   answer: 1,
      // })
      var question = await Question.findOne({ questionNumber: number, storylineNumber, language })
      if (question) {
        return NextResponse.json({ question });
      } else {
        // Return an error response
        return NextResponse.json({ error: "Question not found" }, { status: 500 });
      }
    }
    else {
      return NextResponse.error();
    }

  } catch (error) {
    return NextResponse.error();
  }
}
