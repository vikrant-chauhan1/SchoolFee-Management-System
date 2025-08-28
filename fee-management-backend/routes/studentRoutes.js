import express from "express";
import {  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
} from "../controllers/studentController";
import {verifyToken} from "../middleware/authMiddleware";

const router = express.Router();

// all the student route are following protected by the JWT 
router.get("/",verifyToken,getAllStudents);
router.get("/:id",verifyToken,getStudentById);
router.post("/",verifyToken,addStudent);
router.put("/:id",verifyToken,updateStudent);
router.delete("/:id",verifyToken,deleteStudent);

export default router;