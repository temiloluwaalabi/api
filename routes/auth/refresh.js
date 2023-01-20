import express from "express";
import handleRefreshToken from "../../controllers/RefreshTokenController.js";
const router = express.Router();
//create
router.get("/", handleRefreshToken);//working


export default router