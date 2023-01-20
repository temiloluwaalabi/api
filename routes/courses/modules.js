import express from "express";
import ROLES_LIST from "../../config/roles_list.js";
import verifyJwt from "../../middlewares/verifyJwt.js";
import verifyRoles from "../../middlewares/verifyRoles.js";
import { createModule, deleteModule, getModule, getModules, updateModule } from "../../controllers/ModuleController.js";
const router = express.Router();
//create
router.post("/:courseId", createModule);//working
//get single course
router.get("/:id", getModule)//working
//update
router.put("/update/:id", updateModule);//working
//delete
router.delete("/:courseId/:id", deleteModule)//working

//Get All courses
router.get("/", getModules);//working

export default router