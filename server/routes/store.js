import express from "express"
import {getStoreItem,postStoreItem,getItem} from "../controllers/store.js"

const router = express.Router()

router.get("/",getStoreItem)
router.get("/:cardName",getItem)
router.post("/",postStoreItem)

export default router