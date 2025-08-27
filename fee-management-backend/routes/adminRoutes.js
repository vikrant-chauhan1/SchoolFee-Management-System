import express from "express"
import {loginAdmin} from "../controllers/adminController.js"

const router = express.Router();
router.post("/login",loginAdmin);

export default router;
/*  BY USING THIS PIECE OF CODE WE ARE CREATING 
A ROUTER INSTANCE USING EXPRESS THAT CAN HANDLE SPECIFIC ROUTES
NOW WE DEFINE THE LOGIN ROUTE AND ATTACH THE LOGINADMIN FUNCTION THAT HANDLES THE LOGIC 
*/