import mongoose, { Document } from "mongoose";

export interface SimpleStoryline {
  _id: string;
  title: string;
  description: string;
  questions: number;
  language: string;
}

export interface StorylineSchema extends Document {
  title: string;
  description: string;
  questions: number;
  language: string;
}

const storylineSchema = new mongoose.Schema<StorylineSchema>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: { type: Number, required: true },
  language: { type: String, required: true },
});

// mongoose.models = {};
const Storyline =
  mongoose.models.Storyline || mongoose.model("Storyline", storylineSchema);
// var User = mongoose.model('User', userSchema);

export default Storyline;
