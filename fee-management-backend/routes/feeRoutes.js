import express from "express";
import { AddFee,getFees,UpdateFeeRecord } from "../controllers/feeController.js";
import { verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/:id",verifyToken,AddFee);
router.get("/:id",verifyToken,getFees);
router.put("/:id",verifyToken,UpdateFeeRecord);

export default router;