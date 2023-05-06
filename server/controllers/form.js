import signUpForm from "../models/signIpForm.js"

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
    console.log(post)

    const newpost = new signUpForm(post)
    
    try {
        await newpost.save()

        res.status(201).json(newpost)
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
