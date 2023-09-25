import { NextResponse, NextRequest } from "next/server";
import User from '../../../models/user';
import Storyline from '../../../models/storylines';
import connectMongo from '../../../middleware/mongooseconnect';

export async function POST(request: NextRequest) {

  const body = await request.json();
  const { username, storylineNumber, number } = body;

  try {
    // console.log('CONNECTING TO MONGO');
    const connect = await connectMongo();
    if (connect) {
      // console.log('CONNECTED TO MONGO');

      var user = await User.findOne({ username })
      const storyline = await Storyline.findOne({ storyline_number: storylineNumber })
      const noOfQuestions = storyline.questions
      if (user) {

        if (number === storyline.questions) {
          // console.log("No more questions");
          user.progress.completed_questions[storylineNumber - 1] = number;
          user.progress.current_question[storylineNumber - 1] = storyline.questions + 1;
          const userSubmitted = await user.save();
          return NextResponse.json({ error: "No more Questions" }, { status: 409 });

        } else if (user.progress.current_question[storylineNumber - 1] === number) {
          user.progress.completed_questions[storylineNumber - 1] = number;
          user.progress.current_question[storylineNumber - 1] = number + 1;

        } else {
          // console.log("Question already attempted")
          return NextResponse.json({ "message": "Question already attempted" });

        }
        const userSubmitted = await user.save();

        return NextResponse.json({ userSubmitted });
      } else {
        // Return an error response with a 500 status code
        return NextResponse.json({ error: "Question not found" }, { status: 500 });
      }
    }
  }
  catch (error) {
    console.error("An error occurred:", error);
    // Return an error response with a 500 status code
    return NextResponse.error();
  }
}
