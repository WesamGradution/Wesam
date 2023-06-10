import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the schema for each field and subdocument
const competitionSchema = new Schema({
  group_id: [{ type: Schema.Types.ObjectId, required: true ,ref:"Group"}], // required ObjectId
  creator_id: { type: Schema.Types.ObjectId, required: true,ref:"User" }, // required ObjectId
  title: { type: String }, // String
  description: { type: String }, // String
  startDate: { type: Date, default: Date.now }, // Date with default value
  endTime: { type: Date }, // Date
  pointsAmount: { type: Number, default: 0 }, // Number with default value
  timer: { type: Number, default: null }, // Number with default value

  attempts: [
    // Array of subdocuments
    {
      member_id: { type: Schema.Types.ObjectId }, // ObjectId
      score: { type: Number }, // Number
      finishDate: { type: Date, default: Date.now }, // Date with default value
    },
  ],

  quizData: [
    // Array of subdocuments
    {
      question: { type: String }, // String
      correct_answer: { type: String }, // String
      incorrect_answers: [{ type: String }], // Array of Strings
      points: { type: Number }, // Number
    },
  ],
});

competitionSchema.path("attempts").default(() => [])

// Create and export a model using the schema and the collection name
const Quiz = mongoose.model("Quiz", competitionSchema);

export default Quiz
