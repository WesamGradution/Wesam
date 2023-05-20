import express from "express"
import {getStoreItem,postStoreItem} from "../controllers/store.js"

const router = express.Router()

router.get("/",getStoreItem)
router.post("/",postStoreItem)

export default router