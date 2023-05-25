import signUpForm from "../models/user.js"
import session from "express-session"

export const getFormInfo = async (req,res) => {
    try {
        const signUpInfo = await signUpForm.find()
        //console.log(signUpInfo)

        res.status(200).json(signUpInfo)
    } catch (error) {
        res.status(404).json({message: "bla"})
        
        
    }
}

export const postFormInfo = async (req,res) => {
    const post =  req.body;
    //console.log(post)

    const newUser = new signUpForm(post)
    
    try {
        var user = await newUser.save()

        req.session.userId = user._id

        res.status(201).json(newUser)
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


    export const deleteForm = async (req, res) => {
        const ids = req.body;
        try {
          await signUpForm.deleteMany({ _id: { $in: ids } });
          res.status(200).json({ message: "Users deleted successfully" });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      };

export const updateForm = async (req,res) =>{
    const data = req.body;
    const id = data.id_updated_user;

    try {
        const updatedUser = await signUpForm.findByIdAndUpdate(id,data,{new:true,})
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

