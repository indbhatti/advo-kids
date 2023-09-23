import { NextResponse, NextRequest } from "next/server";
import Storyline from '../../../models/storylines';
import connectMongo from '../../../middleware/mongooseconnect';

export async function POST(request: NextRequest) {

  const body = await request.json();
  const { number } = body;

  try {
    console.log('CONNECTING TO MONGO');
    const connect = await connectMongo();

    if (connect) {
      console.log('CONNECTED TO MONGO');
      const storyline = await Storyline.findOne({ storyline_number: number })
      console.log(storyline)
      if (storyline) {
        return NextResponse.json({ storyline });
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
