import express from "express";
import { countByCat, createCourse, deleteCourse, enrollUser, getAllCourses, getCourse, getAllCourseModules, totalEnrolled, updateCourse, uploadImages, countByLevelAggregation, countByLevel, getCourses } from "../../controllers/CourseController.js";
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
//total enrolled one
router.get("/totalEnrolled", totalEnrolled);//not yet tested//alternative made
//total enrolled two
// router.get("/total/:id", getCourseTotal);//not yet tested//alternative made
//enroll user
router.patch("/enroll/:courseId/:id", enrollUser);//working




//new 
//filtered course
router.get("/filter", getCourses);
//count by category
router.get("/countByCat", countByCat);//j
//count by skillLevel filtering total
router.get("/countByLevel/:id", countByLevelAggregation)
//count by skillLvel individual result
router.get("/level/:id", countByLevel)
export default router;