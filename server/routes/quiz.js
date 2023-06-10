import express from "express"
import {postQuestion,getQuestion,getTitleDescriptionOfQuiz,getQuizData} from "../controllers/quiz.js"

const router = express.Router()

router.get("/",getQuestion)
router.get("/:id",getTitleDescriptionOfQuiz) // return the title and description to show it to the user
router.get("/:id/:quizId",getQuizData)
router.post("/",postQuestion)

export default router;