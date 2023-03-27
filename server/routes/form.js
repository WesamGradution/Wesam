import express from "express";
import { getFormInfo,postFormInfo } from "../controllers/form.js";

const router = express.Router()

router.get("/",getFormInfo)
router.post("/",postFormInfo)

export default router;