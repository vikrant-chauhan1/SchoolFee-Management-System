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
    const [paymentRecord,setPaymentRecord]= useState([]);
    

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

    const getPaymentRecord = async(e)=>{
      const token = localStorage.getItem("token");
      try {
        const result = await axios.get(`http://localhost:5000/api/fees/payments/${id}`,
          {
            headers:{
              Authorization: `Bearer ${token}`
            }
          }
        );
        setPaymentRecord(result.data)
      } catch (error) {
        
      }
    }

    const handleChange =(e)=>{
        const {name,value} = e.target;
        setForm((prev)=>({
            ...prev,
            [name]:["year","paid_amount","amount"].includes(name)? Number(value) : value
        }))
    }

return(
        <div>
            <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <button
          onClick={getDueStudents}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Fetch All Due Students
        </button>
        {dueStudents.length > 0 && (
          <div>
            <h1 className="text-xl font-semibold mb-4">
              Number of Due Students: {dueStudents.length}
            </h1>
            <ul className="space-y-3">
              {dueStudents.map((s, student_id) => (
                <li
                  key={student_id}
                  className="border rounded-lg p-3 bg-gray-50"
                >
                  <p>
                    <span className="font-semibold">Name:</span> {s.name}
                  </p>
                  <p>
                    <span className="font-semibold">Contact:</span> {s.contact}
                  </p>
                  <p>
                    <span className="font-semibold">Class:</span> {s.class}
                  </p>
                  <p>
                    <span className="font-semibold">Year:</span> 2025
                  </p>
                  <p>
                    <span className="font-semibold">Paid Amount:</span>{" "}
                    {s.paid_amount}
                  </p>
                  <p>
                    <span className="font-semibold">Due Amount:</span> {s.amount}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span> {s.status}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
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
            <div>
              <input type="text" placeholder="enter id to get payment record" onChange={setId} value={id} />
              <button onClick={getPaymentRecord}>Submit</button>

              <div>
                {paymentRecord.length > 0 : paymentRecord.map((s,index)=>(
                  <ul>
                    <li>{s.name}</li>
                    <li>{s.class}</li>
                    <li>{s.contact}</li>
                    <li>{s.amount_paid}</li>
                    <li>{s.paid_at}</li>
                    <li>{s.method}</li>
                    <li>{s.receipt_no}</li>
                  </ul>
                )) : <p>nothing to see here</p>}
              </div>
            </div>

        </div>
    );


};

export default Fees;