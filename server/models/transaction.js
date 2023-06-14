import mongoose from "mongoose";
import User from "./user.js";

const transactionShcema = new mongoose.Schema({
    receive_member_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
      }],
    pointAmount:Number,
    admin:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    transactionDate: {type:Date,default:Date.now}
})


{/*
transactionShcema.post("save",async function(doc, next){
    try {
        
     const result = await User.updateOne({_id:doc.receive_member_id},{$inc:{points:doc.pointAmount}});
     next(); // call next to finish the middleware
    } catch (err) {
      // handle error
    console.log(err) // pass error to next middleware
    }
   })*/}
  
const Transaction = mongoose.model("Transaction",transactionShcema)

export default Transaction; 