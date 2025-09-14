import express from "express";
import { AddFee } from "../controllers/feeController.js";
import { verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/:id",verifyToken,AddFee);

export default router;