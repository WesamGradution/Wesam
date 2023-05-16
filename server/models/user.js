import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    admin:Boolean,
    firstName :String,
    lastName :String,
    email :{type:String, required: true,unique:true},
    phoneNumber :{type:String, required: true,unique:true},
    password:{type:String,require:true},
    signUpDate: {type:Date,default:Date.now},
    points:{type:Number,default:0,min:0},
    groups:[{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}]
    
    
})

// Add the pre-save hook here
userSchema.pre('save', function(next) {
    // Check if the signUpDate field is not set
    if (!this.signUpDate) {
      // Set it to the current date
      this.signUpDate = new Date();
    }
    // Call the next middleware
    next();
  });

const signUpForm = mongoose.model("User",userSchema)

export default signUpForm;