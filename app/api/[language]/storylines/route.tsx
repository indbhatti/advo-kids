import { NextResponse, NextRequest } from "next/server";
import Storyline from '../../../../models/storylines';
import connectMongo from '../../../../middleware/mongooseconnect';

export async function GET(request: NextRequest, { params }: { params: { language: string } }) {

  const { language } = params

  try {
    // console.log('CONNECTING TO MONGO');
    const connect = await connectMongo();

    // var story = Storyline.insertMany({
    //   storyline_number: 3,
    //   title: "thllasfaw",
    //   language: "English",
    //   description: "tasdfdshllw",
    // })
    if (connect) {
      // console.log('CONNECTED TO MONGO');
      var storylines = await Storyline.find({ language: language })
      if (storylines) {
        return NextResponse.json({ storylines });
      } else {
        // Return an error response
        return NextResponse.json({ error: "Storyline not found" }, { status: 500 });
      }
    }
    else {
      return NextResponse.error();
    }

  } catch (error) {
    return NextResponse.error();
  }
}
