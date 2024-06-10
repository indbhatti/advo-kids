"use server"
import connectMongoDB from "@/middleware/mongooseconnect";
import Question, { QuestionSchema, SimpleQuestion } from "@/models/questions";
import Storyline, { StorylineSchema } from "@/models/storylines";
import User, { SimpleUser, UserType } from "@/models/user";
import { hash } from "bcryptjs";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export const getQuestion = async (language: string, storylineNumber: number, questionNumber: number)
  : Promise<SimpleQuestion | null> => {
  try {
    const connect = await connectMongoDB();
    if (connect) {
      var ques: QuestionSchema | null = await Question.findOne({ language, storylineNumber, questionNumber });
      if (ques) {
        const question: SimpleQuestion = {
          _id: ques._id.toString(),
          questionStatement: ques.questionStatement,
          questionNumber: ques.questionNumber,
          storylineNumber: ques.storylineNumber,
          language: ques.language,
          option1: ques.option1,
          option2: ques.option2,
          option3: ques.option3,
          option4: ques.option4,
          answer: ques.answer,
        }
        return question;
      } else {
        console.log("Question Not Found");
        return null;
      }
    }
    else {
      return null;
    }

  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getCurrentQuestionNumber = async (userId: string, storylineNumber: number) => {
  try {
    const connect = await connectMongoDB();
    let validId = mongoose.isValidObjectId(userId);
    if (connect) {
      let user: UserType | null = null;
      if (validId) {
        user = await User.findById(userId);
      } else {
        user = await User.findOne({ googleId: userId })
      }
      if (user) {
        return user.progress.current_question[storylineNumber - 1];
      } else {
        // Return an error response
        console.error("User Not Found");
        return null
      }
    }
    else {
      return null
    }

  } catch (error) {
    console.error(error)
    return null;
  }
}


export const getUserById = async (userId: string) => {
  try {
    const connect = await connectMongoDB();
    let validId = mongoose.isValidObjectId(userId);
    if (connect) {
      let user: UserType | null = null;
      if (validId) {
        user = await User.findById(userId);
      } else {
        user = await User.findOne({ googleId: userId })
      }
      if (user) {
        let userToSend: SimpleUser = {
          _id: user._id,
          username: user.username,
          image: user.image,
          coins: user.coins,
          googleId: user.googleId,
          nickname: user.nickname,
          language: user.language,
          progress: user.progress
        }
        return userToSend;
      } else {
        // Return an error response
        console.error("User Not Found");
        return null
      }
    }
    else {
      return null
    }

  } catch (error) {
    console.error(error)
    return null;
  }
}

export const correct = async (userId: string, storylineNumber: number, questionNumber: number) => {
  try {
    const connect = await connectMongoDB();
    if (connect) {
      var user: UserType | null = await User.findById(userId)
      const storyline: StorylineSchema | null = await Storyline.findOne({ storyline_number: storylineNumber })
      if (user && storyline) {
        console.log(user);
        if (questionNumber === storyline.questions) {
          user.progress.completed_questions[storylineNumber - 1] = questionNumber;
          user.progress.current_question[storylineNumber - 1] = storyline.questions + 1;
          user.save();
          return { error: "No more Questions", status: 409 };

        } else if (user.progress.current_question[storylineNumber - 1] === questionNumber) {
          user.progress.completed_questions[storylineNumber - 1] = questionNumber;
          user.progress.current_question[storylineNumber - 1] = questionNumber + 1;
          user.save();
          return { "message": "Success", status: 200 }
        } else {
          return { "message": "Question already attempted", status: 200 };
        }
      } else {
        return { error: "Question not found", status: 500 };
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return { error: "Error", status: 500 };
  }
}


export const getStorylines = async (language: string) => {
  try {
    const connect = await connectMongoDB();
    var storylines: Array<StorylineSchema> = await Storyline.find({ language: language })
    if (storylines) {
      return storylines
    } else {
      console.error("Stoyrline not found")
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
export const setLanguage = async (userId: string, language: string) => {
  try {
    const connect = await connectMongoDB();
    let validId = mongoose.isValidObjectId(userId);
    let user: UserType | null = null;
    if (validId) {
      user = await User.findById(userId);
    } else {
      user = await User.findOne({ googleId: userId })
    }
    if (user) {
      user.language = language;
      user.save();
      console.log("success")
      revalidatePath("/")
      return "Sucess";
    } else {
      return "User Not Found"
    }
  } catch (error) {
    return "Fail";
  }
}

export const register = async (username: string, password: string, nickname: string) => {
  try {
    const connect = await connectMongoDB();

    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      console.log(existingUser);
      return { status: 409, body: "Username already exists" }; // Conflict
    }

    const newUser = new User({
      username,
      nickname,
      image: " ",
      coins: 0,
      password: await hash(password, 12),
      language: "English",
      progress: {
        completed_questions: [0, 0, 0],
        current_question: [1, 1, 1]
      }
    });

    // Create new user
    const userCreated = await newUser.save();

    return { status: 200, userCreated };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred", status: 500 };
  }
}
