import { useState } from "react";

const Students = ()=>{
    const [students,setStudents] = useState([]);
    
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

    return(
        <div>
            <button onClick={getAllStudents}>Get All Students</button> 
            <ul>
                {students.map((s,index)=>(
                    <li key={index}> <h2>{s.name} </h2> {s.roll_number} {s.class} {s.contact} {s.address}</li>
                    

                ))}
            </ul>
        </div>
    );

};
export default Students;