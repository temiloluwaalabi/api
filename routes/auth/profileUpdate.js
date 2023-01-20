import express from "express";
import completeProfile from "../../controllers/UpdateProfileController.js";
const router = express.Router();
//create
router.post("/", completeProfile);//working


export default router