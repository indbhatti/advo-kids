import mongoose, { Document } from 'mongoose';

export interface SimpleStoryline {
  _id: string,
  storyline_number: number,
  title: string,
  description: string,
  questions: number
  language: string
}

export interface StorylineSchema extends Document {
  storyline_number: number,
  title: string,
  description: string,
  questions: number
  language: string
}

const storylineSchema = new mongoose.Schema({
  storyline_number: Number,
  title: String,
  description: String,
  questions: Number,
  language: String
});

// mongoose.models = {};
const Storyline = mongoose.models.Storyline || mongoose.model('Storyline', storylineSchema);
// var User = mongoose.model('User', userSchema);

export default Storyline;
