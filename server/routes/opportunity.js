import express from "express";
import {getOpportunity,postOpportunity} from "../controllers/opportunity.js"

const router = express.Router()

router.get("/",getOpportunity)
router.post("/",postOpportunity)

export default router