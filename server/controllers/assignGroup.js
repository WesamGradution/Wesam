import Group from "../models/groups.js";
import User from "../models/user.js"
import mongoose from "mongoose";


export const postAssignGroup = async (req,res) => {

    const handleError = (error) =>{
        console.log(error)
    }

    const post = req.body;
  
    const {selected_users,group} = post
  
    const selected_user_ids = selected_users.map(user => new mongoose.Types.ObjectId(user));
    console.log("🚀 ~ file: assignGroup.js:11 ~ postAssignGroup ~ selected_user_ids:", selected_user_ids)
    const group_id = new mongoose.Types.ObjectId(group);
    console.log("🚀 ~ file: assignGroup.js:13 ~ postAssignGroup ~ group_id:", group_id)
    
  
    //update User collection
    try {
      // use await to wait for the updateMany method to finish
      await User.updateMany({ _id: { $in: selected_user_ids } }, { $addToSet: { groups: group_id } }, { new: true }).populate("groups").exec();
      // use await to wait for the find method to finish
      const users = await User.find({ _id: { $in: selected_user_ids } }).populate("groups").exec();
      console.log(JSON.stringify(users, null, 2))
    } catch (err) {
      handleError(err); // handle error
    }
  
    
  
    //update Group collection
    try {
      // use await to wait for the findByIdAndUpdate method to finish
      await Group.findByIdAndUpdate(group_id, { $addToSet: { members: { $each: selected_user_ids } } }, { new: true }).populate(['admins', 'members']).exec();
      // use await to wait for the findById method to finish
      const group = await Group.findById(group_id).populate(['admins', 'members']).exec();
      console.log(group);
    } catch (err) {
      handleError(err); // handle error
    }
  
  }