import express from "express";
import { AddFee,getFees,UpdateFeeRecord,getAllDueStudents } from "../controllers/feeController.js";
import { verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/",verifyToken,getAllDueStudents);
router.post("/:id",verifyToken,AddFee);
router.get("/:id",verifyToken,getFees);
router.put("/:id",verifyToken,UpdateFeeRecord);

export default router;