import mongoose from "mongoose";
import User from "./user.js";

const transactionShcema = new mongoose.Schema({
    receive_member_id : mongoose.Schema.Types.ObjectId,
    pointAmount:Number,
    transactionDate: {type:Date,default:Date.now}
})

const handleError = (err) =>{
    console.log(err)
}

transactionShcema.post("save",async function(doc, next){
    try {
     const result = await User.updateOne({_id:doc.receive_member_id},{$inc:{points:doc.pointAmount}});
     console.log(result);
     next(); // call next to finish the middleware
    } catch (err) {
     handleError(err); // handle error
    }
   })
const Transaction = mongoose.model("Transaction",transactionShcema)

export default Transaction;