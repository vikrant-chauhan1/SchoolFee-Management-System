import express from "express";
import {  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
  studentByClass,
} from "../controllers/studentController.js";
import {verifyToken} from "../middleware/authMiddleware.js";

const router = express.Router();

// all the student route are following and protected by the JWT 


// SPECIFIC ROUTES
router.get("/class/:className",verifyToken,studentByClass)

// GENERIC ROUTES
router.get("/",verifyToken,getAllStudents);
router.get("/:id",verifyToken,getStudentById);
router.post("/",verifyToken,addStudent);
router.put("/:id",verifyToken,updateStudent);
router.delete("/:id",verifyToken,deleteStudent); 


export default router;