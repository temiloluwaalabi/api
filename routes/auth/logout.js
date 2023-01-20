import express from "express";
import handleLogout from "../../controllers/LogoutController.js";
const router = express.Router();
//create
router.get("/", handleLogout);//working


export default router