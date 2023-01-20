import express from "express"
import { createVoter, deleteVoter, getAllVoters, getVoter, updateVoter } from "../../controllers/VotersController.js"

const router = express.Router()

//post
router.post("/", createVoter);
router.get("/:id", getVoter);
router.get('/', getAllVoters);
router.delete("/:id", deleteVoter);
router.put("/:id", updateVoter);

export default router;