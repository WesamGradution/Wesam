import mongoose from "mongoose";

const signUpSchema = new mongoose.Schema({
    firstName :String,
    lastName :String,
    email :String,
    phoneNumber :String,
})

const signUpForm = mongoose.model("signUpInfo",signUpSchema)

export default signUpForm;