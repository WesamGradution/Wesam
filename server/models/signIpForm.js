import mongoose from "mongoose";

const signUpSchema = new mongoose.Schema({
    firstName :String,
    lastName :String,
    email :{type:String, required: true,unique:true},
    phoneNumber :{type:String, required: true,unique:true},
    password:String,
    groupNumber:String,
})

const signUpForm = mongoose.model("signUpInfo",signUpSchema)

export default signUpForm;