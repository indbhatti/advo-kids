"use server";

import Question, { QuestionSchema, SimpleQuestion } from "@/models/questions";
import Storyline, { StorylineSchema } from "@/models/storylines";
import User, { UserType } from "@/models/user";
import connectMongoDB from "@/mongoose";

export const getQuestion = async (
  language: string,
  storylineId: string,
  questionNumber: number
): Promise<SimpleQuestion | null> => {
  try {
    const connect = await connectMongoDB();
    if (connect) {
      const stl: StorylineSchema | null = await Storyline.findById(storylineId);
      if (!stl) {
        console.log("Storyline Not Found");
        return null;
      }
      const ques: QuestionSchema | null = await Question.findOne({
        language,
        storylineNumber: stl.storyline_number,
        questionNumber: questionNumber + 1,
      });
      if (ques) {
        const question: SimpleQuestion = {
          id: ques.id.toString(),
          questionStatement: ques.questionStatement,
          questionNumber: ques.questionNumber,
          storylineNumber: ques.storylineNumber,
          language: ques.language,
          option1: ques.option1,
          option2: ques.option2,
          option3: ques.option3,
          option4: ques.option4,
          answer: ques.answer,
        };
        return question;
      } else {
        console.log("Question Not Found");
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const correct = async (
  userId: string,
  storylineId: string,
  questionNumber: number
): Promise<
  { error?: string; message?: string; status: number } | undefined
> => {
  try {
    const connect = await connectMongoDB();
    if (connect) {
      const user: UserType | null = await User.findById(userId);
      const storyline: StorylineSchema | null = await Storyline.findById(
        storylineId
      );
      if (user && storyline) {
        if (questionNumber === storyline.questions) {
          user.progress.set(storylineId, questionNumber);
          user.save();
          return { error: "No more Questions", status: 409 };
        } else if (questionNumber > storyline.questions) {
          user.progress.set(storylineId, questionNumber + 1);
          user.save();
          return { message: "Success", status: 200 };
        } else {
          return { message: "Question already attempted", status: 200 };
        }
      } else {
        return { error: "Question not found", status: 500 };
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return { error: "Error", status: 500 };
  }
};
