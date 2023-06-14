import groups from "../models/groups.js";
import User from "../models/user.js";
// return all the information of all the groups in the database
export const getAllGroupInfo = async (req, res) => {
  try {
    // get the id from the URL parameter

    const groupInfo = await groups.find();
    res.status(200).json(groupInfo); // send back the group information
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGroupInfo = async (req, res) => {
  const id = req.params.id;
  try {
    // get the id from the URL parameter

    const groupInfo = await groups.findById(id); // find the group with the id
    res.status(200).json(groupInfo); // send back the group information
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// create a new group and generate the url
export const postGroupInfo = async (req, res) => {
  const groupData = req.body;
  const newGroup = new groups(groupData);

  try {
    // Set the url property of the newGroup
    var groupId = newGroup._id;
    var groupUrl = "http://localhost:3000/groups/join/" + groupId;
    newGroup.url = groupUrl;

    // Save the newGroup with the url
    var group = await newGroup.save();
    console.log(groupUrl);

    res.status(200).json(groupUrl);
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key error
      res.status(409).json({ message: "Group already exist" });
    } else {
      // other errors
      res.status(500).json({ message: error.message });
    }
  }
};

// delete the group by id

export const deleteGroup = async (req, res) => {
  const ids = req.body;

  try {
    await groups.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: "group have been deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete members belong to the admin without delete them from the system
export const deleteMembers = async (req,res) => {
  const { usersId, adminId } = req.body;
 

  try {
    await groups.updateMany({admins:adminId},{$pullAll:{members:usersId}})
    res.status(200).json({message:"users have been deleted succefully"})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

// get the id of the group and send back the members belong to this group

export const getGroupMembers = async (req, res) => {
  
    try {
      // get the group id from the request params
      const groupId = req.params.id;
      console.log("🚀 ~ file: groups.js:86 ~ getGroupMembers ~ groupId:", groupId)
      // find the group by id and populate the members field with user information
      const group = await groups.findById(groupId).populate('members');
      // check if the group exists
      if (!group) {
        return res.status(404).json({message: 'Group not found'});
      }
      // get the members array from the group
      const members = group.members;
      console.log("🚀 ~ file: groups.js:95 ~ getGroupMembers ~ members:", members)
      // send the members array as a response
      res.status(200).json(members);
    } catch (error) {
      // handle any errors
      res.status(500).json({message: error.message});
    }
  };

  // send the group information that admin have created
  export const getGroupAdmin = async (req, res) => {
    try {
      // get the admin id from the request params
      const adminId = req.params.id;
      

      
      // find all the groups that have the admin id in the admins field and populate the members field with user information
      const group = await groups.find({admins: adminId}).populate('members');
  
      if (!group || group.length === 0) {
        // return a 200 status code and an empty array
        return res.status(200).json([]);
      }

      
      // send the groups array as a response
      res.status(200).json(group);
    } catch (error) {
      // handle any errors
      res.status(500).json({message: error.message});
    }
  };


  export const postNumberOfUser = async (req,res) => {

    try {
      // Get the phone number and group id from the request body
      const { phoneNumber, groupId } = req.body;
  
      // Find the user document with the phone number
      const user = await User.findOneAndUpdate(
        { phoneNumber },
        { $addToSet: { groups: groupId } },
        { new: true }
      );
  
      // Check if the user exists
      if (!user) {
        // Return a 404 status code and a message if not
        return res.status(404).json({ message: "User not found" });
      }
  
      // Find the group document with the group id and update it using the $addToSet operator and return the updated document
      const group = await groups.findByIdAndUpdate(
        groupId,
        { $addToSet: { members: user._id } },
        { new: true }
      );
  
      // Check if the group exists
      if (!group) {
        // Return a 404 status code and a message if not
        return res.status(404).json({ message: "Group not found" });
      }
  
      // Check if the user was already in the group
      if (group.members.includes(user._id)) {
        // Return a 400 status code and a message if yes
        return res.status(400).json({ message: "User already in the group" });
      }
  
      // Send the updated group document as a response
      res.status(200).json(group);
    } catch (error) {
      // Handle any errors
      res.status(500).json({ message: error.message });
    }

  }