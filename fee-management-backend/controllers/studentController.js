import pool from "../db.js"

// API FOR MANAGING STUDENTS BY ADMINS

//GET all the students

export const getAllStudents = async (req,res)=>{
    try {
        const result = await pool.query("SELECT * FROM students ORDER BY id ASC");
        res.json(result.rows);

    } catch (error) {
        console.error(err);
        res.status(500).json({message:"Error fetching details"});
        
    }

};

// GET STUDENTS BY NAME

export const getStudentByName = async(req,res)=>{
    //const nameForSearching= req.params.studentName;
    try {
        const result = await pool.query("SELECT * FROM students WHERE name ILIKE $1 ",[`%${req.params.studentName}%`]);
        if(result.rows.length===0){
            return res.status(404).json({message:"No student found with that name"});
        }
        res.status(200).json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Error getting students"});

        
    } 
}

// GET single student by id 

export const getStudentById= async(req,res)=>{
    try {
        const result = await pool.query("SELECT * FROM students WHERE id=$1",[req.params.id]);
        if( result.rows.length===0){
            return res.status(404).json({message:"Student not found for this ID"})
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Error fetching students by id"});
        
    }
};

// ADD a student 

export const addStudent = async(req,res)=>{

    //TODO - REMOVE THE CONSTRAINT FROM THE ROLL NUMBER COLUMN FOR BEING UNIQUE IN POSTGRES
    
    const {name,class:studentClass,roll_number,contact,address}= req.body;
    try {
        const result = await pool.query("INSERT INTO students (name, class, roll_number, contact, address) VALUES ($1,$2,$3,$4,$5) RETURNING * ",
        [name,studentClass,roll_number,contact,address]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Error adding student"});

        
    }

};

//UPDATE STUDENT 

export const updateStudent = async(req,res)=>{
    const {id} = req.params;
    const { name, class: studentClass, roll_number, contact, address } = req.body;
    
    try {
        const  result = await pool.query("UPDATE students SET name=$1, class=$2, roll_number=$3, contact=$4, address=$5 WHERE id=$6 RETURNING *",
            [name,studentClass,roll_number,contact,address,id]
        );
        if(result.rows.length === 0){
            return res.status(404).json({message:"Student not found"});
        }
        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Error updating student"}) 
    }

};

// DELETE a student 

export const deleteStudent = async(req,res)=>{
    const id = req.params.id;
    try {
        const result = pool.query("DELETE FROM students where id=$1",[id]);
        if(result.rowCount===0){
            return res.status(404).json({message:"Student not found"});

        }
        res.json({message:"Student deleted sucessfully"});
    } catch (error) {
        res.status(500).json({message:"Error deleting student"}); 
        
    }
};

// LOOKING UP ALL THE STUDENTS IN A CLASS

export const studentByClass = async(req,res) =>{
    const studentClassForFilter = req.params.className;
    try {
        const result = await pool.query("SELECT * FROM students WHERE class=$1",[studentClassForFilter]);
        if(result.rows.length===0){
            return res.status(401).json({message:"No student found"});
        }
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Error getting students"});
        
    }

}; 