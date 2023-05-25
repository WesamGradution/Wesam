import groups from "../models/groups.js";

export const getGroupInfo = async (req, res) => {
    const id = req.params.id;
    try {
       // get the id from the URL parameter
      
      const groupInfo = await groups.findById(id); // find the group with the id
      res.status(200).json(groupInfo); // send back the group information
    } catch (error) {
      res.status(404).json({ message: message.error });
    }
  };


export const postGroupInfo = async (req,res) =>{
    const groupData = req.body;
    const newGroup = new groups(groupData)

    try {
        var group = await newGroup.save()

        var groupId = group._id

        var groupUrl = "/groups/join/"+groupId
        console.log(groupUrl)

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
}


  
  // Route handler for joining a group after clicking the button
  export const postGroupJoin = async(req, res) => {
    const {groupId,userId} = req.params;
    console.log(groupId)
    console.log(userId)
    // Get the user ID from the session
    //const userId = req.session.userId;
    // Check if the user ID exists
    {/*if (!userId) {
      // Send back an error message if not
      res.status(401).json({ message: 'You need to log in first' });
    } else {
      try {
        // Find the group by ID
        const group = await Group.findById(groupId);
        // Check if the group exists
        if (!group) {
          // Send back an error message if not
          res.status(404).json({ message: 'Group not found' });
        } else {
          // Find the user by ID
          const user = await User.findById(userId);
          // Check if the user exists
          if (!user) {
            // Send back an error message if not
            res.status(404).json({ message: 'User not found' });
          } else {
            // Check if the user is already in the group
            if (group.users.includes(user._id)) {
              // Send back an error message if yes
              res.status(409).json({ message: 'User already in group' });
            } else {
              // Add the user to the group's users array
              group.users.push(user._id);
              // Save the group
              await group.save();
              // Add the group to the user's groups array
              user.groups.push(group._id);
              // Save the user
              await user.save();
              // Send back a success message or data
              res.status(200).json({ message: 'User joined group successfully' });
            }
          }
        }
      } catch (error) {
        // Handle any errors
        res.status(500).json({ message: error.message });
      }
    } */}
  }
  
  