import express from "express";
import {getOpportunity,postOpportunity,deleteOpportunity, getOpportunityById,getOpportunitiesUser, getUserJoinOpportunity} from "../controllers/opportunity.js"

const router = express.Router()

router.get("/:id",getOpportunity)// return all the opprotunites that the admin created
router.get("/members/:id",getOpportunityById) // return the members {attemp} that join the opportunuties
router.get("/show/:id",getOpportunitiesUser)
router.post("/join",getUserJoinOpportunity)// user join to a opportunity
router.delete("/",deleteOpportunity)
router.post("/",postOpportunity)

export default router