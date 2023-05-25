import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    
    question:String,
    correct_answer:String,
    incorrect_answers:[],
    points:Number


})

const quiz = mongoose.model("quiz",quizSchema)

export default quiz;