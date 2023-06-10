import express from "express"
import {signUpUser,signInUser,GroupJoin} from "../controllers/joinGroup.js"

const router = express.Router()

router.post("/signUp",signUpUser)
router.post("/signIn",signInUser)
router.post("/join/:groupId",GroupJoin)

export default router