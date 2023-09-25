import mongoose from 'mongoose';

export type UserType = {
  _id: string,
  username: string,
  password: string,
  image: string,
  coins: number,
  googleId: string,
  nickname: string,
  language: string,
  progress: {
    completed_questions: Array<number>,
    current_question: Array<number>
  }
  // facebookId: string,
}

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  image: String,
  coins: Number,
  googleId: String,
  nickname: String,
  language: String,
  "progress": {
    "completed_questions": [Number],
    "current_question": [Number]
  }
  // facebookId: String,
});

// mongoose.models = {};
const User = mongoose.models.User || mongoose.model('User', userSchema);
// var User = mongoose.model('User', userSchema);

export default User;
