import { useState } from "react";
import axios from "axios"

const Students = ()=>{
    const [students,setStudents] = useState([]);
    const [studentByName,setStudentByName] = useState([]);
    const [studentName,setStudentName] = useState("")
    
    // GETTING ALL THE STUDENTS
    const getAllStudents = async(e)=>{
        e.preventDefault();
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
        e.preventDefault();
        try {
            const token = localStorage.getItem("token")
            const res = await axios.get(`http://localhost:5000/api/students/name/${studentName}`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                }
            );
            if(!res.ok){
                throw new Error("server error or forbidden getting student using names");
            }
            const data = await res.json();
            setStudentByName(data);
        } catch (error) {
            console.error("Error fetching student using name",error);
            
        }


    }

    return(
        <div>
            <div>
                <button onClick={getAllStudents}>Get All Students</button> 
                <ul>
                    {students.map((s,index)=>(
                        <li key={index}> <h2>{s.name} </h2> {s.roll_number} {s.class} {s.contact} {s.address}</li>
                        

                    ))}
                </ul>
            </div>

            <div>
                <input
                    type="text"
                    value={studentByName}
                    onChange={(e)=>setStudentName(e.target.value)}
                    placeholder="Enter student name"


                />
                <button onClick={getStudentsByName}>Search</button>

                {studentByName ? 
                    <div>
                       <ul>
                            {studentByName.map((s,index)=>(
                                <li key={index}><h1>{s.name}</h1> <h2>{s.roll_number}</h2> <h2>{s.class}</h2> <h3>{s.contact}</h3> <h3>{s.address}</h3> </li>

                            ))}
                       </ul>
                        
                     </div>
                
                :<div></div>
                };
                
            </div>

        </div>
    );

};
export default Students;