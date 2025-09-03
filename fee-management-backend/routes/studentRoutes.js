import express from "express";
import {  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
  studentByClass,
  getStudentByName
} from "../controllers/studentController.js";
import {verifyToken} from "../middleware/authMiddleware.js";

const router = express.Router();

// all the student route are following and protected by the JWT 


// SPECIFIC ROUTES
router.get("/class/:className",verifyToken,studentByClass) //CHECKED
router.get("/name",verifyToken,getStudentByName);

// GENERIC ROUTES
router.get("/",verifyToken,getAllStudents); //CHECKED
router.get("/:id",verifyToken,getStudentById); //CHECKED
router.post("/",verifyToken,addStudent); // checked
router.put("/:id",verifyToken,updateStudent); //checked
router.delete("/:id",verifyToken,deleteStudent); //checked


export default router;  