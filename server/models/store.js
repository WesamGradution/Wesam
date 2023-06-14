import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    group_id : [{type:mongoose.Schema.Types.ObjectId,ref:"Group"}],
    name:String,
    description:String,
    quantity:Number,
    pricePoint:Number,
    itemPicture:{ data: Buffer, contentType: String },
    admin:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
})

const Store = mongoose.model("Store",storeSchema)

export default Store