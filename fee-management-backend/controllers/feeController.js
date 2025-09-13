import pool from "../db.js"

// API FOR MANAGING THE FEE OF STUDENTS

export const AddFee = async()=>{
    const id= req.params.id;
    const {student_id,year,amount,paid_amount,status}= req.body;
    try {
        const result = await pool.query("INSERT INTO fees (student_id,year,amount,paid_amount,status) VALUES ($1,$2,$3,$4,$5) RETURNING *",[student_id,year,amount,paid_amount,status]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"error adding fee"})
        
    }

}