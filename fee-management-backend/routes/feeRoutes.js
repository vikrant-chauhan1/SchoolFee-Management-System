import express from "express";
import { AddFee,getFees,UpdateFeeRecord,getAllDueStudents,getPaymentRecords } from "../controllers/feeController.js";
import { verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();
// ROUTES FOR FEE MANAGEMENT
router.get("/",verifyToken,getAllDueStudents);
router.post("/:id",verifyToken,AddFee);
router.get("/:id",verifyToken,getFees);
router.put("/:id",verifyToken,UpdateFeeRecord);

// ROUTS FOR PAYMENT RECORD 
router.get("/payments/:id",verifyToken,getPaymentRecords);
export default router;