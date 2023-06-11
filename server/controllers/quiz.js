import quiz from "../models/quiz.js";

export const getQuestion = async(req,res) =>{
    try {
        const quizInfo  = await quiz.find()

        res.status(200).json(quizInfo)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getTitleDescriptionOfQuiz = async (req,res) => {
     // Get the id of the quiz from the request parameters
  const group_ids = req.params.id;
 
  

try {
  const quizzes = await quiz.find({group_id:{$eq:group_ids}})

 const title_description = quizzes.map((quiz) =>({
  id:quiz._id,
  title:quiz.title,
  description:quiz.description
 }));

 res.status(200).json(title_description)
  
} catch (error) {
  res.status(500).json({message:error.message})
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
  console.log("🚀 ~ file: quiz.js:59 ~ getCompetitiom ~ data:", data)
  


  try {
    const quizzes = await quiz.find({ creator_id: data });
    console.log("🚀 ~ file: quiz.js:63 ~ getAdminCompetition ~ quizzes:", quizzes);

    // Check the length of the quizzes array here
    if (quizzes.length === 0) {
      return res.status(404).json({ message: "No quizzes found for this admin." });
    }

    // Otherwise, send the quizzes
    res.status(200).json(quizzes);
  } catch (error) {
    // Handle any other error here
    return res.status(500).json({ message: error.message });
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