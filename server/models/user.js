import mongoose, { Schema } from "mongoose";
import Group from "./groups.js";
const userSchema = new mongoose.Schema({
    admin:Boolean,
    firstName :String,
    lastName :String,
    email :{type:String, required: true,unique:true},
    phoneNumber :{type:String, required: true,unique:true},
    password:{type:String,require:true},
    signUpDate: {type:Date,default:Date.now},
    points:{type:Number,default:0,min:0},
    groups:[{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}],
    id_updated_user:mongoose.Schema.Types.ObjectId
    
    
})

userSchema.post('save', async function (doc) {
  // Get the groups array from the user document
  const groups = doc.groups;
  // Loop through the groups array and update each group document using the $addToSet operator
  for (const groupId of groups) {
    await Group.findByIdAndUpdate(groupId, { $addToSet: { members: doc._id } });
  }
});
const User = mongoose.model("User",userSchema)

export default User;