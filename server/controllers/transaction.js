import Transaction from "../models/transaction.js";
import User from "../models/user.js";
export const getTransaction = async (req,res)=>{
    try {
        const transactionInfo = await Transaction.find()
        //console.log(signUpInfo)

        res.status(200).json(transactionInfo)
    } catch (error) {
        res.status(404).json({message: error.message})
        
        
    }
}


export const postTransaction = async (req, res) => {
    const transaction = req.body;
    console.log("🚀 ~ file: transaction.js:19 ~ postTransaction ~ transaction:", transaction)
   
  
    const newTransaction = new Transaction(transaction);
   
    try {
      await newTransaction.save();
      const result = await User.updateOne({_id:transaction.receive_member_id },{$inc:{points:transaction.pointAmount}});
      console.log("🚀 ~ file: transaction.js:27 ~ postTransaction ~ result:", result)


       
      const existingUser = await User.findOne({ _id:transaction.receive_member_id });
      console.log("🚀 ~ file: transaction.js:27 ~ postTransaction ~ existingUser:", existingUser)
  
      // get the updated user document
      
  
      // send both the transaction and the user in the response
      res.status(201).json(existingUser);
    } catch (error) {
      if (error.code === 11000) {
        // duplicate key error
        res.status(409).json({ message: "Transaction controller error" });
      } else {
        // other errors
        res.status(500).json({ message: error.message});
      }
    }
  };
  