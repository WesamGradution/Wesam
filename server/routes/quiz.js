import express from "express"
import {postQuestion,getQuestion} from "../controllers/quiz.js"

const router = express.Router()

router.get("/",getQuestion)
router.post("/",postQuestion)

export default router;