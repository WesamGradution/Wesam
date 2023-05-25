import express  from "express";
import {getGroupInfo,postGroupInfo, postGroupJoin} from "../controllers/groups.js"

const router = express.Router()

router.get("/:id",getGroupInfo)
//router.get("/join",getGroupLink)
router.post("/",postGroupInfo)
router.post("/join/:groupId/:userId",postGroupJoin)

export default router