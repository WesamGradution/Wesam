import groups from "../models/groups.js";

export const getGroupInfo = async (req,res) =>{

    try {
        const groupInfo = await groups.find()
        
        res.status(200).json(groupInfo)
    } catch (error) {
        res.status(404).json({message:message.error})
    }
}


export const postGroupInfo = async (req,res) =>{
    const post = req.body;
    const newGroup = new groups(post)

    try {
        await newGroup.save()

        res.status(200).json(newGroup)
    } catch (error) {
        if (error.code === 11000) {
            // duplicate key error
            res.status(409).json({ message: "Group already exist" });
          } else {
            // other errors
            res.status(500).json({ message: error.message });
          }
    }
}