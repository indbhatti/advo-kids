import mongoose from 'mongoose';

export interface UserType {
  username: string,
  password: string,
  googleId: string,
  nickname: string,
  progress: {
    completed_questions: [],
    current_question: []
  }
  // facebookId: string,
}

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  googleId: String,
  nickname: String,
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
