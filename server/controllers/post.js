import signUpForm from "../models/signIpForm.js"

export const getPosts = async (req,res) => {
    try {
        const signUpInfo = await signUpForm.find()
        //console.log(signUpInfo)

        res.status(200).json(signUpInfo)
    } catch (error) {
        res.status(404).json({message: error.message})
        
        
    }
}

export const createPost = async (req,res) => {
    const post =  req.body;
    console.log(post)

    const newpost = new signUpForm(post)
    
    try {
        await newpost.save()

        res.status(201).json(newpost)
    } catch (error) {
        res.status(409),json({message:error.message})
        
    }
}