import express from "express";
import { createUser, deleteUser, deleteCoursesOfferedByUser, getCoursesOfferedByUser, getUser, getUserCourse, getUsers, updateUser, uploadProfileImage } from "../../controllers/UserController.js";
import ROLES_LIST from "../../config/roles_list.js";
import verifyJwt from "../../middlewares/verifyJwt.js";
import verifyRoles from "../../middlewares/verifyRoles.js";
import { profileResizeImg, uploadPhoto } from "../../middlewares/uploadImages.js";
import completeProfile from "../../controllers/UpdateProfileController.js";
const router = express.Router();
//create
router.post("/create", createUser);//working
//get single course
router.get("/:id", getUser)//working
//update
router.patch("/update/:id", updateUser);//working
//delete
router.delete("/:id", deleteUser)//working
//
router.put('/upload/:id', uploadPhoto.array('images',2), profileResizeImg, uploadProfileImage)
//complete profilr
router.put('/profile/:id', completeProfile);
//Get All courses
router.get("/", getUsers);//working
router.get("/course/:id", getCoursesOfferedByUser)//working
router.put("/:userId/:id", verifyJwt, deleteCoursesOfferedByUser);//working
export default router