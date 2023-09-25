import { NextResponse, NextRequest } from "next/server";
import Storyline from '../../../../../models/storylines';
import connectMongo from '../../../../../middleware/mongooseconnect';

export async function GET(request: NextRequest, { params }: { params: { language: string, storyline: string } }) {

  const { language, storyline } = params

  try {
    // console.log('CONNECTING TO MONGO');
    const connect = await connectMongo();

    if (connect) {
      // console.log('CONNECTED TO MONGO');
      const storylineToSend = await Storyline.findOne({ language, storyline_number: storyline })
      if (storylineToSend) {
        return NextResponse.json({ storylineToSend });
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
