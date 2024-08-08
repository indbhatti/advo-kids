import mongoose, { Document } from "mongoose";

export interface SimpleUser {
  _id: string;
  username: string;
  image: string;
  coins: number;
  googleId?: string;
  nickname: string;
  language: string;
  progress: {
    completed_questions: Array<number>;
    current_question: Array<number>;
  };
}
export interface UserType extends Document {
  _id: string;
  username: string;
  password: string;
  image: string;
  coins: number;
  googleId?: string;
  nickname: string;
  language: string;
  progress: {
    completed_questions: Array<number>;
    current_question: Array<number>;
  };
  // facebookId: string,
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String },
  image: { type: String, required: true },
  coins: { type: Number, required: true },
  googleId: { type: String },
  nickname: { type: String, required: true },
  language: { type: String, required: true },
  progress: {
    completed_questions: [Number],
    current_question: [Number],
  },
  // facebookId: String,
});

// mongoose.models = {};
const User = mongoose.models.User || mongoose.model("User", userSchema);
// var User = mongoose.model('User', userSchema);

export default User;
