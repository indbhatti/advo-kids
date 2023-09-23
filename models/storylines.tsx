import mongoose from 'mongoose';

export interface StorylineSchema {
  title: String,
  description: String,
  questions: []
}
const storylineSchema = new mongoose.Schema({
  title: String,
  description: String,
  "questions": []
});

// mongoose.models = {};
const Storyline = mongoose.models.Storyline || mongoose.model('Storyline', storylineSchema);
// var User = mongoose.model('User', userSchema);

export default Storyline;
