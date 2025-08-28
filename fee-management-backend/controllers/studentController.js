import pool from "../db.js"

//GET all the students

export const getAllStudents = async (req,res)=>{
    try {
        const result = await pool.query("SELECT * FROM students ORDER BY id ASC");
        res.json(result.rows);

    } catch (error) {
        console.error(err);
        res.status(500).json({message:"Error fetching details"});
        
    }

}