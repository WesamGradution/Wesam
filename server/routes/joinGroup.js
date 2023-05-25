import express from "express"
import {signUpUser,signInUser} from "../controllers/joinGroup.js"

const router = express.Router()

router.post("/signUp",signUpUser)
router.post("/signIn",signInUser)

export default router