import User from "../models/user.js"; // import your user model
import bcrypt from "bcrypt"; // import bcrypt for hashing passwords

// create a controller for signing up a user
export const signUpUser = async (req, res) => {
    console.log("here")
  try {
    // get the user data from the request body
    const { firstName, lastName, email, password,phoneNumber } = req.body;
    console.log(req.body)
    // check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // if the email exists, send back an error message
      return res.status(400).json({ message: "Email already taken" });
    }

    // hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user model with the user data and hashed password
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    // save the new user model to the database
    await newUser.save();

    // send back a response with the user data and a status code of 201
    res.status(201).json(newUser);
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
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      // if the email does not exist, send back an error message
      return res.status(404).json({ message: "Email or Password Not Correct" });
    }

    // compare the password with the hashed password stored in the database using bcrypt
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      // if the password is incorrect, send back an error message
      return res.status(400).json({ message: " Password Not Correct" });
    }

    // send back a response with the user data and a status code of 200
    res.status(200).json(existingUser);
  } catch (error) {
    // handle any errors
    res.status(500).json({ message: error.message });
  }
};
