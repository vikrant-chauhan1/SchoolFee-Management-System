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
    const [addedStudent,setAddedStudent]=useState(null);
    const [name,setName] = useState(""); 
    const [studentClassToAdd,setStudentClassToAdd] = useState("");
    const [roll_number,setRoll_number] = useState("");
    const [contact,setContact] = useState("");
    const [address,setAddress] = useState("");
    const [updatedStudent,setUpdatedStudent] = useState(null);
    const [idToUpdateStudent,setIdToUpdateStudent] = useState("");
    const [updateModal,setUpdateModal] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);


    // GET FUNC
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
            const res = await axios.get(`http://localhost:5000/api/students/class/${studentClass}`,{
                headers:{
                    Authorization:`Bearer ${token}`

                }
            });
            setError2(null);
            SetStudentByClass(res.data);
        } catch (error) {
            setError2("No Student found in this class");
            console.error(error);

            
        }

    }

    // POST REQUESTS
    // ADDING A STUDENT
    const addStudent = async(e)=>{
        e.preventDefault();
        const token = localStorage.getItem("token");
        setAddedStudent(null);
          if(!name || !studentClassToAdd || !roll_number || !contact || !address){
                alert("please fill the required fields")
                return
            }
        
        try {
           
            const res = await axios.post(`http://localhost:5000/api/students`,
                {
                    name,
                    class:studentClassToAdd,
                    roll_number,
                    contact,
                    address
                },
                {
                    headers:{
                    Authorization:`Bearer ${token}`
                    }
                }
                
                
            )
            console.log(res.data);
            setAddedStudent(res.data);
            setName("");
            setStudentClassToAdd("");
            setRoll_number("");
            setContact("");
            setAddress("")
        } catch (error) {
            console.error(error);
        }
    };

    //PUT REQEUSTS
    // UPDATING A REQUESTS

    const updateStudent = async(e)=>{
        e.preventDefault();
        const token = localStorage.getItem("token");
        setUpdatedStudent(null);
        if(!name || !studentClassToAdd || !roll_number || !contact || !address || !idToUpdateStudent){
            alert("please fill the required fields");
            return
        }
        try {
            
            const res = await axios.put(`http://localhost:5000/api/students/${idToUpdateStudent}`,
                {
                    name,
                    class:studentClassToAdd,
                    roll_number,
                    contact,
                    address

                },
                {
                    headers:{
                        Authorization:`Bearer ${token}` 

                    }
                }
            )
            setUpdatedStudent(res.data);
            
            setName("");
            setStudentClassToAdd("");
            setRoll_number("");
            setContact("");
            setAddress("");
            setUpdateModal(false);



        } catch {
            console.error(error);
            
        }
    }

    // DELETE REQUESTS
    // DELETING A STUDENT USING ID
    const deleteStudent= async(e)=>{
        const token = localStorage.getItem("token");
        if(!id){
            alert("please fill the required field");
            return
        }
        try {
            const res = await axios.delete(`http://localhost:5000/api/student/${id}`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        setDeleteConfirmation(res.data);
        } catch (error) {
            console.error(error);
            setDeleteConfirmation(error);
            
        }

    }


    return(
        <div>
            <div>
                <button onClick={getAllStudents}>Get All Students</button> 
                <ul>
                    {students.map((s,index)=>(
                        <li key={s.class}> <h2>{s.name} </h2> <p>ID:{s.id}</p> <p>Roll No: {s.roll_number}</p> <p>Class: {s.class}</p> <p>Contact: {s.contact}</p><p>Address: {s.address}</p></li>
                        

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

            <div>
                <input
                    type="text"
                    placeholder="Enter the class"
                    value={studentClass}
                    onChange={(e)=>setStudentClass(e.target.value)}
                />
                <button onClick={getStudentsByClass}>Search</button>
                <div>
                    {studentByClass.length > 0? 
                        <div> 
                            <ul>
                                {studentByClass.map((s,index)=>(
                                    <li key={index}><h3>{s.name}</h3> <p>Roll No: {s.roll_number}</p> <p>Class: {s.class}</p> <p>Contact: {s.contact}</p><p>Address: {s.address}</p></li>
                                ))}
                            </ul>
                        </div> 
                        : 
                        <div> 
                             {error2 ? <h3>{error2}</h3>: <p>Enter the class here</p>}
                         </div>
                    }

                </div>


            </div>

            <div>
                <form  onSubmit={addStudent}>
                    <input type="text" placeholder="enter the name" value={name} onChange={(e)=>setName(e.target.value)}/>
                    <input type="text" placeholder="enter the class" value={studentClassToAdd} onChange={(e)=>setStudentClassToAdd(e.target.value)} />
                    <input type="text" placeholder="enter the roll number" value={roll_number} onChange={(e)=>setRoll_number(e.target.value)} />
                    <input type="text" placeholder="enter the contact number" value={contact} onChange={(e)=>setContact(e.target.value)} />
                    <input type="text" placeholder="enter student address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                    <button type="submit">submit</button>
                </form>

                <div>
                    {addedStudent
                        ?
                    <div> 
                        <ul>
                            <li>
                                <h3>{addedStudent.name}</h3> 
                                <p>Roll No: {addedStudent.roll_number}</p> 
                                <p>Class: {addedStudent.class}</p> 
                                <p>Contact: {addedStudent.contact}</p>
                                <p>Address: {addedStudent.address}</p>

                                <h3>Student added successfully </h3>
                            </li>
                        </ul>
                    </div>
                        :
                    <p>fill the form to add student</p>}
                </div>
                
            </div>

            <div>
                <button onClick={()=>setUpdateModal(true)}>Update Student</button>
                {updateModal? 
                <div>
                    <input type="text" required placeholder="Enter Student Id" value={idToUpdateStudent} onChange={(e)=>setIdToUpdateStudent(e.target.value)} />
                    <form onSubmit={updateStudent}>
                        <input type="text" placeholder="enter the name" value={name} onChange={(e)=>setName(e.target.value)}/>
                        <input type="text" placeholder="enter the class" value={studentClassToAdd} onChange={(e)=>setStudentClassToAdd(e.target.value)} />
                        <input type="text" placeholder="enter the roll number" value={roll_number} onChange={(e)=>setRoll_number(e.target.value)} />
                        <input type="text" placeholder="enter the contact number" value={contact} onChange={(e)=>setContact(e.target.value)} />
                        <input type="text" placeholder="enter student address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                        <button type="submit">submit</button>
                        
                    </form>
                </div>
                    :
                <div>{updatedStudent?
                    <div>
                        <ul>
                            <li>
                                <h1>{updatedStudent.name}</h1>
                                <p>Class:{updatedStudent.class}</p>
                                <p>Roll number:{updatedStudent.roll_number}</p>
                                <p>Contact:{updatedStudent.contact}</p>
                                <p>Address:{updatedStudent.address}</p>
                            </li>
                        </ul>
                    </div>

                    :
                    <p>Click above to Update the student</p>}
                    
                </div>}
                
                    
            </div>
            <div>

            </div>

        </div>
    );

};
export default Students;