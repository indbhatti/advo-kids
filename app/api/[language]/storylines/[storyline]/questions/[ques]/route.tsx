import { NextResponse, NextRequest } from "next/server";
import Question from '../../../../../../../models/questions';
import connectMongo from '../../../../../../../middleware/mongooseconnect';

export async function GET(request: NextRequest, { params }: { params: { language: string, storyline: string, ques: string } }) {

  const { language, storyline, ques } = params;

  try {
    // console.log('CONNECTING TO MONGO');
    const connect = await connectMongo();

    if (connect) {
      // console.log('CONNECTED TO MONGO');
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
      var question = await Question.findOne({ language, storylineNumber : storyline,  questionNumber: ques})
      // console.log(question)
      if (question) {
        return NextResponse.json({ question });
      } else {
        // Return an error response
        return NextResponse.json({ error: "Question not found" }, { status: 500 });
      }
    }
    else {
      return NextResponse.json( { error: " MONGO EROOR" }, { status: 404 } );
    }

  } catch (error) {
    return NextResponse.error();
  }
}
