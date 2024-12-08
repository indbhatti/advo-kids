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
    if (!connect) {
      console.log("Failed to connect to MongoDB");
      return null;
    }

    const ques: QuestionSchema | null = await Question.findOne({
      language,
      storylineId,
      questionNumber: questionNumber + 1,
    });

    if (!ques) {
      console.log("Question not found");
      return null;
    }

    const question: SimpleQuestion = {
      id: ques.id.toString(),
      questionStatement: ques.questionStatement,
      questionNumber: ques.questionNumber,
      storylineId: ques.storylineId.toString(),
      language: ques.language,
      option1: ques.option1,
      option2: ques.option2,
      option3: ques.option3,
      option4: ques.option4,
      answer: ques.answer,
    };
    return question;
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
    if (!connect) return { error: "Failed to connect to MongoDB", status: 500 };
    const user: UserType | null = await User.findById(userId);
    const storyline: StorylineSchema | null = await Storyline.findById(
      storylineId
    );
    if (!user) {
      return { error: "User not found", status: 500 };
    }

    if (!storyline) {
      return { error: "Storyline not found", status: 500 };
    }

    if (questionNumber > storyline.questions) {
      return { error: "No more Questions", status: 409 };
    }

    if (questionNumber <= storyline.questions) {
      user.progress[storylineId] = questionNumber;
      user.markModified("progress");
      await user.save();
      return { message: "Success", status: 200 };
    } else {
      return { message: "Question already attempted", status: 409 };
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return { error: "Error", status: 500 };
  }
};
