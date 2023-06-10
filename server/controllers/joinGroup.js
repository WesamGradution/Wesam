import User from "../models/user.js"; // import your user model
import Group from "../models/groups.js";
import bcrypt from "bcrypt"; // import bcrypt for hashing passwords

// create a controller for signing up a user
export const signUpUser = async (req, res) => {
    
  try {
    // get the user data from the request body
    const newUser = req.body
    const { firstName, lastName, email, password,phoneNumber } = req.body;
    console.log(req.body)
    // check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // if the email exists, send back an error message
      return res.status(400).json({ message: "Email already taken" });
    }

    // hash the password using bcrypt
    //const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user model with the user data and hashed password
    const SavenewUser = new User({...newUser});

    // save the new user model to the database
    await SavenewUser.save();

    // send back a response with the user data and a status code of 201
    res.status(201).json(SavenewUser);
  } catch (error) {
    // handle any errors
    res.status(500).json({ message: error.message });
  }
};



// create a controller for signing in a user
export const signInUser = async (req, res) => {
  try {
    // get the user data from the request body
    const {email,password} = req.body;
    console.log(email)

    // find the user model with the email in the database
    const existingUser = await User.findOne({ email }).populate("groups");
    if (!existingUser) {
      // if the email does not exist, send back an error message
      return res.status(404).json({ message: "Email  Not Correct" });
    }

    // compare the password with the hashed password stored in the database using bcrypt
    {/*const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      // if the password is incorrect, send back an error message
      return res.status(400).json({ message: " Password Not Correct" });
    }*/}

    // send back a response with the user data and a status code of 200
    res.status(200).json(existingUser);
  } catch (error) {
    // handle any errors
    res.status(500).json({ message: error.message });
  }
};

  // Route handler for joining a group after clicking the button
  export const GroupJoin = async(req, res) => {
    const {groupId} = req.params;
   
    const {userId} = req.body
    
   
    // Check if the user ID exists
    {if (!userId) {
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
            if (group.members.includes(user._id)) {
              // Send back an error message if yes
              res.status(409).json({ message: 'User already in group' });
            } else {
              // Add the user to the group's members array
              group.members.push(user._id);
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
    } }
  }
  