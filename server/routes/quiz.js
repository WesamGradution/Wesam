import express from "express"
import {postQuestion,getQuestion,getTitleDescriptionOfQuiz,getQuizData,getCompetitiom} from "../controllers/quiz.js"

const router = express.Router()


router.get("/",getQuestion)
router.get("/admin/:adminId",getCompetitiom) // return the competition created by the admin
router.get("/:id",getTitleDescriptionOfQuiz) // return the title and description to show it to the user
router.get("/:id/:quizId",getQuizData) //show to user the quiz data so he can test
router.post("/",postQuestion)

export default router;