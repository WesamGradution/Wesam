import express  from "express";
import {getGroupInfo,postGroupInfo} from "../controllers/groups.js"

const router = express.Router()

router.get("/",getGroupInfo)
router.post("/",postGroupInfo)

export default router