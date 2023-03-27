import mongoose from "mongoose";

const signUpSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const signUpForm = mongoose.model("signUpInfo",signUpSchema)

export default signUpForm;