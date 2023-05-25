import express from "express";
import { getFormInfo,postFormInfo,deleteForm,updateForm } from "../controllers/form.js";

const router = express.Router()

router.get("/",getFormInfo)
router.post("/",postFormInfo)
router.delete("/",deleteForm)
router.put("/:id",updateForm)

export default router;