import { useState } from "react";
import axios from "axios"

const Students = ()=>{
    const [students,setStudents] = useState([]);
    const [studentByName,setStudentByName] = useState([]);
    const [studentName,setStudentName] = useState("");
    const [error,setError] = useState("");
    const [id,setId] = useState("");
    const [studentById,setStudentById] = useState(null)
    const [error1,setError1] = useState("");
    const [studentByClass,SetStudentByClass]= useState([]);
    const [error2,setError2] = useState(null);
    const [studentClass,setStudentClass] = useState("");

    
    // GETTING ALL THE STUDENTS
    const getAllStudents = async(e)=>{
        
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/api/students",{
                method:"GET",
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if(!res.ok){
                
                throw new Error("Unauthorized or sevrer error");
                
            }
            const data = await res.json();
            setStudents(data);
            

        } catch (error) {
            console.error("Error fetching students",error);
            
        }
    };
    
    //GETTING STUDENTS BY NAME 
    const getStudentsByName = async (e)=>{

        setStudentByName([]);
        try {
            const token = localStorage.getItem("token")
            const res = await axios.get(`http://localhost:5000/api/students/name/${studentName}`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                }
            );
           
            setError("")
            setStudentByName(res.data);

        } catch (error) {
            setError("No Student found");
            console.error("Error fetching student using name",error);
            
        }


    };

    //GETTING STUDENTS BY ID 
    const getStudentById = async(e)=>{
        setStudentById(null)
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get(`http://localhost:5000/api/students/${id}`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );
            setError1("")
            setStudentById(res.data);

        } catch (error) {
            setError1("No student found for this Id");
            console.error(error);
            
        }
    };

    // GETTING STUDENTS BY CLASS
    const getStudentsByClass = async(e) =>{
        const token = localStorage.getItem("token");
        SetStudentByClass([]);
        try {
            const res = await axios.get(`http://localhost3000/api/students/class/${studentClass}`,{
                headers:{
                    Authorization:`Bearer ${token}`

                }
            });
            setError2(null)
            SetStudentByClass(res.data);
        } catch (error) {
            setError2("No Student found in this class");
            console.error(error)

            
        }

    }





    return(
        <div>
            <div>
                <button onClick={getAllStudents}>Get All Students</button> 
                <ul>
                    {students.map((s,index)=>(
                        <li key={s.class}> <h2>{s.name} </h2> <p>Roll No: {s.roll_number}</p> <p>Class: {s.class}</p> <p>Contact: {s.contact}</p><p>Address: {s.address}</p></li>
                        

                    ))}
                </ul>
            </div>

            <div>
                <input
                    type="text"
                    value={studentName}
                    onChange={(e)=>setStudentName(e.target.value)}
                    placeholder="Enter student name"


                />
                <button onClick={getStudentsByName}>Search</button>

                {studentByName.length > 0 ? 
                    <div>
                       <ul>
                            {studentByName.map((s,index)=>(
                                <li key={index}><h3>{s.name}</h3> <p>Roll No: {s.roll_number}</p> <p>Class: {s.class}</p> <p>Contact: {s.contact}</p><p>Address: {s.address}</p> </li>

                            ))}
                       </ul>
                        
                     </div>
                
                :<div>
                    {error ? <p>{error}</p>:<p>enter name to search</p>}
                </div>
                }
                
            </div>
            <div>
                <input 
                    type="text"
                    placeholder="Enter the ID"
                    value={id}
                    onChange={(e)=>setId(e.target.value)}

                
                />
                <button onClick={getStudentById}>Search</button>
                {studentById?<ul><li><h3>{studentById.name}</h3> <p>Roll No: {studentById.roll_number}</p> <p>Class: {studentById.class}</p> <p>Contact: {studentById.contact}</p><p>Address: {studentById.address}</p></li></ul>
                    :
                    <div> {error1 ? <h5>{error1} </h5> : <p>Enter the ID</p>} </div>
                }
            </div>

        </div>
    );

};
export default Students;