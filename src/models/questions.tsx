import mongoose, { Document, models, ObjectId } from "mongoose";

export interface SimpleQuestion {
  id: string;
  questionStatement: string;
  questionNumber: number;
  storylineId: string;
  language: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: number;
}
export interface QuestionSchema extends Document {
  questionStatement: string;
  questionNumber: number;
  storylineId: ObjectId;
  language: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: number;
}
const questionSchema = new mongoose.Schema<QuestionSchema>({
  questionStatement: { type: String, required: true },
  questionNumber: { type: Number, required: true },
  storylineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Storyline",
    required: true,
  },
  language: { type: String, required: true },
  option1: { type: String, required: true },
  option2: { type: String, required: true },
  option3: { type: String, required: true },
  option4: { type: String, required: true },
  answer: { type: Number, required: true },
});

const Question = models.Question || mongoose.model("Question", questionSchema);
// var User = mongoose.model('User', userSchema);

export default Question;
