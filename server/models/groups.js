import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    title: {type:String,require:true,unique:true},
    description: {type:String,require:true},
    creationDate: {type: Date, default: Date.now},
    admins: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], // Reference the User model
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], // Reference the User model
    url:String,
})

const Group = mongoose.model("Group",groupSchema)

export default Group;

