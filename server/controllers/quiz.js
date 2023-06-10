import quiz from "../models/quiz.js";

export const getQuestion = async(req,res) =>{
    try {
        const quizInfo  = await quiz.find()

        res.status(200).json(quizInfo)
    } catch (error) {
        res.status(404).json({message:"there are error in getQuestion"})
    }
}

export const getTitleDescriptionOfQuiz = async (req,res) => {
     // Get the id of the quiz from the request parameters
  const group_ids = req.params.id;
  console.log("🚀 ~ file: quiz.js:16 ~ getTitleDescriptionOfQuiz ~ group_ids:", group_ids)
  

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
  console.log("🚀 ~ file: quiz.js:39 ~ getQuizData ~ id:", id)

  try {
    

    const q = await quiz.findById(id)

    const quizData = q.quizData

    res.status(200).json(quizData)
  } catch (error) {
    res.status(500).json({message:error.message})
  }

}

export const postQuestion = async(req,res) =>{
    const newQuiz = req.body;
    console.log(newQuiz)

    const saveNewQuiz = new quiz(newQuiz)

    try {
        await saveNewQuiz.save()

        res.status(201).json(saveNewQuiz)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}