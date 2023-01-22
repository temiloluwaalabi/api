import express from "express"
import { addCategory, getCategories } from "../../controllers/CategoriesController.js";
const router = express.Router();

router.post("/create", addCategory);
router.get("/", getCategories);

export default router