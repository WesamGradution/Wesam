import express from "express"
import {postQuestion,getQuestion,getTitleDescriptionOfQuiz,getQuizData,getCompetitiom,updateAttempt,finishQuiz,deleteqQuiz} from "../controllers/quiz.js"

const router = express.Router()


router.get("/",getQuestion)
router.get("/admin/:adminId",getCompetitiom) // return the competition created by the admin
router.get("/quizinfo/:userId/:groupId",getTitleDescriptionOfQuiz) // return the title and description to show it to the user
router.get("/testdata/:id/:quizId",getQuizData) //show to user the quiz data so he can test
router.put("/update/:userId/:quizId", updateAttempt);; // update the quiz with the user attemps
router.delete("/",deleteqQuiz)
router.post("/",postQuestion)
router.patch("/finishQuiz",finishQuiz)

export default router;