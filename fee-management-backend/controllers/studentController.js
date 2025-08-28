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

};

// GET single student by id 

export const getStudentById= async(req,res)=>{
    try {
        const result = pool.query("SELECT * FROM students WHERE id=$1",[req.params.id]);
        if( result.rows.length===0){
            return res.status(404).json({message:"Student not found for this ID"})
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(err);
        res.status(500).json({message:"Error fetching students by id"});
        
    }
};

// ADD a student 

export const addStudent = async(req,res)=>{
    
    const {name,class:studentClass,roll_no,contact,address}= req.body;
    try {
        const result = await pool.query("INSERT INTO students (name, class, roll_no, contact, address) VALUES ($1,$2,$3,$4,$5) RETURNING * ",
        [name,studentClass,roll_no,contact,address]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(err);
        res.status(500).json({message:"Error adding student"});

        
    }

};

//UPDATE STUDENT 

export const updateStudent = async(req,res)=>{
    const {id} = req.params;
    const { name, class: studentClass, roll_no, contact, address } = req.body;
    
    try {
        const  result = await pool.query("UPDATE students SET name=$1, class=$2, roll_no=$3, contact=$4, address=$5 WHERE id=$6 RETURNING *",
            [name,studentClass,roll_no,contact,address,id]
        );
        if(result.rows.length === 0){
            return res.status(404).json({message:"Student not found"});
        }
        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error(err);
        res.status(500).json({message:"Error updating student"})
    }

};

