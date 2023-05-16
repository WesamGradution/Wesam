import groups from "../models/groups.js";
import signUpForm from "../models/user.js"
import mongoose from "mongoose";
export const postAssignGroup = async (req,res) => {
    const post =  req.body;
    const {selected_users,group} = post
    const selected_users_ids = selected_users.map(user => new mongoose.Types.ObjectId(user));
    const group_id = new mongoose.Types.ObjectId(group);
    console.log("🚀 ~ file: assignGroup.js:7 ~ postAssignGroup ~ groups:", group)
    console.log("🚀 ~ file: assignGroup.js:7 ~ postAssignGroup ~ selected_users:", selected_users)

    //update users collection
    signUpForm.updateMany({ _id: { $in: selected_users_ids } }, { $addToSet: { groups: group_id } })
    .then(result => {
        console.log(result); // result of the update operation

        return signUpForm.find({_id:{$in:selected_users_ids}}).populate("groups").exec();
    }).then(users=>{
        console.log(users)
    })
    .catch(err => {
        handleError(err); // handle error
        
    })

    

  //update groups collection
  groups.findByIdAndUpdate(group_id, { $addToSet: { members: { $each: selected_users_ids } } })
  .then(group => {
    //console.log(group); // updated group document
    //populate admins and members for the group
    return groups.findById(group_id).populate(['admins', 'members']).exec();
  })
  .then(group => {
    console.log(group); // group with populated admins and members
  })
  .catch(err => {
    handleError(err); // handle error
  });


   
        
    }
