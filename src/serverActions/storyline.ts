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
    if (storylines) {
      const simpleStorylines: Array<SimpleStoryline> = storylines.map((st) => ({
        _id: st._id as string,
        storyline_number: st.storyline_number,
        title: st.title,
        description: st.description,
        questions: st.questions,
        language: st.language,
      }));
      return simpleStorylines;
    } else {
      console.error("Stoyrline not found");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
