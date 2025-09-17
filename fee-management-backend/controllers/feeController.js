import pool from "../db.js"

// MANAGING THE FEE OF STUDENTS

// GETTING ALL THE DUE STUDENTS 
export const getAllDueStudents = async(req,res)=>{
    try {
        const result = await pool.query(`
            SELECT 
                fees.student_id,
                students.name,
                students.contact,
                students.class,
                fees.year,
                fees.paid_amount,
                fees.amount,
                fees.status
            FROM fees
            JOIN students ON fees.student_id= students.id
            WHERE fees.amount > fees.paid_amount
        `);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Error getting fee due students"})
        
    }
}
// ADDING A STUDENT FEE RECORD
export const AddFee = async(req,res)=>{
    const id= req.params.id;
    const {year,amount,paid_amount,status}= req.body;
    try {
        const result = await pool.query("INSERT INTO fees (student_id,year,amount,paid_amount,status) VALUES ($1,$2,$3,$4,$5) RETURNING *",[id,year,amount,paid_amount,status]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"error adding fee"})
        
    }

};

//GETTING FEE RECORD FOR A STUDENT 
export const getFees = async (req,res) =>{
    const id = req.params.id;
    try {
        const result = await pool.query(
            `SELECT 
                fees.student_id,
                students.name,
                students.class,
                students.contact,
                fees.year,
                fees.amount,
                fees.paid_amount,
                fees.status
                
            FROM fees
            JOIN students ON fees.student_id = students.id
            WHERE fees.student_id = $1
            `,[id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Error fetching fee data (inetrnal server error)"});
        
    }
};

// UPDATING THE FEE RECORD OF A STUDENT

export const UpdateFeeRecord = async(req,res) =>{
    const{year,amount,paid_amount,status} = req.body; // destructuring the object received from frontend 
    const id = req.params.id;
    try {
        const result = await pool.query(`
                UPDATE fees 
                SET year=$1,
                    amount=$2,
                    paid_amount=$3,
                    status=$4
                WHERE student_id=$5 RETURNING *

            `,[year,amount,paid_amount,status,id]
        );
        res.status(200).json(result.rows[0]);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"cannot update student (internal server error)"})
        
    }
}