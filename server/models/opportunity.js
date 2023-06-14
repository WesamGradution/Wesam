import mongoose,{Schema} from "mongoose";

const opportunityShcema = new mongoose.Schema({
    group_id:[{type:mongoose.Schema.Types.ObjectId,ref:"Group"}],
    title:{type:String,required:true},
    description:{type:String,required:true},
    startDate:{type:Date,default:Date.now},
    pointAmount:{type:Number,required:true},
    userLimit:{type:Number,required:true},
    attemps:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    admins:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}]

})


const Opportunity = mongoose.model("Opportunity",opportunityShcema);

export default Opportunity;