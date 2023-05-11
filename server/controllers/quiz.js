import quiz from "../models/quiz.js";

export const getQuestion = async(req,res) =>{
    try {
        const quizInfo  = await quiz.find()

        res.status(200).json(quizInfo)
    } catch (error) {
        res.status(404).json({message:"there are error in getQuestion"})
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