import express from "express"
import {getStoreItem,postStoreItem,getItem, getAdminItem,getUserProduct} from "../controllers/store.js"

const router = express.Router()

router.get("/",getStoreItem)
router.get("/:cardName",getItem)
router.get("/admin/:id",getAdminItem) // return the items that associted to admin
router.get("/user/:userId",getUserProduct)// return the items that associted to user
router.post("/",postStoreItem)

export default router