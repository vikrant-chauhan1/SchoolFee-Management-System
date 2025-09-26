import { useEffect, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const Fees = ()=>{
    const [feeToBeCollectedData,setFeeToBeCollectedData] = useState(0);
    const [feeCollectedData,setFeeCollectedData] = useState(0);
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
    
    useEffect(()=>{
      const getFeeToBeCollectedData = async()=>{
          try {
            const token = localStorage.getItem("token");
            const result = await axios.get("http://localhost:5000/api/fees",

              {
                headers:{
                  Authorization:`Bearer ${token}`
                }
              }
            );
          const feeData = result.data;
          console.log("bro here is the use effect data ",feeData)
          const totalFees = feeData.reduce((acc,student)=> acc + Number(student.amount),0);
          console.log(totalFees)
          setFeeToBeCollectedData(totalFees)
          
        } catch (error) {
          console.error(error);

        }
        
      }

      getFeeToBeCollectedData();
    },[]);

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
    };

    const handleDownload = async()=>{
      const element = document.getElementById("receipt-element");
      const canvas = await html2canvas(element,{scale:2});
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p","mm","a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData,"PNG",0,0,pdfWidth,pdfHeight);
      pdf.save(`receipt-${paymentRecord.receipt_no}.pdf`)
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

        <div>
          {feeToBeCollectedData ? <h1>Fee Due : {feeToBeCollectedData}</h1>:<p>Loading...</p>}
        </div>



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
              <input type="text" placeholder="enter id to get payment record" onChange={(e)=>setId(e.target.value)} value={id} />
              <button onClick={getPaymentRecord}>Submit</button>

              <div>
                {paymentRecord.length > 0 ?
                  <div >
                    {paymentRecord.map((s,index)=>(
                    <ul id="receipt-element">
                    <li key={index}> <strong>Name:</strong>{s.name}</li>
                    <li key={index}><strong>Class:</strong>{s.class}</li>
                    <li key={index}><strong>Contact:</strong>{s.contact}</li>
                    <li key={index}><strong>Amount Paid:</strong>{s.amount_paid}</li>
                    <li key={index}><strong>Paid At:</strong>{s.paid_at}</li>
                    <li key={index}><strong>Method:</strong>{s.method}</li>
                    <li key={index}><strong>Receipt Number:</strong>{s.receipt_no}</li>

                    <button onClick={handleDownload}>Print Receipt</button>
                  </ul>
                ))}

                  </div>
                 :
                  <p>nothing to see here</p>
                }
              </div>
            </div>

        </div>
    );


};

export default Fees;