import mongoose from 'mongoose';

export interface QuestionSchema {
  questionStatement: String,
  questionNumber: number,
  storylineNumber: number,
  language: String
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  answer: number,
}
const questionSchema = new mongoose.Schema({
  questionStatement: String,
  questionNumber: Number,
  storylineNumber: Number,
  language: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  answer: Number,
});

// mongoose.models = {};
const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);
// var User = mongoose.model('User', userSchema);

export default Question;
