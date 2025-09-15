import { useState } from "react";
import axios from "axios";

const Fees = ()=>{
    const [feeRecord,setFeeRecord] = useState(null);
    const [id,setId] = useState("")

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
        } catch (error) {
            console.error(error);
            console.log(error);
            
        }
    }

    return(
        <div>
            <div>
                <h3>Get fee record</h3>
                <br></br>
                <input type="text" value={id} onChange={(e)=>setId(e.target.value)} />
                <button onClick={getFees}>Get Fees</button>
            </div>
            <div>
                {feeRecord? 
                <div>
                    <p>Name:{feeRecord.name}</p>
                    <p>ID:{feeRecord.student_id}</p>
                    <p>Class:{feeRecord.class}</p>
                    <p>contact:{feeRecord.contact}</p>
                    <p>Year:{feeRecord.year}</p>
                    <p>Amount:{feeRecord.amount}</p>
                    <p>Paid Amount:{feeRecord.paid_amount}</p>
                    <p>Status:{feeRecord.status}</p>
                 </div>
                :
                
                <p>Enter id to see fee record</p>}
            </div>

        </div>
    );

};

export default Fees;