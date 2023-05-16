import express  from "express";
import {postAssignGroup} from "../controllers/assignGroup.js"

const router = express.Router()


router.post("/",postAssignGroup)

export default router