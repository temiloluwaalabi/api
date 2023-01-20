import express from "express";
import handleLogin from "../../controllers/AuthController.js";
const router = express.Router();
//create
router.post("/", handleLogin);//working


export default router