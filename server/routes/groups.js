import express  from "express";
import {getGroupInfo,postGroupInfo,getAllGroupInfo, deleteGroup,getGroupMembers,getGroupAdmin,deleteMembers,postNumberOfUser} from "../controllers/groups.js"

const router = express.Router()

router.get("/",getAllGroupInfo)
router.get("/groupLink/:id",getGroupInfo)
router.get("/:id",getGroupMembers)// send the group id and return the members of it 
router.get("/admin/:id",getGroupAdmin)// send the id of admin and return the information of the group he have created
router.delete("/",deleteGroup)
router.delete("/:usersId/:adminId",deleteMembers) // delete the users (members) that belong to the admin
router.post("/",postGroupInfo)
router.post("/addToGroupNumber",postNumberOfUser)// add to group using the number of the user


export default router