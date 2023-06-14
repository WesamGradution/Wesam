import quiz from "../models/quiz.js";
import User from "../models/user.js";
export const getQuestion = async(req,res) =>{
    try {
        const quizInfo  = await quiz.find()

        res.status(200).json(quizInfo)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getTitleDescriptionOfQuiz = async (req,res) => {

  
  const groupId = req.params.groupId;
  console.log("🚀 ~ file: quiz.js:17 ~ getTitleDescriptionOfQuiz ~ groupId:", req.params)
  const userId = req.params.userId;

  

  try {
    // Find all the quizzes that have the group id and do not have the user id in the attempts array
    const quizzes = await quiz.find({
      group_id: groupId,
      attempts: { $not: { $elemMatch: { member_id: userId } } },
    });

    // Map the quizzes to an array of objects with id, title and description fields
    const title_description = quizzes.map((quiz) => ({
      id: quiz._id,
      title: quiz.title,
      description: quiz.description,
    }));

    // Return a success message with the title_description array
    res.status(200).json(title_description);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: error.message });
  }
 
   
}


export const getQuizData = async (req,res) => {
  const id = req.params.id
  
  
  

  try {
    

    const q = await quiz.findById(id)
   


    const quizData = q.quizData

    
    

    res.status(200).json(quizData)
  } catch (error) {
    res.status(500).json({message:error.message})
  }

}


export const getCompetitiom = async (req,res) =>{

  const data = req.params.adminId;
 
  


  try {
    const quizzes = await quiz.find({ creator_id: data }).populate("group_id");
    console.log("🚀 ~ file: quiz.js:63 ~ getAdminCompetition ~ quizzes:", quizzes);

    // Check the length of the quizzes array here
    if (quizzes.length === 0) {
      return res.status(200).json({ message: "No quizzes found for this admin." });
    }

    // Otherwise, send the quizzes
    res.status(200).json(quizzes);
  } catch (error) {
    
    // Handle any other error here
    return res.status(500).json({ message: error.message });
  }
}


export const updateAttempt = async (req,res) =>{

  const { userId, quizId } = req.body;
  console.log("🚀 ~ file: quiz.js:102 ~ updateAttempt ~ quizId:", quizId)
  console.log("🚀 ~ file: quiz.js:102 ~ updateAttempt ~ userId:", userId)
 

  try {
    // Find the quiz document by id and update it using the $addToSet operator
    const updatedQuiz = await quiz.findByIdAndUpdate(
      quizId,
      { $addToSet: { attempts: { member_id: userId } } },
      { new: true }
    );
  

    // Check if the quiz exists
    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Return a success message with the updated quiz document
    return res.status(200).json({
      message: "Quiz attempt updated",
      updatedQuiz
    });
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ message: error.message });
  }
}

export const deleteqQuiz = async (req,res) =>{

  const ids = req.body;

  try {
    await quiz.deleteMany({ _id: { $in: ids } });
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

export const postQuestion = async(req,res) =>{
    const newQuiz = req.body;
    const { title, group_id } = req.body;
   

    const existingQuiz = await quiz.findOne({ title, group_id });

    // If there is, return an error response
    if (existingQuiz) {
      return res.status(400).json({ message: "A quiz with this title already exists for this group." });
    }

    const saveNewQuiz = new quiz(newQuiz)
    
    try {
        await saveNewQuiz.save()

        res.status(201).json(saveNewQuiz)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const finishQuiz = async (req,res) =>{
  const {userId,points,score} = req.body
  
  try {
    // Find the user document by its id and update its points using the $inc operator
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { points: points } },
      { new: true }
    );
    console.log("🚀 ~ file: quiz.js:165 ~ finishQuiz ~ updatedUser:", updatedUser)

    
    

    // Find the quiz document by its id and update its score using the $set operator
    const updatedQuiz = await quiz.findOneAndUpdate(
      { "attempts.member_id": userId }, // Filter by member id
      { $set: { "attempts.$.score": score } }, // Update the score of the matching element in the array
      { new: true }
    );
    console.log("🚀 ~ file: quiz.js:175 ~ finishQuiz ~ updatedQuiz:", updatedQuiz)

  

    // Send a response with a status code of 200 (OK) and a message
    res.status(200).json({ message: "Score and points updated successfully" });
  } catch (err) {
    // Handle the error
    console.error(err);

    // Send a response with a status code of 500 (Internal Server Error) and an error message
    res.status(500).json({ message: err.message });
  }
}