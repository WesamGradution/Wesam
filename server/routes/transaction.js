import express from "express"
import {postTransaction,getTransaction} from "../controllers/transaction.js"

const router = express.Router()

router.get("/",getTransaction)
router.post("/",postTransaction)

export default router;