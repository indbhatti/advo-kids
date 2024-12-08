"use server";

import Storyline, {
  SimpleStoryline,
  StorylineSchema,
} from "@/models/storylines";
import connectMongoDB from "@/mongoose";

export const getStorylines = async (
  language: string
): Promise<Array<SimpleStoryline> | null> => {
  try {
    const connect = await connectMongoDB();
    if (!connect) {
      console.error("Failed to connect to MongoDB");
      return null;
    }

    const storylines: Array<StorylineSchema> = await Storyline.find({
      language: language,
    });

    if (!storylines) {
      console.error("Storyline not found");
      return null;
    }

    const simpleStorylines: Array<SimpleStoryline> = storylines.map((st) => ({
      _id: st._id as string,
      title: st.title,
      description: st.description,
      questions: st.questions,
      language: st.language,
    }));
    return simpleStorylines;
  } catch (error) {
    console.error(error);
    return null;
  }
};
