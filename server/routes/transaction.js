import express from "express"
import {postTransaction,getTransaction,getTransactionForAdmin} from "../controllers/transaction.js"

const router = express.Router()

router.get("/",getTransaction)
router.get("/:id",getTransactionForAdmin) // return to admin all treansaction he made
router.post("/",postTransaction)

export default router;