import express from "express";
import { countByCat, createCourse, deleteCourse, enrollUser, getAllCourses, getCourse, getAllCourseModules, getCourseTotal, totalEnrolled, updateCourse, uploadImages } from "../../controllers/CourseController.js";
import ROLES_LIST from "../../config/roles_list.js";
import verifyRoles from "../../middlewares/verifyRoles.js";
import { upload } from "../../middlewares/multer.js";
import { courseImgResize, uploadPhoto } from "../../middlewares/uploadImages.js";
const router = express.Router();
//create
router.post("/create",upload.single("img"), createCourse);//wokring
//get single course
router.get("/:id", getCourse)//working
//update
router.patch("/update/:id",  updateCourse);//working
//delete
router.delete("/:id",  deleteCourse)//working

//upload images
router.put('/upload/:id', uploadPhoto.array('images',10), courseImgResize, uploadImages)

//Get All courses
router.get("/", getAllCourses);//working
//get course module
router.get("/module/:id", getAllCourseModules);//working
//count by category
router.get("/countByCat", countByCat);//j
//total enrolled one
router.get("/totalEnrolled", totalEnrolled);//not yet tested//alternative made
//total enrolled two
router.get("/total/:id", getCourseTotal);//not yet tested//alternative made
//enroll user
router.patch("/enroll/:courseId/:id", enrollUser);//working
export default router;