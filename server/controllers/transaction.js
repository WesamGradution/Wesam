import Transaction from "../models/transaction.js";

export const getTransaction = async (req,res)=>{
    try {
        const transactionInfo = await Transaction.find()
        //console.log(signUpInfo)

        res.status(200).json(transactionInfo)
    } catch (error) {
        res.status(404).json({message: error.message})
        
        
    }
}


export const postTransaction = async (req,res) => {
    const transaction =  req.body;
    console.log(transaction)

    const newTransaction = new Transaction(transaction)
    
    try {
        await newTransaction.save()

        res.status(201).json(newTransaction)
    } catch (error) {
        if (error.code === 11000) {
            // duplicate key error
            res.status(409).json({ message: "Email or phone number already exists" });
          } else {
            // other errors
            res.status(500).json({ message: error.message });
          }
        }
        
    }