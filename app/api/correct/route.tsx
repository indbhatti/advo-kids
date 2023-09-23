import { NextResponse, NextRequest } from "next/server";
import User from '../../../models/user';
import Storyline from '../../../models/storylines';
import connectMongo from '../../../middleware/mongooseconnect';

export async function POST(request: NextRequest) {

  const body = await request.json();
  const { username, storylineNumber, number } = body;
  const noOfQuestions = 7

  try {
    console.log('CONNECTING TO MONGO');
    const connect = await connectMongo();
    // var story = await Storyline.insertMany({
    //   storyline_number: 1,
    //   title: "Journey to School",
    //   description: "This storyline has a journey to school which follows Ankita.",
    //   questions: 7,
    //   language: "English"

    // })

    if (connect) {
      console.log('CONNECTED TO MONGO');

      var user = await User.findOne({ username })
      const storyline = await Storyline.findOne({ storyline_number: storylineNumber })
      if (user) {

        if (number === storyline.questions) {
          console.log("No more questions")
          user.progress.current[storylineNumber - 1] = storyline.questions + 1;
        } else if (user.progress.current_question === number) {
          user.progress.completed_questions[storylineNumber - 1] = number;
          user.progress.current_question[storylineNumber - 1] = number + 1;
        } else {
          console.log("Question already attempted")
          return NextResponse.json({ user });

        }
        console.log(user)


        const userSubmited = await user.save();

        return NextResponse.json({ userSubmited });
      } else {
        // Return an error response
        return NextResponse.json({ error: "Question not found" }, { status: 500 });
      }
    }
  }
  catch (error) {
    return NextResponse.error();
  }
}
