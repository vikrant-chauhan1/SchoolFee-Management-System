import { useState } from "react";
import axios from "axios";

const Fees = ()=>{
    const [feeRecord,setFeeRecord] = useState(null);
    const [id,setId] = useState("")
    const [updatedFeeRecord,setUpdatedFeeRecord] = useState(null);
    const [form, setForm] = useState({
        year:"",
        amount:"",
        paid_amount:"",
        status:""
    })
    const [dueStudents,setDueStudents] = useState([]);

    const getDueStudents = async()=>{
        const token = localStorage.getItem("token");
        try {
            const result = await axios.get("http://localhost:5000/api/fees",
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            setDueStudents(result.data);
        } catch (error) {
            console.error(error);
        }

    }

    const getFees = async()=>{
        const token = localStorage.getItem("token")
        try {
            const result = await axios.get(`http://localhost:5000/api/fees/${id}`,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            )
            setFeeRecord(result.data);
            setId("")
        } catch (error) {
            console.error(error);
            console.log(error);
            
        }
    }

    const updateFeeRecord = async()=>{
        const token = localStorage.getItem("token");
        try {
                const result = await axios.put(`http://localhost:5000/api/fees/${id}`,
                
                  form
                ,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );
            setUpdatedFeeRecord(result.data);
            alert("student's fee records are updated mah man!")
        } catch (error) {
            console.error(error);
            alert("Error updating fee records")
        }
        
    };

    const handleChange =(e)=>{
        const {name,value} = e.target;
        setForm((prev)=>({
            ...prev,
            [name]:["year","paid_amount","amount"].includes(name)? Number(value) : value
        }))
    }

    return(
        <div>
            <div>
                <button onClick={getDueStudents}>Fetch all due students</button>
                <div>
                    {dueStudents.length >0? 
                     <div>
                        <h1>Number of due Students : {dueStudents.length}</h1>
                        <div>
                            {dueStudents.map((s,student_id)=>(
                                <ul>
                                    <li key={student_id}>Name:{s.name} Contact:{s.contact} Class:{s.class} year:{2025} Paid Amount:{s.paid_amount} Due Amount:{s.amount} Status:{s.status}</li>
                                </ul>
                            ))}
                        </div>
                     </div>
                    :
                        <div></div>
                    }
                </div>
            </div>
            <div>
                <h3>Get fee record</h3>
                <br></br>
                <input type="text" value={id} onChange={(e)=>setId(e.target.value)} />
                <button onClick={getFees}>Get Fees</button>
            </div>
            <div>
                {feeRecord? 
                <div>
                    <ul>
                        <li>
                            <p>Name:{feeRecord.name}</p>
                            <p>ID:{feeRecord.student_id}</p>
                            <p>Class:{feeRecord.class}</p>
                            <p>contact:{feeRecord.contact}</p>
                            <p>Year:{feeRecord.year}</p>
                            <p>Amount:{feeRecord.amount}</p>
                            <p>Paid Amount:{feeRecord.paid_amount}</p>
                            <p>Status:{feeRecord.status}</p>
                        </li>
                    </ul>
                 </div>
                :
                
                <p>Enter id to see fee record</p>}
            </div>

            <div>
                <input type="text" placeholder="Enter the id" value={id} onChange={(e)=>{setId(e.target.value)}} />
                <input type="text" placeholder="enter the year" name="year" value={form.year} onChange={handleChange} />
                <input type="text" placeholder="enter the amount" name="amount" value={form.amount} onChange={handleChange}    />
                <input type="text" placeholder="enter the paid amount" name="paid_amount" value={form.paid_amount} onChange={handleChange} /> 
                <input type="text" placeholder="enter the status" name="status" value={form.status} onChange={handleChange} />
                <button onClick={updateFeeRecord}>Update Record </button>
            </div>
            <div>
                {updatedFeeRecord? 
                <div>
                    <ul>
                        
                        <li>{updatedFeeRecord.student_id}</li>
                        <li>{updatedFeeRecord.year}</li>
                        <li>{updatedFeeRecord.amount}</li>
                        <li>{updatedFeeRecord.paid_amount}</li>
                        <li>{updatedFeeRecord.status}</li>
                    </ul>
                </div>
                :
                <p>Enter the details above to update fee records</p>}
            </div>

        </div>
    );

};

export default Fees;