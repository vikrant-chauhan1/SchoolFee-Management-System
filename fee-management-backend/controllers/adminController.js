import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const JWT_SECRET = "dihhAhhNigga"

export const loginAdmin = async (req,res)=>{
    const {username,password} = req.body; //basic object destructuring 
    try {
        const result = await pool.query("SELECT * FROM admins WHERE username =$1 ",[username]);
        if(result.rows.length === 0){
            res.status(401).json({success: false,message:"Invalid Credentials"});      //res.status() is a method in express that is used to set the HTTP response code

        }
        const admin = result.rows[0];
       
        const isMatch = await bcrypt.compare(password,admin.password);
        if(!isMatch){res.status(401).json({success:false,message:"Invalid Credentials"})};

        // generating the token 

        const token = jwt.sign({id:admin.id,username:admin.username,additionalInfo:"you are being tracked and logged"},JWT_SECRET,{expiresIn:"1h"});
        const adminInfo = {id:admin.id,userName:admin.username};
        res.status(200).json({success:true,token,adminInfo});
    } catch (err) {
        console.error(err);
        res.status(500).json({success:false,message:"Server error"});

        
    }
};
