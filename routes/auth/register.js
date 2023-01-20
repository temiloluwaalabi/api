import express from "express";
import handleNewUser from "../../controllers/RegisterController.js";
const router = express.Router();
//create
router.post("/", handleNewUser);//working


export default router